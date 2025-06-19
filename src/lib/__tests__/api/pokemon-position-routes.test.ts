// Mock Prisma at module level for Pokemon Position tests
const mockPositionPrismaInstance = {
  pokemon: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPositionPrismaInstance),
}));

// Mock NextResponse for Pokemon Position tests
const mockPositionNextResponseJson = jest.fn();
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: mockPositionNextResponseJson,
  },
}));

// Mock the helper modules
const mockValidateRequiredFields = jest.fn();
const mockValidatePokemonAccess = jest.fn();
const mockHandlePokemonPositionSwap = jest.fn();
const mockHandlePokemonPositionMove = jest.fn();
const mockShouldEmitPositionEvent = jest.fn();
const mockUpdateTeamLinkValidity = jest.fn();
const mockSafeEmitRealtimeEvent = jest.fn();
const mockCreateRealtimeEvent = jest.fn();

jest.mock('@/lib/validation-helpers', () => ({
  validateRequiredFields: mockValidateRequiredFields,
  validatePokemonAccess: mockValidatePokemonAccess,
}));

jest.mock('@/lib/position-helpers', () => ({
  handlePokemonPositionSwap: mockHandlePokemonPositionSwap,
  handlePokemonPositionMove: mockHandlePokemonPositionMove,
  shouldEmitPositionEvent: mockShouldEmitPositionEvent,
}));

jest.mock('@/lib/pokemon-helpers', () => ({
  updateTeamLinkValidity: mockUpdateTeamLinkValidity,
}));

jest.mock('@/lib/api-helpers', () => ({
  createApiContext: jest.fn(() => ({ requestId: 'test-request-id' })),
  logApiRequestStart: jest.fn(() => ({
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    child: jest.fn(() => ({
      info: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    })),
  })),
  handleApiError: jest.fn(),
  createSuccessResponse: jest.fn(),
  createErrorResponse: jest
    .fn()
    .mockImplementation((error, status) => ({ error, status })),
  safeEmitRealtimeEvent: mockSafeEmitRealtimeEvent,
  createRealtimeEvent: mockCreateRealtimeEvent,
}));

import type { NextRequest } from 'next/server';

describe('Pokemon Position API Routes', () => {
  const samplePokemon = {
    id: 'pokemon-123',
    name: 'Pikachu',
    playerId: 'player-123',
    sessionId: 'session-123',
    position: 1,
    inBox: false,
    linkGroup: null,
  };

  const sampleTargetPokemon = {
    id: 'pokemon-456',
    name: 'Charmander',
    playerId: 'player-123',
    sessionId: 'session-123',
    position: 2,
    inBox: false,
    linkGroup: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockPositionPrismaInstance.pokemon.findFirst.mockReset();
    mockPositionPrismaInstance.pokemon.findUnique.mockReset();
    mockPositionPrismaInstance.pokemon.update.mockReset();
    mockPositionPrismaInstance.$transaction.mockReset();
    mockPositionNextResponseJson.mockReset();

    // Reset all mock functions
    mockValidateRequiredFields.mockReset();
    mockValidatePokemonAccess.mockReset();
    mockHandlePokemonPositionSwap.mockReset();
    mockHandlePokemonPositionMove.mockReset();
    mockShouldEmitPositionEvent.mockReset();
    mockUpdateTeamLinkValidity.mockReset();
    mockSafeEmitRealtimeEvent.mockReset();
    mockCreateRealtimeEvent.mockReset();
  });

  describe('PUT /api/pokemon/[sessionId]/position', () => {
    it('should handle a pokemon position move operation', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/position/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        newPosition: 3,
        inBox: false,
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      // Mock validation responses
      mockValidateRequiredFields.mockReturnValue({ isValid: true });
      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: samplePokemon,
      });

      // Mock DB responses
      mockPositionPrismaInstance.pokemon.findFirst.mockResolvedValue(null); // No target Pokemon (not a swap)
      mockPositionPrismaInstance.$transaction.mockImplementation(
        async (callback) => {
          return await callback(mockPositionPrismaInstance);
        }
      );
      mockHandlePokemonPositionMove.mockResolvedValue({
        id: 'pokemon-123',
        position: 3,
        inBox: false,
        inTeam: true,
      });
      mockPositionPrismaInstance.pokemon.findUnique.mockResolvedValue({
        ...samplePokemon,
        position: 3,
      });
      mockShouldEmitPositionEvent.mockReturnValue({
        shouldEmit: true,
        eventType: 'pokemon:position',
      });

      // Act
      await PUT(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockValidateRequiredFields).toHaveBeenCalledWith(requestData, [
        'pokemonId',
        'newPosition',
        'inBox',
      ]);
      expect(mockValidatePokemonAccess).toHaveBeenCalledWith({
        sessionId,
        pokemonId: requestData.pokemonId,
      });
      expect(mockPositionPrismaInstance.pokemon.findFirst).toHaveBeenCalledWith(
        {
          where: {
            sessionId,
            position: requestData.newPosition,
            inBox: requestData.inBox,
            playerId: samplePokemon.playerId,
          },
        }
      );
      expect(mockHandlePokemonPositionMove).toHaveBeenCalled();
      expect(mockSafeEmitRealtimeEvent).toHaveBeenCalled();
    });

    it('should handle a pokemon position swap operation', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/position/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        newPosition: 2,
        inBox: false,
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      // Mock validation responses
      mockValidateRequiredFields.mockReturnValue({ isValid: true });
      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: samplePokemon,
      });

      // Mock DB responses - return a target Pokemon to trigger swap
      mockPositionPrismaInstance.pokemon.findFirst.mockResolvedValue(
        sampleTargetPokemon
      );
      mockPositionPrismaInstance.$transaction.mockImplementation(
        async (callback) => {
          return await callback(mockPositionPrismaInstance);
        }
      );
      mockHandlePokemonPositionSwap.mockResolvedValue({
        id: 'pokemon-123',
        position: 2,
        inBox: false,
        inTeam: true,
      });
      mockPositionPrismaInstance.pokemon.findUnique.mockResolvedValue({
        ...samplePokemon,
        position: 2,
      });
      mockShouldEmitPositionEvent.mockReturnValue({
        shouldEmit: true,
        eventType: 'pokemon:swap',
      });

      // Act
      await PUT(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockValidateRequiredFields).toHaveBeenCalledWith(requestData, [
        'pokemonId',
        'newPosition',
        'inBox',
      ]);
      expect(mockPositionPrismaInstance.pokemon.findFirst).toHaveBeenCalledWith(
        {
          where: {
            sessionId,
            position: requestData.newPosition,
            inBox: requestData.inBox,
            playerId: samplePokemon.playerId,
          },
        }
      );
      expect(mockHandlePokemonPositionSwap).toHaveBeenCalled();
      expect(mockSafeEmitRealtimeEvent).toHaveBeenCalled();
    });

    it('should handle missing required fields', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/position/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        // Missing newPosition and inBox
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      // Mock validation response - return invalid
      mockValidateRequiredFields.mockReturnValue({
        isValid: false,
        error: 'Missing required fields: newPosition, inBox',
        missingFields: ['newPosition', 'inBox'],
      });

      // Act
      await PUT(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockValidateRequiredFields).toHaveBeenCalledWith(requestData, [
        'pokemonId',
        'newPosition',
        'inBox',
      ]);
      expect(mockValidatePokemonAccess).not.toHaveBeenCalled();
      expect(
        mockPositionPrismaInstance.pokemon.findFirst
      ).not.toHaveBeenCalled();
    });

    it('should handle invalid pokemon access', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/position/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-999', // Pokemon doesn't exist or not accessible
        newPosition: 3,
        inBox: false,
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      // Mock validation responses
      mockValidateRequiredFields.mockReturnValue({ isValid: true });
      mockValidatePokemonAccess.mockResolvedValue({
        isValid: false,
        error: 'Pokemon not found',
        statusCode: 404,
      });

      // Act
      await PUT(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockValidateRequiredFields).toHaveBeenCalledWith(requestData, [
        'pokemonId',
        'newPosition',
        'inBox',
      ]);
      expect(mockValidatePokemonAccess).toHaveBeenCalledWith({
        sessionId,
        pokemonId: requestData.pokemonId,
      });
      expect(
        mockPositionPrismaInstance.pokemon.findFirst
      ).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/position/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        newPosition: 3,
        inBox: false,
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      // Mock validation responses
      mockValidateRequiredFields.mockReturnValue({ isValid: true });
      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: samplePokemon,
      });

      // Mock DB error response
      const error = new Error('Database error');
      mockPositionPrismaInstance.pokemon.findFirst.mockRejectedValue(error);

      // Act
      await PUT(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockValidateRequiredFields).toHaveBeenCalledWith(requestData, [
        'pokemonId',
        'newPosition',
        'inBox',
      ]);
      expect(mockValidatePokemonAccess).toHaveBeenCalledWith({
        sessionId,
        pokemonId: requestData.pokemonId,
      });
    });

    it('should handle link groups when present', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/position/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        newPosition: 2,
        inBox: false,
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      const pokemonWithLinkGroup = {
        ...samplePokemon,
        linkGroup: 'link-group-1',
      };

      const targetPokemonWithLinkGroup = {
        ...sampleTargetPokemon,
        linkGroup: 'link-group-2',
      };

      // Mock validation responses
      mockValidateRequiredFields.mockReturnValue({ isValid: true });
      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: pokemonWithLinkGroup,
      });

      // Mock DB responses - return a target Pokemon with different link group
      mockPositionPrismaInstance.pokemon.findFirst.mockResolvedValue(
        targetPokemonWithLinkGroup
      );
      mockPositionPrismaInstance.$transaction.mockImplementation(
        async (callback) => {
          return await callback(mockPositionPrismaInstance);
        }
      );
      mockHandlePokemonPositionSwap.mockResolvedValue({
        id: 'pokemon-123',
        position: 2,
        inBox: false,
        inTeam: true,
      });
      mockPositionPrismaInstance.pokemon.findUnique.mockResolvedValue({
        ...pokemonWithLinkGroup,
        position: 2,
      });
      mockShouldEmitPositionEvent.mockReturnValue({
        shouldEmit: true,
        eventType: 'pokemon:swap',
      });

      // Act
      await PUT(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockUpdateTeamLinkValidity).toHaveBeenCalledTimes(2);
      expect(mockUpdateTeamLinkValidity).toHaveBeenCalledWith(
        { sessionId, linkGroup: 'link-group-1' },
        expect.anything()
      );
      expect(mockUpdateTeamLinkValidity).toHaveBeenCalledWith(
        { sessionId, linkGroup: 'link-group-2' },
        expect.anything()
      );
    });
  });
});
