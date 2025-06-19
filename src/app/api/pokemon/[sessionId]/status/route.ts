import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { logDbOperation } from '@/lib/logger';
import { processLinkedPokemonDeath } from '@/lib/pokemon-helpers';
import { validatePokemonAccess } from '@/lib/validation-helpers';
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

// PUT /api/pokemon/[sessionId]/status
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  const { sessionId } = await params;
  const context = createApiContext(
    'PUT',
    `/api/pokemon/${sessionId}/status`,
    sessionId
  );
  const apiLogger = logApiRequestStart(context);

  const UpdatePokemonStatusSchema = z.object({
    pokemonId: z.string().min(1),
    isDead: z.boolean().optional(),
  });

  try {
    // Parse and validate request body
    const parseResult = await safeParseRequestBody<{
      pokemonId: string;
      isDead?: boolean;
    }>(req, UpdatePokemonStatusSchema);

    if (!parseResult.success) {
      apiLogger.warn(
        {
          sessionId,
          validationErrors: parseResult.details,
        },
        'Invalid request data for Pokemon status update'
      );

      return createErrorResponse(parseResult.error, 400, parseResult.details);
    }

    const { pokemonId, isDead } = parseResult.data;
    apiLogger.info(
      { sessionId, pokemonId, isDead },
      'Updating Pokemon status with validated data'
    );

    // Validate Pokemon access
    const validation = await validatePokemonAccess({
      sessionId,
      pokemonId,
    });

    if (!validation.isValid) {
      return createErrorResponse(validation.error!, validation.statusCode!);
    }

    const pokemon = validation.pokemon!;
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

    // Handle death status if provided
    if (isDead === true && linkGroup) {
      apiLogger.info(
        {
          sessionId,
          pokemonId,
          linkGroup,
        },
        'Pokemon death affects linked Pokemon - updating all in link group'
      );

      // Process linked Pokemon death
      const updatedPokemons = await processLinkedPokemonDeath(
        sessionId,
        linkGroup
      );

      // Emit real-time event for Pokemon death
      await safeEmitRealtimeEvent(
        sessionId,
        createRealtimeEvent('pokemon-died', {
          pokemonId,
          playerId: pokemon.playerId,
          linkGroup: linkGroup,
        }),
        { pokemonId, playerId: pokemon.playerId }
      );

      apiLogger.info(
        {
          sessionId,
          linkGroup,
          affectedPokemonCount: updatedPokemons.length,
          statusChange: 'linked_death',
        },
        'Linked Pokemon death processed successfully'
      );

      return createSuccessResponse(updatedPokemons, context);
    }

    // Update the Pokemon with the changes
    const updateStart = Date.now();
    const updatedPokemon = await prisma.pokemon.update({
      where: { id: pokemonId },
      data: { isDead: isDead },
    });
    logDbOperation('update', 'pokemon (status)', Date.now() - updateStart);

    // Emit real-time event for Pokemon death if applicable
    if (isDead === true) {
      await safeEmitRealtimeEvent(
        sessionId,
        createRealtimeEvent('pokemon-died', {
          pokemonId,
          playerId: pokemon.playerId,
        }),
        { pokemonId, playerId: pokemon.playerId }
      );
    }

    apiLogger.info(
      {
        sessionId,
        pokemonId,
        statusChanges: { isDead },
      },
      'Pokemon status updated successfully'
    );

    return createSuccessResponse(updatedPokemon, context);
  } catch (error) {
    return handleApiError(error, context, 'Failed to update Pokemon status');
  }
}
