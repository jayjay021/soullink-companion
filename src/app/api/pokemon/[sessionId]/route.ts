import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { PokemonListResponse, CreatePokemonRequest } from '@/types/api';
import { CreatePokemonRequestSchema } from '@/types/api';
import { logApiRequest, logApiError, logDbOperation } from '@/lib/logger';
import { createHelperLogger } from '@/lib/logger-helpers';
import {
  validatePokemonConstraints,
  assignPokemonPosition,
  processPokemonLinking,
  updateTeamLinkValidity,
  generateLinkGroupId,
} from '@/lib/pokemon-helpers';
import {
  createApiContext,
  logApiRequestStart,
  handleApiError,
  createSuccessResponse,
  createErrorResponse,
  safeParseRequestBody,
  safeEmitRealtimeEvent,
  createRealtimeEvent,
} from '@/lib/api-helpers';

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

  const apiLogger = createHelperLogger({
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
  const { sessionId } = await params;
  const context = createApiContext(
    'POST',
    `/api/pokemon/${sessionId}`,
    sessionId
  );
  const apiLogger = logApiRequestStart(context);

  try {
    // Parse and validate request body
    const parseResult = await safeParseRequestBody<CreatePokemonRequest>(
      req,
      CreatePokemonRequestSchema
    );
    if (!parseResult.success) {
      apiLogger.warn(
        {
          sessionId,
          validationErrors: parseResult.details,
        },
        'Invalid request data for Pokemon creation'
      );

      return createErrorResponse(parseResult.error, 400, parseResult.details);
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

    // Validate Pokemon constraints (name and route uniqueness)
    const constraintValidation = await validatePokemonConstraints({
      sessionId,
      playerId,
      name,
      route,
    });

    if (!constraintValidation.isValid) {
      return createErrorResponse(constraintValidation.error!, 400);
    }

    // Handle position assignment
    const positionResult = await assignPokemonPosition(
      sessionId,
      playerId,
      inBox ?? true,
      position
    );

    if (positionResult.error) {
      return createErrorResponse(positionResult.error, 400);
    }

    // Create the Pokemon
    const createStart = Date.now();
    const pokemon = await prisma.pokemon.create({
      data: {
        name,
        route,
        playerId,
        sessionId,
        image,
        inBox: inBox ?? true,
        position: positionResult.position,
        inTeam: inBox !== undefined ? !inBox : false,
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

    // Handle linking logic
    const linkGroupId = generateLinkGroupId(sessionId, route);

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

    // Process Pokemon linking
    const linkingResult = await processPokemonLinking({
      sessionId,
      route,
      linkGroupId,
      playerId,
    });

    // Handle team linking logic if this is a team Pokemon
    if (!inBox) {
      apiLogger.debug(
        { sessionId, linkGroupId },
        'Updating team link validity'
      );
      await updateTeamLinkValidity({ sessionId, linkGroup: linkGroupId });
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
    await safeEmitRealtimeEvent(
      sessionId,
      createRealtimeEvent('pokemon-added', {
        pokemonId: pokemon.id,
        playerId,
        name,
        route,
        container: inBox ? 'box' : 'team',
      }),
      { pokemonId: pokemon.id, playerId }
    );

    apiLogger.info(
      {
        sessionId,
        pokemonId: pokemon.id,
        pokemonName: name,
        playerId,
        route,
        isLinked: linkingResult.isLinked,
      },
      'Pokemon created and linked successfully'
    );

    return createSuccessResponse(updatedPokemon!, context, 201);
  } catch (error) {
    return handleApiError(error, context, 'Failed to create Pokemon');
  }
}
