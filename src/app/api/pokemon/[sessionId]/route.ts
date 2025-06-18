import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { PokemonListResponse } from '@/types/api';
import { CreatePokemonRequestSchema } from '@/types/api';

const prisma = new PrismaClient();

// GET /api/pokemon/[sessionId]
export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
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
  { params }: { params: { sessionId: string } }
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

  const pokemon = await prisma.pokemon.create({
    data: {
      name,
      route,
      playerId,
      sessionId,
      image,
      inBox: inBox ?? true, // Default to true (box) if not specified
      position: finalPosition,
    },
  });
  return NextResponse.json(pokemon, { status: 201 });
}
