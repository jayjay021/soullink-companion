import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { PokemonListResponse } from '@/types/api';
import { CreatePokemonRequestSchema } from '@/types/api';
import { emitToSession } from '@/lib/realtime';

const prisma = new PrismaClient();

// GET /api/pokemon/[sessionId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse<PokemonListResponse>> {
  const { sessionId } = await params;
  const { searchParams } = new URL(req.url);
  const route = searchParams.get('route') || undefined;
  const playerId = searchParams.get('player') || undefined;
  const name = searchParams.get('name') || undefined;

  const where: {
    sessionId: string;
    route?: string;
    playerId?: string;
    name?: string;
  } = { sessionId };
  if (route) where.route = route;
  if (playerId) where.playerId = playerId;
  if (name) where.name = name;

  const pokemons = await prisma.pokemon.findMany({
    where,
    orderBy: [
      { inBox: 'asc' }, // Team first (inBox: false), then box (inBox: true)
      { position: 'asc' },
    ],
  });
  return NextResponse.json(pokemons);
}

// POST /api/pokemon/[sessionId]
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<
  NextResponse<PokemonListResponse[0] | { error: string; details?: unknown }>
> {
  const { sessionId } = await params;
  const body = await req.json();
  const parseResult = CreatePokemonRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parseResult.error.flatten() },
      { status: 400 }
    );
  }
  const { name, route, playerId, image, inBox, position } = parseResult.data;

  // Validate uniqueness constraints per session per player
  const existingPokemonByName = await prisma.pokemon.findFirst({
    where: {
      sessionId,
      playerId,
      name,
    },
  });

  if (existingPokemonByName) {
    return NextResponse.json(
      {
        error: `You have already caught a ${name} in this session. Each player can only catch one of each Pokemon species per session.`,
      },
      { status: 400 }
    );
  }

  const existingPokemonByRoute = await prisma.pokemon.findFirst({
    where: {
      sessionId,
      playerId,
      route,
    },
    select: {
      name: true,
    },
  });

  if (existingPokemonByRoute) {
    return NextResponse.json(
      {
        error: `You have already caught ${existingPokemonByRoute.name} on ${route}. Each player can only catch one Pokemon per route per session.`,
      },
      { status: 400 }
    );
  }

  // Validate team position constraints
  if (!inBox && position !== undefined && position > 5) {
    return NextResponse.json(
      { error: 'Team can only have Pokemon in positions 0-5' },
      { status: 400 }
    );
  }

  // Handle position assignment
  let finalPosition = position;
  if (finalPosition === undefined || (finalPosition === 0 && inBox)) {
    // Only auto-assign position for box Pokemon when position is 0 or undefined
    // For team Pokemon, position should always be explicitly provided
    if (inBox) {
      const existingPokemons = await prisma.pokemon.findMany({
        where: { sessionId, playerId, inBox: true },
        orderBy: { position: 'desc' },
        take: 1,
      });
      finalPosition =
        existingPokemons.length > 0 ? existingPokemons[0].position + 1 : 0;
    } else {
      // For team Pokemon, if no position provided, find first available slot 0-5
      const existingTeamPokemons = await prisma.pokemon.findMany({
        where: { sessionId, playerId, inBox: false },
        select: { position: true },
      });
      const usedPositions = new Set(
        existingTeamPokemons.map((p) => p.position)
      );
      finalPosition = 0;
      while (finalPosition <= 5 && usedPositions.has(finalPosition)) {
        finalPosition++;
      }
      if (finalPosition > 5) {
        return NextResponse.json(
          { error: 'Team is full (maximum 6 Pokemon)' },
          { status: 400 }
        );
      }
    }
  }

  // Check if the target position is already occupied
  const existingPokemonAtPosition = await prisma.pokemon.findFirst({
    where: {
      sessionId,
      playerId,
      inBox: inBox ?? true,
      position: finalPosition,
    },
  });

  if (existingPokemonAtPosition) {
    return NextResponse.json(
      { error: `Position ${finalPosition} is already occupied` },
      { status: 400 }
    );
  }

  // Get all players in the session to check linking
  const sessionPlayers = await prisma.playerSession.findMany({
    where: { sessionId, isViewer: false },
    select: { playerId: true },
  });

  // Create the Pokemon
  const pokemon = await prisma.pokemon.create({
    data: {
      name,
      route,
      playerId,
      sessionId,
      image,
      inBox: inBox ?? true, // Default to true (box) if not specified
      position: finalPosition,
      inTeam: inBox !== undefined ? !inBox : false, // If not in box, it's in team
    },
  });

  // Handle linking logic - first get all Pokemon on the same route from other players
  const pokemonOnSameRoute = await prisma.pokemon.findMany({
    where: {
      sessionId,
      route,
      playerId: { not: playerId }, // Only other players' Pokemon
    },
  });

  // Generate a link group identifier (route-based)
  const linkGroupId = `${sessionId}-${route}`;

  // Update this Pokemon with linkGroup
  await prisma.pokemon.update({
    where: { id: pokemon.id },
    data: { linkGroup: linkGroupId },
  });

  // Update all Pokemon on the same route with the same link group
  if (pokemonOnSameRoute.length > 0) {
    await prisma.pokemon.updateMany({
      where: {
        sessionId,
        route,
      },
      data: { linkGroup: linkGroupId },
    });
  }

  // Check if all players have a Pokemon on this route, making it a valid link
  const playersWithPokemonOnRoute = await prisma.pokemon.groupBy({
    by: ['playerId'],
    where: {
      sessionId,
      route,
    },
  });

  // A link is valid if every player has caught a Pokemon on this route
  const isValidLink =
    playersWithPokemonOnRoute.length === sessionPlayers.length;

  // Update all Pokemon in this link group with isLinked based on validity
  await prisma.pokemon.updateMany({
    where: { linkGroup: linkGroupId },
    data: { isLinked: isValidLink },
  });

  // Handle team linking logic if this is a team Pokemon
  if (!inBox) {
    await updateTeamLinkValidity(sessionId, linkGroupId);
  }

  // Get the updated Pokemon with all the link information
  const updatedPokemon = await prisma.pokemon.findUnique({
    where: { id: pokemon.id },
  });

  // Emit real-time event to notify other players
  try {
    emitToSession(sessionId, {
      type: 'pokemon-added',
      data: {
        pokemonId: pokemon.id,
        playerId,
        name,
        route,
        container: inBox ? 'box' : 'team',
      },
      timestamp: new Date().toISOString(),
    });
  } catch {
    // Don't fail the main operation if event emission fails
  }

  return NextResponse.json(updatedPokemon!, { status: 201 });
}

// Helper function to update team link validity
async function updateTeamLinkValidity(sessionId: string, linkGroupId: string) {
  // Get all Pokemon in this link group
  const linkedPokemons = await prisma.pokemon.findMany({
    where: { linkGroup: linkGroupId },
    include: { player: true },
  });

  // Count how many linked Pokemon are in team
  const linkGroupByPlayer = linkedPokemons.reduce(
    (acc, pokemon) => {
      if (!acc[pokemon.playerId]) {
        acc[pokemon.playerId] = { inTeam: false };
      }
      if (!pokemon.inBox) {
        acc[pokemon.playerId].inTeam = true;
      }
      return acc;
    },
    {} as Record<string, { inTeam: boolean }>
  );

  // Check if all linked Pokemon are in team or all are in box
  const playerIds = Object.keys(linkGroupByPlayer);
  const allInTeam = playerIds.every(
    (playerId) => linkGroupByPlayer[playerId].inTeam
  );

  // Update the team link validity
  await prisma.pokemon.updateMany({
    where: { linkGroup: linkGroupId },
    data: {
      validTeamLink: allInTeam && linkedPokemons.length > 1,
    },
  });
}
