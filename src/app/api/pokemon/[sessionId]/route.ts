import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { PokemonListResponse } from '@/types/api';
import { CreatePokemonRequestSchema } from '@/types/api';
import { emitToSession } from '@/lib/realtime';
import {
  logger,
  logApiRequest,
  logApiError,
  logDbOperation,
} from '@/lib/logger';

const prisma = new PrismaClient();

// GET /api/pokemon/[sessionId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse<PokemonListResponse | { error: string }>> {
  const start = Date.now();
  const { sessionId } = await params;
  const { searchParams } = new URL(req.url);
  const route = searchParams.get('route') || undefined;
  const playerId = searchParams.get('player') || undefined;
  const name = searchParams.get('name') || undefined;

  const apiLogger = logger.child({
    component: 'api',
    endpoint: `/api/pokemon/${sessionId}`,
    sessionId,
  });

  try {
    apiLogger.info(
      {
        sessionId,
        filters: { route, playerId, name },
      },
      'Fetching Pokemon for session'
    );

    const where: {
      sessionId: string;
      route?: string;
      playerId?: string;
      name?: string;
    } = { sessionId };
    if (route) where.route = route;
    if (playerId) where.playerId = playerId;
    if (name) where.name = name;

    const dbStart = Date.now();
    const pokemons = await prisma.pokemon.findMany({
      where,
      orderBy: [
        { inBox: 'asc' }, // Team first (inBox: false), then box (inBox: true)
        { position: 'asc' },
      ],
    });
    const dbDuration = Date.now() - dbStart;

    logDbOperation('findMany', 'pokemon', dbDuration);

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId,
        pokemonCount: pokemons.length,
        filters: { route, playerId, name },
        duration: `${duration}ms`,
      },
      'Pokemon fetched successfully'
    );

    logApiRequest('GET', `/api/pokemon/${sessionId}`, duration);

    return NextResponse.json(pokemons);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('GET', `/api/pokemon/${sessionId}`, error, 500);
    apiLogger.error(
      {
        sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to fetch Pokemon'
    );

    return NextResponse.json(
      { error: 'Failed to fetch Pokemon' },
      { status: 500 }
    );
  }
}

// POST /api/pokemon/[sessionId]
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<
  NextResponse<PokemonListResponse[0] | { error: string; details?: unknown }>
> {
  const start = Date.now();
  const { sessionId } = await params;
  const apiLogger = logger.child({
    component: 'api',
    endpoint: `/api/pokemon/${sessionId}`,
    sessionId,
  });

  try {
    const body = await req.json();
    apiLogger.info({ sessionId, requestBody: body }, 'Creating new Pokemon');

    const parseResult = CreatePokemonRequestSchema.safeParse(body);
    if (!parseResult.success) {
      apiLogger.warn(
        {
          sessionId,
          validationErrors: parseResult.error.flatten(),
        },
        'Invalid request data for Pokemon creation'
      );

      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const { name, route, playerId, image, inBox, position } = parseResult.data;

    apiLogger.info(
      {
        sessionId,
        pokemonName: name,
        route,
        playerId,
        inBox,
        position,
      },
      'Creating Pokemon with validated data'
    );

    // Validate uniqueness constraints per session per player
    const nameCheckStart = Date.now();
    const existingPokemonByName = await prisma.pokemon.findFirst({
      where: {
        sessionId,
        playerId,
        name,
      },
    });
    logDbOperation(
      'findFirst',
      'pokemon (name check)',
      Date.now() - nameCheckStart
    );

    if (existingPokemonByName) {
      apiLogger.warn(
        {
          sessionId,
          pokemonName: name,
          playerId,
        },
        'Pokemon name already exists for player in session'
      );

      return NextResponse.json(
        {
          error: `You have already caught a ${name} in this session. Each player can only catch one of each Pokemon species per session.`,
        },
        { status: 400 }
      );
    }

    const routeCheckStart = Date.now();
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
    logDbOperation(
      'findFirst',
      'pokemon (route check)',
      Date.now() - routeCheckStart
    );

    if (existingPokemonByRoute) {
      apiLogger.warn(
        {
          sessionId,
          route,
          playerId,
          existingPokemon: existingPokemonByRoute.name,
        },
        'Player already has Pokemon on this route'
      );

      return NextResponse.json(
        {
          error: `You have already caught ${existingPokemonByRoute.name} on ${route}. Each player can only catch one Pokemon per route per session.`,
        },
        { status: 400 }
      );
    }

    // Validate team position constraints
    if (!inBox && position !== undefined && position > 5) {
      apiLogger.warn(
        {
          sessionId,
          playerId,
          position,
        },
        'Invalid team position provided'
      );

      return NextResponse.json(
        { error: 'Team can only have Pokemon in positions 0-5' },
        { status: 400 }
      );
    }

    // Handle position assignment
    let finalPosition = position;
    if (finalPosition === undefined || (finalPosition === 0 && inBox)) {
      apiLogger.debug(
        { sessionId, playerId, inBox },
        'Auto-assigning position'
      );

      if (inBox) {
        const positionCheckStart = Date.now();
        const existingPokemons = await prisma.pokemon.findMany({
          where: { sessionId, playerId, inBox: true },
          orderBy: { position: 'desc' },
          take: 1,
        });
        logDbOperation(
          'findMany',
          'pokemon (position check)',
          Date.now() - positionCheckStart
        );

        finalPosition =
          existingPokemons.length > 0 ? existingPokemons[0].position + 1 : 0;
        apiLogger.debug(
          {
            sessionId,
            playerId,
            assignedPosition: finalPosition,
          },
          'Assigned box position'
        );
      } else {
        const teamCheckStart = Date.now();
        const existingTeamPokemons = await prisma.pokemon.findMany({
          where: { sessionId, playerId, inBox: false },
          select: { position: true },
        });
        logDbOperation(
          'findMany',
          'pokemon (team check)',
          Date.now() - teamCheckStart
        );

        const usedPositions = new Set(
          existingTeamPokemons.map((p) => p.position)
        );
        finalPosition = 0;
        while (finalPosition <= 5 && usedPositions.has(finalPosition)) {
          finalPosition++;
        }
        if (finalPosition > 5) {
          apiLogger.warn(
            {
              sessionId,
              playerId,
            },
            'Team is full, cannot add Pokemon'
          );

          return NextResponse.json(
            { error: 'Team is full (maximum 6 Pokemon)' },
            { status: 400 }
          );
        }
        apiLogger.debug(
          {
            sessionId,
            playerId,
            assignedPosition: finalPosition,
          },
          'Assigned team position'
        );
      }
    }

    // Check if the target position is already occupied
    const occupancyCheckStart = Date.now();
    const existingPokemonAtPosition = await prisma.pokemon.findFirst({
      where: {
        sessionId,
        playerId,
        inBox: inBox ?? true,
        position: finalPosition,
      },
    });
    logDbOperation(
      'findFirst',
      'pokemon (occupancy check)',
      Date.now() - occupancyCheckStart
    );

    if (existingPokemonAtPosition) {
      apiLogger.warn(
        {
          sessionId,
          playerId,
          position: finalPosition,
        },
        'Position already occupied'
      );

      return NextResponse.json(
        { error: `Position ${finalPosition} is already occupied` },
        { status: 400 }
      );
    }

    // Get all players in the session to check linking
    const playersCheckStart = Date.now();
    const sessionPlayers = await prisma.playerSession.findMany({
      where: { sessionId, isViewer: false },
      select: { playerId: true },
    });
    logDbOperation('findMany', 'playerSession', Date.now() - playersCheckStart);

    apiLogger.debug(
      {
        sessionId,
        playerCount: sessionPlayers.length,
      },
      'Retrieved session players for linking'
    );

    // Create the Pokemon
    const createStart = Date.now();
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
    logDbOperation('create', 'pokemon', Date.now() - createStart);

    apiLogger.info(
      {
        sessionId,
        pokemonId: pokemon.id,
        pokemonName: name,
        playerId,
      },
      'Pokemon created successfully'
    );

    // Handle linking logic - first get all Pokemon on the same route from other players
    const linkingStart = Date.now();
    const pokemonOnSameRoute = await prisma.pokemon.findMany({
      where: {
        sessionId,
        route,
        playerId: { not: playerId }, // Only other players' Pokemon
      },
    });
    logDbOperation('findMany', 'pokemon (linking)', Date.now() - linkingStart);

    // Generate a link group identifier (route-based)
    const linkGroupId = `${sessionId}-${route}`;

    apiLogger.debug(
      {
        sessionId,
        route,
        linkGroupId,
        existingPokemonCount: pokemonOnSameRoute.length,
      },
      'Processing Pokemon linking'
    );

    // Update this Pokemon with linkGroup
    const updateLinkStart = Date.now();
    await prisma.pokemon.update({
      where: { id: pokemon.id },
      data: { linkGroup: linkGroupId },
    });
    logDbOperation(
      'update',
      'pokemon (link group)',
      Date.now() - updateLinkStart
    );

    // Update all Pokemon on the same route with the same link group
    if (pokemonOnSameRoute.length > 0) {
      const updateManyStart = Date.now();
      await prisma.pokemon.updateMany({
        where: {
          sessionId,
          route,
        },
        data: { linkGroup: linkGroupId },
      });
      logDbOperation(
        'updateMany',
        'pokemon (link group)',
        Date.now() - updateManyStart
      );
    }

    // Check if all players have a Pokemon on this route, making it a valid link
    const groupByStart = Date.now();
    const playersWithPokemonOnRoute = await prisma.pokemon.groupBy({
      by: ['playerId'],
      where: {
        sessionId,
        route,
      },
    });
    logDbOperation(
      'groupBy',
      'pokemon (link validation)',
      Date.now() - groupByStart
    );

    // A link is valid if every player has caught a Pokemon on this route
    const isValidLink =
      playersWithPokemonOnRoute.length === sessionPlayers.length;

    apiLogger.debug(
      {
        sessionId,
        route,
        playersWithPokemon: playersWithPokemonOnRoute.length,
        totalPlayers: sessionPlayers.length,
        isValidLink,
      },
      'Calculated link validity'
    );

    // Update all Pokemon in this link group with isLinked based on validity
    const linkValidityStart = Date.now();
    await prisma.pokemon.updateMany({
      where: { linkGroup: linkGroupId },
      data: { isLinked: isValidLink },
    });
    logDbOperation(
      'updateMany',
      'pokemon (link validity)',
      Date.now() - linkValidityStart
    );

    // Handle team linking logic if this is a team Pokemon
    if (!inBox) {
      apiLogger.debug(
        { sessionId, linkGroupId },
        'Updating team link validity'
      );
      await updateTeamLinkValidity(sessionId, linkGroupId);
    }

    // Get the updated Pokemon with all the link information
    const finalFetchStart = Date.now();
    const updatedPokemon = await prisma.pokemon.findUnique({
      where: { id: pokemon.id },
    });
    logDbOperation(
      'findUnique',
      'pokemon (final)',
      Date.now() - finalFetchStart
    );

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
      apiLogger.debug(
        {
          sessionId,
          pokemonId: pokemon.id,
        },
        'Real-time event emitted'
      );
    } catch (eventError) {
      const eventErrorMessage =
        eventError instanceof Error ? eventError.message : String(eventError);
      apiLogger.warn(
        {
          sessionId,
          pokemonId: pokemon.id,
          error: eventErrorMessage,
        },
        'Failed to emit real-time event'
      );
    }

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId,
        pokemonId: pokemon.id,
        pokemonName: name,
        playerId,
        route,
        isLinked: isValidLink,
        duration: `${duration}ms`,
      },
      'Pokemon created and linked successfully'
    );

    logApiRequest('POST', `/api/pokemon/${sessionId}`, duration);

    return NextResponse.json(updatedPokemon!, { status: 201 });
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('POST', `/api/pokemon/${sessionId}`, error, 500);
    apiLogger.error(
      {
        sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to create Pokemon'
    );

    return NextResponse.json(
      { error: 'Failed to create Pokemon' },
      { status: 500 }
    );
  }
}

// Helper function to update team link validity
async function updateTeamLinkValidity(sessionId: string, linkGroupId: string) {
  const helperLogger = logger.child({
    component: 'api',
    function: 'updateTeamLinkValidity',
    sessionId,
    linkGroupId,
  });

  try {
    helperLogger.debug('Updating team link validity');

    // Get all Pokemon in this link group
    const linkedPokemonStart = Date.now();
    const linkedPokemons = await prisma.pokemon.findMany({
      where: { linkGroup: linkGroupId },
      include: { player: true },
    });
    logDbOperation(
      'findMany',
      'pokemon (team linking)',
      Date.now() - linkedPokemonStart
    );

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

    helperLogger.debug(
      {
        linkedPokemonCount: linkedPokemons.length,
        playersInTeam: playerIds.filter((id) => linkGroupByPlayer[id].inTeam)
          .length,
        totalPlayers: playerIds.length,
        allInTeam,
      },
      'Calculated team link validity'
    );

    // Update the team link validity
    const teamValidityStart = Date.now();
    await prisma.pokemon.updateMany({
      where: { linkGroup: linkGroupId },
      data: {
        validTeamLink: allInTeam && linkedPokemons.length > 1,
      },
    });
    logDbOperation(
      'updateMany',
      'pokemon (team validity)',
      Date.now() - teamValidityStart
    );

    helperLogger.debug(
      {
        validTeamLink: allInTeam && linkedPokemons.length > 1,
      },
      'Team link validity updated'
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to update team link validity'
    );
    throw error;
  }
}
