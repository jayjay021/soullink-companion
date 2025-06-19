// Mock the entire Prisma module at the module level
const mockPrismaInstance = {
  pokemon: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
  },
  playerSession: {
    findMany: jest.fn(),
  },
  $transaction: jest.fn(),
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrismaInstance),
}));

import {
  validatePokemonConstraints,
  type PokemonValidationContext,
} from '../pokemon-helpers';

describe('pokemon-helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validatePokemonConstraints', () => {
    const mockContext: PokemonValidationContext = {
      sessionId: 'session-123',
      playerId: 'player-456',
      name: 'Pikachu',
      route: 'Route 1',
    };

    it('should return valid when no constraints are violated', async () => {
      mockPrismaInstance.pokemon.findFirst
        .mockResolvedValueOnce(null) // No existing Pokemon with same name
        .mockResolvedValueOnce(null); // No existing Pokemon on same route

      const result = await validatePokemonConstraints(mockContext);

      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
      expect(mockPrismaInstance.pokemon.findFirst).toHaveBeenCalledTimes(2);
    });

    it('should return invalid when Pokemon name already exists', async () => {
      mockPrismaInstance.pokemon.findFirst
        .mockResolvedValueOnce({ id: 'existing-pokemon' }) // Existing Pokemon with same name
        .mockResolvedValueOnce(null);

      const result = await validatePokemonConstraints(mockContext);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('already caught a Pikachu');
    });

    it('should return invalid when route already has a Pokemon', async () => {
      mockPrismaInstance.pokemon.findFirst
        .mockResolvedValueOnce(null) // No existing Pokemon with same name
        .mockResolvedValueOnce({ name: 'Charmander' }); // Existing Pokemon on same route

      const result = await validatePokemonConstraints(mockContext);

      expect(result.isValid).toBe(false);
      expect(result.error).toContain('already caught Charmander on Route 1');
    });

    it('should handle database errors gracefully', async () => {
      mockPrismaInstance.pokemon.findFirst.mockRejectedValueOnce(
        new Error('DB Error')
      );

      await expect(validatePokemonConstraints(mockContext)).rejects.toThrow(
        'DB Error'
      );
    });
  });

  // Test module importability for other complex functions
  describe('module imports', () => {
    it('should import all helper functions', async () => {
      const {
        assignPokemonPosition,
        processPokemonLinking,
        updateTeamLinkValidity,
        compactBoxPositions,
      } = await import('../pokemon-helpers');

      expect(typeof assignPokemonPosition).toBe('function');
      expect(typeof processPokemonLinking).toBe('function');
      expect(typeof updateTeamLinkValidity).toBe('function');
      expect(typeof compactBoxPositions).toBe('function');
    });

    it('should export proper TypeScript types', async () => {
      const pokemonHelpers = await import('../pokemon-helpers');

      // Check that the module exports exist
      expect(pokemonHelpers.validatePokemonConstraints).toBeDefined();
      expect(pokemonHelpers.assignPokemonPosition).toBeDefined();
      expect(pokemonHelpers.processPokemonLinking).toBeDefined();
      expect(pokemonHelpers.updateTeamLinkValidity).toBeDefined();
      expect(pokemonHelpers.compactBoxPositions).toBeDefined();
    });
  });
});
