import { PrismaClient, Prisma } from '@prisma/client';
import { logger, logDbOperation } from '@/lib/logger';

const prisma = new PrismaClient();

// Types for helper functions
export interface PokemonValidationContext {
  sessionId: string;
  playerId: string;
  name: string;
  route: string;
}

export interface LinkingContext {
  sessionId: string;
  route: string;
  linkGroupId: string;
  playerId: string;
}

export interface TeamLinkValidationContext {
  sessionId: string;
  linkGroup: string;
}

/**
 * Validates that a player can catch a specific Pokemon in a session
 * Checks for name uniqueness and route constraints
 */
export async function validatePokemonConstraints(
  context: PokemonValidationContext
): Promise<{ isValid: boolean; error?: string }> {
  const helperLogger = logger.child({
    component: 'pokemon-helpers',
    function: 'validatePokemonConstraints',
    sessionId: context.sessionId,
    playerId: context.playerId,
  });

  try {
    // Check name uniqueness per session per player
    const nameCheckStart = Date.now();
    const existingPokemonByName = await prisma.pokemon.findFirst({
      where: {
        sessionId: context.sessionId,
        playerId: context.playerId,
        name: context.name,
      },
    });
    logDbOperation(
      'findFirst',
      'pokemon (name check)',
      Date.now() - nameCheckStart
    );

    if (existingPokemonByName) {
      helperLogger.warn(
        {
          pokemonName: context.name,
          playerId: context.playerId,
        },
        'Pokemon name already exists for player in session'
      );

      return {
        isValid: false,
        error: `You have already caught a ${context.name} in this session. Each player can only catch one of each Pokemon species per session.`,
      };
    }

    // Check route uniqueness per session per player
    const routeCheckStart = Date.now();
    const existingPokemonByRoute = await prisma.pokemon.findFirst({
      where: {
        sessionId: context.sessionId,
        playerId: context.playerId,
        route: context.route,
      },
      select: { name: true },
    });
    logDbOperation(
      'findFirst',
      'pokemon (route check)',
      Date.now() - routeCheckStart
    );

    if (existingPokemonByRoute) {
      helperLogger.warn(
        {
          route: context.route,
          playerId: context.playerId,
          existingPokemon: existingPokemonByRoute.name,
        },
        'Player already has Pokemon on this route'
      );

      return {
        isValid: false,
        error: `You have already caught ${existingPokemonByRoute.name} on ${context.route}. Each player can only catch one Pokemon per route per session.`,
      };
    }

    helperLogger.debug('Pokemon constraints validation passed');
    return { isValid: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to validate Pokemon constraints'
    );
    throw error;
  }
}

/**
 * Handles position assignment logic for Pokemon in team or box
 */
export async function assignPokemonPosition(
  sessionId: string,
  playerId: string,
  inBox: boolean,
  requestedPosition?: number
): Promise<{ position: number; error?: string }> {
  const helperLogger = logger.child({
    component: 'pokemon-helpers',
    function: 'assignPokemonPosition',
    sessionId,
    playerId,
  });

  try {
    let finalPosition = requestedPosition;

    // Validate team position constraints
    if (!inBox && requestedPosition !== undefined && requestedPosition > 5) {
      helperLogger.warn(
        {
          position: requestedPosition,
        },
        'Invalid team position provided'
      );

      return {
        position: -1,
        error: 'Team can only have Pokemon in positions 0-5',
      };
    }

    // Auto-assign position if needed
    if (finalPosition === undefined || (finalPosition === 0 && inBox)) {
      helperLogger.debug({ inBox }, 'Auto-assigning position');

      if (inBox) {
        // Find the highest position in the box and add 1
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
        helperLogger.debug(
          {
            assignedPosition: finalPosition,
          },
          'Assigned box position'
        );
      } else {
        // Find the first available team position (0-5)
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
          helperLogger.warn('Team is full, cannot add Pokemon');
          return {
            position: -1,
            error: 'Team is full (maximum 6 Pokemon)',
          };
        }

        helperLogger.debug(
          {
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
        inBox: inBox,
        position: finalPosition,
      },
    });
    logDbOperation(
      'findFirst',
      'pokemon (occupancy check)',
      Date.now() - occupancyCheckStart
    );

    if (existingPokemonAtPosition) {
      helperLogger.warn(
        {
          position: finalPosition,
        },
        'Position already occupied'
      );

      return {
        position: -1,
        error: `Position ${finalPosition} is already occupied`,
      };
    }

    return { position: finalPosition };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to assign Pokemon position'
    );
    throw error;
  }
}

/**
 * Handles the linking logic when a new Pokemon is added
 */
export async function processPokemonLinking(
  context: LinkingContext
): Promise<{ isLinked: boolean; linkGroupId: string }> {
  const helperLogger = logger.child({
    component: 'pokemon-helpers',
    function: 'processPokemonLinking',
    sessionId: context.sessionId,
    route: context.route,
  });

  try {
    // Get all players in the session to check linking
    const playersCheckStart = Date.now();
    const sessionPlayers = await prisma.playerSession.findMany({
      where: { sessionId: context.sessionId, isViewer: false },
      select: { playerId: true },
    });
    logDbOperation('findMany', 'playerSession', Date.now() - playersCheckStart);

    helperLogger.debug(
      {
        playerCount: sessionPlayers.length,
      },
      'Retrieved session players for linking'
    );

    // Find all Pokemon on the same route from other players
    const linkingStart = Date.now();
    const pokemonOnSameRoute = await prisma.pokemon.findMany({
      where: {
        sessionId: context.sessionId,
        route: context.route,
        playerId: { not: context.playerId },
      },
    });
    logDbOperation('findMany', 'pokemon (linking)', Date.now() - linkingStart);

    // Update all Pokemon on the same route with the same link group
    if (pokemonOnSameRoute.length >= 0) {
      const updateManyStart = Date.now();
      await prisma.pokemon.updateMany({
        where: {
          sessionId: context.sessionId,
          route: context.route,
        },
        data: { linkGroup: context.linkGroupId },
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
        sessionId: context.sessionId,
        route: context.route,
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

    helperLogger.debug(
      {
        playersWithPokemon: playersWithPokemonOnRoute.length,
        totalPlayers: sessionPlayers.length,
        isValidLink,
      },
      'Calculated link validity'
    );

    // Update all Pokemon in this link group with isLinked based on validity
    const linkValidityStart = Date.now();
    await prisma.pokemon.updateMany({
      where: { linkGroup: context.linkGroupId },
      data: { isLinked: isValidLink },
    });
    logDbOperation(
      'updateMany',
      'pokemon (link validity)',
      Date.now() - linkValidityStart
    );

    return {
      isLinked: isValidLink,
      linkGroupId: context.linkGroupId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to process Pokemon linking'
    );
    throw error;
  }
}

/**
 * Updates team link validity for all Pokemon in a link group
 * Can be used with or without a transaction
 */
export async function updateTeamLinkValidity(
  context: TeamLinkValidationContext,
  tx?: Prisma.TransactionClient
): Promise<void> {
  const helperLogger = logger.child({
    component: 'pokemon-helpers',
    function: 'updateTeamLinkValidity',
    sessionId: context.sessionId,
    linkGroup: context.linkGroup,
  });

  // Skip if no link group
  if (!context.linkGroup) {
    helperLogger.debug('Skipping team link validity update - no link group');
    return;
  }

  const client = tx || prisma;

  try {
    helperLogger.debug('Updating team link validity');

    // Get all Pokemon in this link group
    const linkedPokemonStart = Date.now();
    const linkedPokemons = await client.pokemon.findMany({
      where: { linkGroup: context.linkGroup },
    });
    if (!tx) {
      // Only log DB operations if not in transaction (to avoid double logging)
      logDbOperation(
        'findMany',
        'pokemon (team linking)',
        Date.now() - linkedPokemonStart
      );
    }

    // Count how many linked Pokemon are in team per player
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

    // Check if all linked Pokemon are in team
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
    await client.pokemon.updateMany({
      where: { linkGroup: context.linkGroup },
      data: {
        validTeamLink: allInTeam && linkedPokemons.length > 1,
      },
    });
    if (!tx) {
      logDbOperation(
        'updateMany',
        'pokemon (team validity)',
        Date.now() - teamValidityStart
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

/**
 * Handles linked Pokemon death - marks all Pokemon in the link group as dead
 */
export async function processLinkedPokemonDeath(
  sessionId: string,
  linkGroup: string
): Promise<
  { id: string; name: string; playerId: string; sessionId: string }[]
> {
  const helperLogger = logger.child({
    component: 'pokemon-helpers',
    function: 'processLinkedPokemonDeath',
    sessionId,
    linkGroup,
  });

  try {
    helperLogger.info('Processing linked Pokemon death');

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
    logDbOperation('findMany', 'pokemon (linked)', Date.now() - getLinkedStart);

    helperLogger.info(
      {
        linkGroup,
        affectedPokemonCount: updatedPokemons.length,
      },
      'All linked Pokemon marked as dead'
    );

    return updatedPokemons;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to process linked Pokemon death'
    );
    throw error;
  }
}

/**
 * Compacts box positions after a Pokemon is removed
 */
export async function compactBoxPositions(
  sessionId: string,
  playerId: string,
  tx?: Prisma.TransactionClient
): Promise<void> {
  const helperLogger = logger.child({
    component: 'pokemon-helpers',
    function: 'compactBoxPositions',
    sessionId,
    playerId,
  });

  const client = tx || prisma;

  try {
    helperLogger.debug('Compacting box positions');

    const boxPokemon = await client.pokemon.findMany({
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
        await client.pokemon.update({
          where: { id: boxPokemon[i].id },
          data: { position: i },
        });
      }
    }

    helperLogger.debug(
      { compactedCount: boxPokemon.length },
      'Box compaction completed'
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to compact box positions'
    );
    throw error;
  }
}

/**
 * Generates a link group identifier for a route
 */
export function generateLinkGroupId(sessionId: string, route: string): string {
  return `${sessionId}-${route}`;
}
