import { PrismaClient } from '@prisma/client';
import { logDbOperation } from '@/lib/logger';
import { createHelperLogger } from '@/lib/logger-helpers';

const prisma = new PrismaClient();

export interface SessionValidationContext {
  sessionId: string;
  pokemonId?: string;
  requireOwnership?: boolean;
  playerId?: string;
}

export interface PokemonValidationResult {
  pokemon?: {
    id: string;
    name: string;
    sessionId: string;
    playerId: string;
    linkGroup: string | null;
    position: number;
    inBox: boolean;
  };
  isValid: boolean;
  error?: string;
  statusCode?: number;
}

/**
 * Validates that a Pokemon exists and optionally belongs to a specific session/player
 */
export async function validatePokemonAccess(
  context: SessionValidationContext
): Promise<PokemonValidationResult> {
  const helperLogger = createHelperLogger({
    component: 'pokemon-helpers',
    function: 'validatePokemonConstraints',
    sessionId: context.sessionId,
    playerId: context.playerId,
  });

  if (!context.pokemonId) {
    return {
      isValid: false,
      error: 'Pokemon ID is required',
      statusCode: 400,
    };
  }

  try {
    // Get the Pokemon
    const pokemonLookupStart = Date.now();
    const pokemon = await prisma.pokemon.findUnique({
      where: { id: context.pokemonId },
    });
    logDbOperation(
      'findUnique',
      'pokemon (validation)',
      Date.now() - pokemonLookupStart
    );

    if (!pokemon) {
      helperLogger.warn(
        { pokemonId: context.pokemonId },
        'Pokemon not found for validation'
      );
      return {
        isValid: false,
        error: 'Pokemon not found',
        statusCode: 404,
      };
    }

    // Check if Pokemon belongs to the specified session
    if (pokemon.sessionId !== context.sessionId) {
      helperLogger.warn(
        {
          pokemonId: context.pokemonId,
          pokemonSessionId: pokemon.sessionId,
          expectedSessionId: context.sessionId,
        },
        'Pokemon does not belong to this session'
      );

      return {
        isValid: false,
        error: 'Pokemon not found in this session',
        statusCode: 404,
      };
    }

    // Check ownership if required
    if (
      context.requireOwnership &&
      context.playerId &&
      pokemon.playerId !== context.playerId
    ) {
      helperLogger.warn(
        {
          pokemonId: context.pokemonId,
          pokemonOwnerId: pokemon.playerId,
          expectedPlayerId: context.playerId,
        },
        'Pokemon does not belong to this player'
      );

      return {
        isValid: false,
        error: 'You do not own this Pokemon',
        statusCode: 403,
      };
    }

    helperLogger.debug('Pokemon validation passed');
    return {
      pokemon,
      isValid: true,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to validate Pokemon access'
    );
    throw error;
  }
}

/**
 * Validates that required fields are present in request body
 */
export function validateRequiredFields(
  body: Record<string, unknown>,
  requiredFields: string[]
): { isValid: boolean; error?: string; missingFields?: string[] } {
  const missingFields = requiredFields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === '';
  });

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`,
      missingFields,
    };
  }

  return { isValid: true };
}

/**
 * Validates team position constraints
 */
export function validateTeamPosition(
  position: number,
  inBox: boolean
): { isValid: boolean; error?: string } {
  if (!inBox && position > 5) {
    return {
      isValid: false,
      error: 'Team can only have Pokemon in positions 0-5',
    };
  }

  if (position < 0) {
    return {
      isValid: false,
      error: 'Position cannot be negative',
    };
  }

  return { isValid: true };
}

/**
 * Gets session players for linking validation
 */
export async function getSessionPlayers(
  sessionId: string
): Promise<{ playerId: string }[]> {
  const helperLogger = createHelperLogger({
    component: 'validation-helpers',
    function: 'getSessionPlayers',
    sessionId,
  });

  try {
    const playersCheckStart = Date.now();
    const sessionPlayers = await prisma.playerSession.findMany({
      where: { sessionId, isViewer: false },
      select: { playerId: true },
    });
    logDbOperation(
      'findMany',
      'playerSession (validation)',
      Date.now() - playersCheckStart
    );

    helperLogger.debug(
      {
        playerCount: sessionPlayers.length,
      },
      'Retrieved session players'
    );

    return sessionPlayers;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to get session players'
    );
    throw error;
  }
}

/**
 * Validates that a session exists and is accessible
 */
export async function validateSessionAccess(
  sessionId: string,
  playerId?: string
): Promise<{
  isValid: boolean;
  error?: string;
  statusCode?: number;
  session?: {
    id: string;
    name: string;
    playerSessions: { playerId: string }[];
  };
}> {
  const helperLogger = createHelperLogger({
    component: 'validation-helpers',
    function: 'validateSessionAccess',
    sessionId,
    playerId,
  });

  try {
    const sessionLookupStart = Date.now();
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        playerSessions: {
          where: playerId ? { playerId } : {},
        },
      },
    });
    logDbOperation(
      'findUnique',
      'session (validation)',
      Date.now() - sessionLookupStart
    );

    if (!session) {
      helperLogger.warn('Session not found');
      return {
        isValid: false,
        error: 'Session not found',
        statusCode: 404,
      };
    }

    // Check if player has access to session (if playerId provided)
    if (playerId && session.playerSessions.length === 0) {
      helperLogger.warn(
        {
          playerId,
        },
        'Player does not have access to this session'
      );
      return {
        isValid: false,
        error: 'You do not have access to this session',
        statusCode: 403,
      };
    }

    helperLogger.debug('Session validation passed');
    return {
      isValid: true,
      session,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    helperLogger.error(
      {
        error: errorMessage,
      },
      'Failed to validate session access'
    );
    throw error;
  }
}
