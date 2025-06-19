import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { emitToSession } from '@/lib/realtime';
import {
  logger,
  logApiRequest,
  logApiError,
  logDbOperation,
} from '@/lib/logger';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const start = Date.now();
  const { sessionId } = await params;
  const apiLogger = logger.child({
    component: 'api',
    endpoint: `/api/pokemon/${sessionId}/position`,
    sessionId,
  });

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
    if (!pokemonId || newPosition === undefined || inBox === undefined) {
      apiLogger.warn(
        {
          sessionId,
          providedFields: { pokemonId: !!pokemonId, newPosition, inBox },
        },
        'Missing required fields for position update'
      );

      return NextResponse.json(
        { error: 'Pokemon ID, position, and box status are required' },
        { status: 400 }
      );
    }

    // Get the Pokemon being moved
    const pokemonLookupStart = Date.now();
    const movingPokemon = await prisma.pokemon.findUnique({
      where: { id: pokemonId, sessionId },
    });
    logDbOperation(
      'findUnique',
      'pokemon (moving)',
      Date.now() - pokemonLookupStart
    );

    if (!movingPokemon) {
      apiLogger.warn(
        {
          sessionId,
          pokemonId,
        },
        'Pokemon not found for position update'
      );

      return NextResponse.json({ error: 'Pokemon not found' }, { status: 404 });
    }

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

    // Check if there's a Pokemon already at the target position with the same inBox status
    const targetLookupStart = Date.now();
    const targetPokemon = await prisma.pokemon.findFirst({
      where: {
        sessionId,
        position: newPosition,
        inBox: inBox,
        playerId: movingPokemon.playerId, // Ensure same player
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
      const txLogger = apiLogger.child({ transactionId: 'position-update' });

      // Handle swapping first if there's a target Pokemon
      if (targetPokemon && targetPokemon.id !== pokemonId) {
        txLogger.info(
          {
            movingPokemonId: pokemonId,
            targetPokemonId: targetPokemon.id,
          },
          'Performing Pokemon position swap'
        );

        // This is a swap operation - use a temporary position to avoid constraint conflicts
        const tempPosition = -999; // Temporary position that won't conflict

        // Step 1: Move target Pokemon to temporary position
        await tx.pokemon.update({
          where: { id: targetPokemon.id },
          data: {
            position: tempPosition,
          },
        });
        txLogger.debug(
          { targetPokemonId: targetPokemon.id, tempPosition },
          'Moved target to temp position'
        );

        // Step 2: Move the dragged Pokemon to the target position
        await tx.pokemon.update({
          where: { id: pokemonId },
          data: {
            position: newPosition,
            inBox: inBox,
            inTeam: !inBox, // Update team status
          },
        });
        txLogger.debug(
          { pokemonId, newPosition, inBox },
          'Moved Pokemon to target position'
        );

        // Step 3: Move target Pokemon to the dragged Pokemon's original position
        await tx.pokemon.update({
          where: { id: targetPokemon.id },
          data: {
            position: movingPokemon.position,
            inBox: movingPokemon.inBox,
            inTeam: !movingPokemon.inBox, // Update team status
          },
        });
        txLogger.debug(
          {
            targetPokemonId: targetPokemon.id,
            originalPosition: movingPokemon.position,
            originalInBox: movingPokemon.inBox,
          },
          'Moved target to original position'
        );

        // Update team link validity for both Pokemon involved in the swap
        await updateTeamLinkValidity(tx, movingPokemon, txLogger);
        await updateTeamLinkValidity(tx, targetPokemon, txLogger);

        // Return the moved Pokemon
        const updatedPokemon = await tx.pokemon.findUnique({
          where: { id: pokemonId },
        });

        txLogger.info('Pokemon swap completed successfully');
        return updatedPokemon;
      } else {
        txLogger.info(
          { pokemonId, newPosition, inBox },
          'Performing Pokemon position move'
        );

        // This is a move operation (not a swap)
        // Move the dragged Pokemon to the new position
        const updatedPokemon = await tx.pokemon.update({
          where: { id: pokemonId },
          data: {
            position: newPosition,
            inBox: inBox,
            inTeam: !inBox, // Update team status
          },
        });
        txLogger.debug(
          { pokemonId, newPosition, inBox },
          'Pokemon moved to new position'
        );

        // Only compact if Pokemon was moved FROM the box
        if (movingPokemon.inBox) {
          if (!inBox) {
            txLogger.debug('Compacting box after moving Pokemon to team');
            // Pokemon moved from box to team - compact the box
            const boxPokemon = await tx.pokemon.findMany({
              where: {
                sessionId,
                playerId: movingPokemon.playerId,
                inBox: true,
              },
              orderBy: { position: 'asc' },
            });

            // Reassign positions to eliminate gaps
            for (let i = 0; i < boxPokemon.length; i++) {
              if (boxPokemon[i].position !== i) {
                await tx.pokemon.update({
                  where: { id: boxPokemon[i].id },
                  data: { position: i },
                });
              }
            }
            txLogger.debug(
              { compactedCount: boxPokemon.length },
              'Box compaction completed'
            );
          } else {
            txLogger.debug('Adjusting box positions after internal move');
            // Pokemon moved within the box - shift down Pokemon that were after the original position
            const originalPosition = movingPokemon.position;

            // Get Pokemon that were positioned after the moved Pokemon's original position
            const pokemonToShift = await tx.pokemon.findMany({
              where: {
                sessionId,
                playerId: movingPokemon.playerId,
                inBox: true,
                position: { gt: originalPosition },
                id: { not: pokemonId }, // Exclude the moved Pokemon
              },
              orderBy: { position: 'asc' },
            });

            // Shift them down by one position to fill the gap
            for (const pokemon of pokemonToShift) {
              await tx.pokemon.update({
                where: { id: pokemon.id },
                data: { position: pokemon.position - 1 },
              });
            }
            txLogger.debug(
              { shiftedCount: pokemonToShift.length },
              'Position shifting completed'
            );

            // Adjust the moved Pokemon's position if it was moved to the end
            // Since we removed one position from the middle, the end position should be one less
            const finalPosition =
              newPosition > originalPosition ? newPosition - 1 : newPosition;
            if (finalPosition !== newPosition) {
              await tx.pokemon.update({
                where: { id: pokemonId },
                data: { position: finalPosition },
              });
              txLogger.debug(
                {
                  originalNewPosition: newPosition,
                  finalPosition,
                },
                'Adjusted final position'
              );
            }
          }
        }

        // Update team link validity for linked Pokemon
        await updateTeamLinkValidity(tx, movingPokemon, txLogger);

        txLogger.info('Pokemon move completed successfully');
        return updatedPokemon;
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
    let shouldEmitEvent = false;
    let eventType = 'pokemon-moved';

    if (targetPokemon && targetPokemon.id !== pokemonId) {
      // This was a swap operation - emit event if one Pokemon moved between team/box
      const movedBetweenContainers =
        movingPokemon.inBox !== inBox ||
        targetPokemon.inBox !== movingPokemon.inBox;

      if (movedBetweenContainers) {
        shouldEmitEvent = true;
        eventType = 'pokemon-moved';
      }
    } else {
      // This was a move operation - emit event if Pokemon moved between team/box
      const movedBetweenContainers = movingPokemon.inBox !== inBox;

      if (movedBetweenContainers) {
        shouldEmitEvent = true;
        eventType = 'pokemon-moved';
      }
    }

    // Emit real-time event to notify other players if needed
    if (shouldEmitEvent) {
      try {
        emitToSession(sessionId, {
          type: eventType,
          data: {
            pokemonId,
            playerId: movingPokemon.playerId,
            fromContainer: movingPokemon.inBox ? 'box' : 'team',
            toContainer: inBox ? 'box' : 'team',
          },
          timestamp: new Date().toISOString(),
        });
        apiLogger.debug(
          {
            pokemonId,
            eventType,
            fromContainer: movingPokemon.inBox ? 'box' : 'team',
            toContainer: inBox ? 'box' : 'team',
          },
          'Real-time event emitted for position update'
        );
      } catch (eventError) {
        const eventErrorMessage =
          eventError instanceof Error ? eventError.message : String(eventError);
        apiLogger.warn(
          {
            pokemonId,
            error: eventErrorMessage,
          },
          'Failed to emit real-time event for position update'
        );
      }
    }

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId,
        pokemonId,
        operation: isSwap ? 'swap' : 'move',
        fromPosition: movingPokemon.position,
        toPosition: newPosition,
        fromContainer: movingPokemon.inBox ? 'box' : 'team',
        toContainer: inBox ? 'box' : 'team',
        emittedEvent: shouldEmitEvent,
        duration: `${duration}ms`,
      },
      'Pokemon position updated successfully'
    );

    logApiRequest('PUT', `/api/pokemon/${sessionId}/position`, duration);

    return NextResponse.json(updatedPokemon);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('PUT', `/api/pokemon/${sessionId}/position`, error, 500);
    apiLogger.error(
      {
        sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to update Pokemon position'
    );

    return NextResponse.json(
      { error: 'Failed to update Pokemon position' },
      { status: 500 }
    );
  }
}

// Helper function to update team link validity
async function updateTeamLinkValidity(
  tx: Prisma.TransactionClient, // Use proper transaction client type
  pokemon: { id: string; linkGroup: string | null },
  parentLogger?: typeof logger
) {
  const helperLogger =
    parentLogger?.child({
      function: 'updateTeamLinkValidity',
      pokemonId: pokemon.id,
      linkGroup: pokemon.linkGroup,
    }) ||
    logger.child({
      component: 'api',
      function: 'updateTeamLinkValidity',
      pokemonId: pokemon.id,
      linkGroup: pokemon.linkGroup,
    });

  // Skip if Pokemon has no link group
  if (!pokemon.linkGroup) {
    helperLogger.debug('Skipping team link validity update - no link group');
    return;
  }

  try {
    helperLogger.debug('Updating team link validity');

    // Get all Pokemon in this link group
    const linkedPokemonStart = Date.now();
    const linkedPokemons = await tx.pokemon.findMany({
      where: { linkGroup: pokemon.linkGroup },
    });
    if (parentLogger) {
      // Only log DB operations if we have a parent logger (in transaction context)
      logDbOperation(
        'findMany',
        'pokemon (team linking)',
        Date.now() - linkedPokemonStart
      );
    }

    // Create a map of player IDs to whether they have this Pokemon in their team
    const linkGroupByPlayer = linkedPokemons.reduce(
      (
        acc: Record<string, { inTeam: boolean }>,
        pokemon: { playerId: string; inTeam: boolean; inBox: boolean }
      ) => {
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

    // Update team link validity for all Pokemon in this group
    const updateStart = Date.now();
    await tx.pokemon.updateMany({
      where: { linkGroup: pokemon.linkGroup },
      data: { validTeamLink: allInTeam && linkedPokemons.length > 1 },
    });
    if (parentLogger) {
      logDbOperation(
        'updateMany',
        'pokemon (team validity)',
        Date.now() - updateStart
      );
    }

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
