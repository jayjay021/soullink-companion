import {
  validatePokemonAccess,
  validateRequiredFields,
  validateTeamPosition,
  SessionValidationContext,
} from '../validation-helpers';

describe('validation-helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validatePokemonAccess', () => {
    const context: SessionValidationContext = {
      sessionId: 'session-1',
      pokemonId: 'pokemon-1',
      requireOwnership: true,
      playerId: 'player-1',
    };

    it('should return error when pokemonId is missing', async () => {
      const contextWithoutPokemon = { ...context, pokemonId: undefined };

      const result = await validatePokemonAccess(contextWithoutPokemon);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Pokemon ID is required');
      expect(result.statusCode).toBe(400);
    });
  });

  describe('validateRequiredFields', () => {
    it('should return valid when all required fields are present', () => {
      const body = { name: 'Pikachu', level: 25 };
      const requiredFields = ['name', 'level'];

      const result = validateRequiredFields(body, requiredFields);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return error when required fields are missing', () => {
      const body = { name: 'Pikachu' };
      const requiredFields = ['name', 'level'];

      const result = validateRequiredFields(body, requiredFields);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Missing required fields: level');
      expect(result.missingFields).toEqual(['level']);
    });
  });

  describe('validateTeamPosition', () => {
    it('should return valid for team positions 0-5', () => {
      const result = validateTeamPosition(3, false);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return error for team positions > 5', () => {
      const result = validateTeamPosition(6, false);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Team can only have Pokemon in positions 0-5');
    });

    it('should return valid for box positions > 5', () => {
      const result = validateTeamPosition(10, true);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return error for negative positions', () => {
      const result = validateTeamPosition(-1, false);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Position cannot be negative');
    });
  });
});
