import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { logDbOperation } from '@/lib/logger';
import { updateTeamLinkValidity } from '@/lib/pokemon-helpers';
import {
  validatePokemonAccess,
  validateRequiredFields,
} from '@/lib/validation-helpers';
import {
  handlePokemonPositionSwap,
  handlePokemonPositionMove,
  shouldEmitPositionEvent,
} from '@/lib/position-helpers';
import {
  createApiContext,
  logApiRequestStart,
  handleApiError,
  createSuccessResponse,
  createErrorResponse,
  safeEmitRealtimeEvent,
  createRealtimeEvent,
} from '@/lib/api-helpers';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const context = createApiContext(
    'PUT',
    `/api/pokemon/${sessionId}/position`,
    sessionId
  );
  const apiLogger = logApiRequestStart(context);

  try {
    const body = await request.json();
    const { pokemonId, newPosition, inBox } = body;

    apiLogger.info(
      {
        sessionId,
        pokemonId,
        newPosition,
        inBox,
        requestBody: body,
      },
      'Updating Pokemon position'
    );

    // Validate required fields
    const fieldValidation = validateRequiredFields(body, [
      'pokemonId',
      'newPosition',
      'inBox',
    ]);
    if (!fieldValidation.isValid) {
      apiLogger.warn(
        {
          sessionId,
          missingFields: fieldValidation.missingFields,
        },
        'Missing required fields for position update'
      );

      return createErrorResponse(fieldValidation.error!, 400);
    }

    // Validate Pokemon access
    const pokemonValidation = await validatePokemonAccess({
      sessionId,
      pokemonId,
    });

    if (!pokemonValidation.isValid) {
      return createErrorResponse(
        pokemonValidation.error!,
        pokemonValidation.statusCode!
      );
    }

    const movingPokemon = pokemonValidation.pokemon!;

    apiLogger.debug(
      {
        sessionId,
        pokemonId,
        currentPosition: movingPokemon.position,
        currentInBox: movingPokemon.inBox,
        newPosition,
        newInBox: inBox,
        playerId: movingPokemon.playerId,
      },
      'Retrieved Pokemon for position update'
    );

    // Check if there's a Pokemon already at the target position
    const targetLookupStart = Date.now();
    const targetPokemon = await prisma.pokemon.findFirst({
      where: {
        sessionId,
        position: newPosition,
        inBox: inBox,
        playerId: movingPokemon.playerId,
      },
    });
    logDbOperation(
      'findFirst',
      'pokemon (target)',
      Date.now() - targetLookupStart
    );

    const isSwap = targetPokemon && targetPokemon.id !== pokemonId;
    apiLogger.debug(
      {
        sessionId,
        pokemonId,
        targetPokemonId: targetPokemon?.id,
        isSwap,
      },
      isSwap
        ? 'Position update will swap Pokemon'
        : 'Position update will move Pokemon'
    );

    // Use a transaction to handle the swap/move atomically
    const transactionStart = Date.now();
    const result = await prisma.$transaction(async (tx) => {
      const txLogger =
        apiLogger?.child?.({ transactionId: 'position-update' }) ?? apiLogger;

      if (isSwap) {
        // Handle swap operation
        const swapResult = await handlePokemonPositionSwap(
          {
            sessionId,
            movingPokemonId: pokemonId,
            targetPokemonId: targetPokemon.id,
            newPosition,
            newInBox: inBox,
            originalPosition: movingPokemon.position,
            originalInBox: movingPokemon.inBox,
          },
          tx,
          txLogger
        );

        // Update team link validity for both Pokemon
        if (movingPokemon.linkGroup) {
          await updateTeamLinkValidity(
            { sessionId, linkGroup: movingPokemon.linkGroup },
            tx
          );
        }
        if (
          targetPokemon.linkGroup &&
          targetPokemon.linkGroup !== movingPokemon.linkGroup
        ) {
          await updateTeamLinkValidity(
            { sessionId, linkGroup: targetPokemon.linkGroup },
            tx
          );
        }

        return swapResult;
      } else {
        // Handle move operation
        const moveResult = await handlePokemonPositionMove(
          {
            sessionId,
            pokemonId,
            playerId: movingPokemon.playerId,
            newPosition,
            newInBox: inBox,
            originalPosition: movingPokemon.position,
            originalInBox: movingPokemon.inBox,
          },
          tx,
          txLogger
        );

        // Update team link validity for moved Pokemon
        if (movingPokemon.linkGroup) {
          await updateTeamLinkValidity(
            { sessionId, linkGroup: movingPokemon.linkGroup },
            tx
          );
        }

        return moveResult;
      }
    });
    logDbOperation(
      'transaction',
      'pokemon position update',
      Date.now() - transactionStart
    );

    // Get fresh data with updated link status
    const finalLookupStart = Date.now();
    const updatedPokemon = await prisma.pokemon.findUnique({
      where: { id: result?.id || pokemonId },
    });
    logDbOperation(
      'findUnique',
      'pokemon (final)',
      Date.now() - finalLookupStart
    );

    // Determine if this move should trigger a real-time event
    const eventResult = shouldEmitPositionEvent(
      movingPokemon.inBox,
      inBox,
      !!isSwap,
      targetPokemon?.inBox
    );

    // Emit real-time event to notify other players if needed
    if (eventResult.shouldEmit) {
      await safeEmitRealtimeEvent(
        sessionId,
        createRealtimeEvent(eventResult.eventType, {
          pokemonId,
          playerId: movingPokemon.playerId,
          fromContainer: movingPokemon.inBox ? 'box' : 'team',
          toContainer: inBox ? 'box' : 'team',
        }),
        { pokemonId, playerId: movingPokemon.playerId }
      );
    }

    apiLogger.info(
      {
        sessionId,
        pokemonId,
        operation: isSwap ? 'swap' : 'move',
        fromPosition: movingPokemon.position,
        toPosition: newPosition,
        fromContainer: movingPokemon.inBox ? 'box' : 'team',
        toContainer: inBox ? 'box' : 'team',
        emittedEvent: eventResult.shouldEmit,
      },
      'Pokemon position updated successfully'
    );

    return createSuccessResponse(updatedPokemon, context);
  } catch (error) {
    return handleApiError(error, context, 'Failed to update Pokemon position');
  }
}
