import { Prisma } from '@prisma/client';
import { createHelperLogger } from '@/lib/logger-helpers';
import { logger } from '@/lib/logger';

export interface PositionSwapContext {
  sessionId: string;
  movingPokemonId: string;
  targetPokemonId: string;
  newPosition: number;
  newInBox: boolean;
  originalPosition: number;
  originalInBox: boolean;
}

export interface PositionMoveContext {
  sessionId: string;
  pokemonId: string;
  playerId: string;
  newPosition: number;
  newInBox: boolean;
  originalPosition: number;
  originalInBox: boolean;
}

/**
 * Handles swapping positions between two Pokemon
 */
export async function handlePokemonPositionSwap(
  context: PositionSwapContext,
  tx: Prisma.TransactionClient,
  parentLogger?: typeof logger
): Promise<{
  id: string;
  position: number;
  inBox: boolean;
  inTeam: boolean;
} | null> {
  const helperLogger =
    parentLogger?.child({
      function: 'handlePokemonPositionSwap',
      movingPokemonId: context.movingPokemonId,
      targetPokemonId: context.targetPokemonId,
    }) ||
    createHelperLogger({
      component: 'position-helpers',
      function: 'handlePokemonPositionSwap',
      movingPokemonId: context.movingPokemonId,
      targetPokemonId: context.targetPokemonId,
    });

  try {
    helperLogger.info('Performing Pokemon position swap');

    // Use a temporary position to avoid constraint conflicts
    const tempPosition = -999;

    // Step 1: Move target Pokemon to temporary position
    await tx.pokemon.update({
      where: { id: context.targetPokemonId },
      data: { position: tempPosition },
    });
    helperLogger.debug(
      { targetPokemonId: context.targetPokemonId, tempPosition },
      'Moved target to temp position'
    );

    // Step 2: Move the dragged Pokemon to the target position
    await tx.pokemon.update({
      where: { id: context.movingPokemonId },
      data: {
        position: context.newPosition,
        inBox: context.newInBox,
        inTeam: !context.newInBox,
      },
    });
    helperLogger.debug(
      {
        pokemonId: context.movingPokemonId,
        newPosition: context.newPosition,
        inBox: context.newInBox,
      },
      'Moved Pokemon to target position'
    );

    // Step 3: Move target Pokemon to the dragged Pokemon's original position
    await tx.pokemon.update({
      where: { id: context.targetPokemonId },
      data: {
        position: context.originalPosition,
        inBox: context.originalInBox,
        inTeam: !context.originalInBox,
      },
    });
    helperLogger.debug(
      {
        targetPokemonId: context.targetPokemonId,
        originalPosition: context.originalPosition,
        originalInBox: context.originalInBox,
      },
      'Moved target to original position'
    );

    // Return the moved Pokemon
    const updatedPokemon = await tx.pokemon.findUnique({
      where: { id: context.movingPokemonId },
    });

    helperLogger.info('Pokemon swap completed successfully');
    return updatedPokemon;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to handle Pokemon position swap'
    );
    throw error;
  }
}

/**
 * Handles moving a Pokemon to a new position (not a swap)
 */
export async function handlePokemonPositionMove(
  context: PositionMoveContext,
  tx: Prisma.TransactionClient,
  parentLogger?: typeof logger
): Promise<{ id: string; position: number; inBox: boolean; inTeam: boolean }> {
  const helperLogger =
    parentLogger?.child({
      function: 'handlePokemonPositionMove',
      pokemonId: context.pokemonId,
    }) ||
    createHelperLogger({
      component: 'position-helpers',
      function: 'handlePokemonPositionMove',
      pokemonId: context.pokemonId,
    });

  try {
    helperLogger.info(
      {
        pokemonId: context.pokemonId,
        newPosition: context.newPosition,
        inBox: context.newInBox,
      },
      'Performing Pokemon position move'
    );

    // Move the Pokemon to the new position
    const updatedPokemon = await tx.pokemon.update({
      where: { id: context.pokemonId },
      data: {
        position: context.newPosition,
        inBox: context.newInBox,
        inTeam: !context.newInBox,
      },
    });
    helperLogger.debug(
      {
        pokemonId: context.pokemonId,
        newPosition: context.newPosition,
        inBox: context.newInBox,
      },
      'Pokemon moved to new position'
    );

    // Handle position compaction based on move type
    if (context.originalInBox) {
      if (!context.newInBox) {
        // Pokemon moved from box to team - compact the box
        helperLogger.debug('Compacting box after moving Pokemon to team');
        await compactBoxPositionsInTransaction(
          context.sessionId,
          context.playerId,
          tx,
          helperLogger
        );
      } else {
        // Pokemon moved within the box - shift down Pokemon that were after the original position
        helperLogger.debug('Adjusting box positions after internal move');
        await adjustBoxPositionsAfterMove(
          context.sessionId,
          context.playerId,
          context.pokemonId,
          context.originalPosition,
          context.newPosition,
          tx,
          helperLogger
        );
      }
    }

    helperLogger.info('Pokemon move completed successfully');
    return updatedPokemon;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to handle Pokemon position move'
    );
    throw error;
  }
}

/**
 * Compacts box positions within a transaction
 */
async function compactBoxPositionsInTransaction(
  sessionId: string,
  playerId: string,
  tx: Prisma.TransactionClient,
  parentLogger?: typeof logger
): Promise<void> {
  const helperLogger =
    parentLogger?.child({
      function: 'compactBoxPositionsInTransaction',
    }) ||
    createHelperLogger({
      component: 'position-helpers',
      function: 'compactBoxPositionsInTransaction',
    });

  const boxPokemon = await tx.pokemon.findMany({
    where: {
      sessionId,
      playerId,
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

  helperLogger.debug(
    { compactedCount: boxPokemon.length },
    'Box compaction completed'
  );
}

/**
 * Adjusts box positions after a Pokemon is moved within the box
 */
async function adjustBoxPositionsAfterMove(
  sessionId: string,
  playerId: string,
  movedPokemonId: string,
  originalPosition: number,
  newPosition: number,
  tx: Prisma.TransactionClient,
  parentLogger?: typeof logger
): Promise<void> {
  const helperLogger =
    parentLogger?.child({
      function: 'adjustBoxPositionsAfterMove',
    }) ||
    createHelperLogger({
      component: 'position-helpers',
      function: 'adjustBoxPositionsAfterMove',
    });

  // Get Pokemon that were positioned after the moved Pokemon's original position
  const pokemonToShift = await tx.pokemon.findMany({
    where: {
      sessionId,
      playerId,
      inBox: true,
      position: { gt: originalPosition },
      id: { not: movedPokemonId },
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

  helperLogger.debug(
    { shiftedCount: pokemonToShift.length },
    'Position shifting completed'
  );

  // Adjust the moved Pokemon's position if it was moved to the end
  // Since we removed one position from the middle, the end position should be one less
  const finalPosition =
    newPosition > originalPosition ? newPosition - 1 : newPosition;
  if (finalPosition !== newPosition) {
    await tx.pokemon.update({
      where: { id: movedPokemonId },
      data: { position: finalPosition },
    });
    helperLogger.debug(
      {
        originalNewPosition: newPosition,
        finalPosition,
      },
      'Adjusted final position'
    );
  }
}

/**
 * Determines if a position move should trigger a real-time event
 */
export function shouldEmitPositionEvent(
  originalInBox: boolean,
  newInBox: boolean,
  isSwap: boolean,
  targetOriginalInBox?: boolean
): { shouldEmit: boolean; eventType: string } {
  if (isSwap) {
    // For swap operations - emit if one Pokemon moved between team/box
    const movedBetweenContainers =
      originalInBox !== newInBox ||
      (targetOriginalInBox !== undefined &&
        targetOriginalInBox !== originalInBox);

    return {
      shouldEmit: movedBetweenContainers,
      eventType: 'pokemon-moved',
    };
  } else {
    // For move operations - emit if Pokemon moved between team/box
    const movedBetweenContainers = originalInBox !== newInBox;

    return {
      shouldEmit: movedBetweenContainers,
      eventType: 'pokemon-moved',
    };
  }
}
