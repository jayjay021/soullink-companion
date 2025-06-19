import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { emitToSession } from '@/lib/realtime';
import {
  logger,
  logApiRequest,
  logApiError,
  logDbOperation,
} from '@/lib/logger';

const prisma = new PrismaClient();

// PUT /api/pokemon/[sessionId]/status
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  const start = Date.now();
  const { sessionId } = await params;
  const apiLogger = logger.child({
    component: 'api',
    endpoint: `/api/pokemon/${sessionId}/status`,
    sessionId,
  });

  const UpdatePokemonStatusSchema = z.object({
    pokemonId: z.string().min(1),
    isDead: z.boolean().optional(),
  });

  try {
    const body = await req.json();
    apiLogger.info({ sessionId, requestBody: body }, 'Updating Pokemon status');

    const parseResult = UpdatePokemonStatusSchema.safeParse(body);
    if (!parseResult.success) {
      apiLogger.warn(
        {
          sessionId,
          validationErrors: parseResult.error.flatten(),
        },
        'Invalid request data for Pokemon status update'
      );

      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.errors },
        { status: 400 }
      );
    }

    const { pokemonId, isDead } = parseResult.data;
    apiLogger.info(
      { sessionId, pokemonId, isDead },
      'Updating Pokemon status with validated data'
    );

    // Get the Pokemon to update
    const pokemonLookupStart = Date.now();
    const pokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId },
    });
    logDbOperation('findUnique', 'pokemon', Date.now() - pokemonLookupStart);

    if (!pokemon) {
      apiLogger.warn(
        { sessionId, pokemonId },
        'Pokemon not found for status update'
      );
      return NextResponse.json({ error: 'Pokemon not found' }, { status: 404 });
    }

    // Check if this Pokemon belongs to the session
    if (pokemon.sessionId !== sessionId) {
      apiLogger.warn(
        {
          sessionId,
          pokemonId,
          pokemonSessionId: pokemon.sessionId,
        },
        'Pokemon does not belong to this session'
      );

      return NextResponse.json(
        { error: 'Pokemon not found in this session' },
        { status: 404 }
      );
    }

    // Get link group to update all linked Pokemon
    const linkGroup = pokemon.linkGroup;
    apiLogger.debug(
      {
        sessionId,
        pokemonId,
        linkGroup,
        pokemonName: pokemon.name,
        playerId: pokemon.playerId,
      },
      'Retrieved Pokemon for status update'
    );

    // Prepare update data
    const updateData: {
      isDead?: boolean;
      inBox?: boolean;
      inTeam?: boolean;
    } = {};

    // Handle death status if provided
    if (isDead !== undefined) {
      updateData.isDead = isDead;
    }

    // If the Pokemon is dying and has a link group, mark all linked Pokemon as dead
    if (isDead === true && linkGroup) {
      apiLogger.info(
        {
          sessionId,
          pokemonId,
          linkGroup,
        },
        'Pokemon death affects linked Pokemon - updating all in link group'
      );

      const updateLinkedStart = Date.now();
      await prisma.pokemon.updateMany({
        where: { linkGroup },
        data: { isDead: true },
      });
      logDbOperation(
        'updateMany',
        'pokemon (linked death)',
        Date.now() - updateLinkedStart
      );

      // Get all updated Pokemon
      const getLinkedStart = Date.now();
      const updatedPokemons = await prisma.pokemon.findMany({
        where: { linkGroup },
      });
      logDbOperation(
        'findMany',
        'pokemon (linked)',
        Date.now() - getLinkedStart
      );

      apiLogger.info(
        {
          sessionId,
          linkGroup,
          affectedPokemonCount: updatedPokemons.length,
        },
        'All linked Pokemon marked as dead'
      );

      // Emit real-time event for Pokemon death
      try {
        emitToSession(sessionId, {
          type: 'pokemon-died',
          data: {
            pokemonId,
            playerId: pokemon.playerId,
            linkGroup: linkGroup,
          },
          timestamp: new Date().toISOString(),
        });
        apiLogger.debug(
          {
            sessionId,
            pokemonId,
            linkGroup,
          },
          'Real-time event emitted for linked Pokemon death'
        );
      } catch (eventError) {
        const eventErrorMessage =
          eventError instanceof Error ? eventError.message : String(eventError);
        apiLogger.warn(
          {
            sessionId,
            pokemonId,
            error: eventErrorMessage,
          },
          'Failed to emit real-time event for Pokemon death'
        );
      }

      const duration = Date.now() - start;
      apiLogger.info(
        {
          sessionId,
          pokemonId,
          linkGroup,
          affectedPokemonCount: updatedPokemons.length,
          statusChange: 'linked_death',
          duration: `${duration}ms`,
        },
        'Linked Pokemon death processed successfully'
      );

      logApiRequest('PUT', `/api/pokemon/${sessionId}/status`, duration);

      return NextResponse.json(updatedPokemons);
    }

    // Update the Pokemon with the changes
    const updateStart = Date.now();
    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: updateData,
    });
    logDbOperation('update', 'pokemon (status)', Date.now() - updateStart);

    // Emit real-time event for Pokemon death if applicable
    if (isDead === true) {
      try {
        emitToSession(sessionId, {
          type: 'pokemon-died',
          data: {
            pokemonId,
            playerId: pokemon.playerId,
          },
          timestamp: new Date().toISOString(),
        });
        apiLogger.debug(
          {
            sessionId,
            pokemonId,
          },
          'Real-time event emitted for individual Pokemon death'
        );
      } catch (eventError) {
        const eventErrorMessage =
          eventError instanceof Error ? eventError.message : String(eventError);
        apiLogger.warn(
          {
            sessionId,
            pokemonId,
            error: eventErrorMessage,
          },
          'Failed to emit real-time event for Pokemon death'
        );
      }
    }

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId,
        pokemonId,
        statusChanges: updateData,
        duration: `${duration}ms`,
      },
      'Pokemon status updated successfully'
    );

    logApiRequest('PUT', `/api/pokemon/${sessionId}/status`, duration);

    // If no link group or team status change, just return the updated Pokemon
    return NextResponse.json(updatedPokemon);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    if (error instanceof z.ZodError) {
      apiLogger.warn(
        {
          sessionId,
          validationErrors: error.errors,
        },
        'Validation error in Pokemon status update'
      );

      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }

    logApiError('PUT', `/api/pokemon/${sessionId}/status`, error, 500);
    apiLogger.error(
      {
        sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to update Pokemon status'
    );

    return NextResponse.json(
      { error: 'Failed to update Pokemon status' },
      { status: 500 }
    );
  }
}
