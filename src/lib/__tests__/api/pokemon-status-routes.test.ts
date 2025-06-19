import type { NextRequest } from 'next/server';

// Mock Prisma at module level for Pokemon Status tests
const mockPokemonStatusPrismaInstance = {
  pokemon: {
    update: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest
    .fn()
    .mockImplementation(() => mockPokemonStatusPrismaInstance),
}));

// Mock NextResponse for Pokemon Status tests
const mockPokemonStatusNextResponseJson = jest.fn();
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: mockPokemonStatusNextResponseJson,
  },
}));

// Mock validation-helpers
const mockValidatePokemonAccess = jest.fn();
jest.mock('@/lib/validation-helpers', () => ({
  validatePokemonAccess: mockValidatePokemonAccess,
}));

// Mock pokemon-helpers
const mockProcessLinkedPokemonDeath = jest.fn();
jest.mock('@/lib/pokemon-helpers', () => ({
  processLinkedPokemonDeath: mockProcessLinkedPokemonDeath,
}));

// Mock api-helpers
const mockSafeParseRequestBody = jest.fn();
const mockSafeEmitRealtimeEvent = jest.fn();
const mockCreateRealtimeEvent = jest.fn();
jest.mock('@/lib/api-helpers', () => ({
  createApiContext: jest.fn(() => ({ requestId: 'test-request-id' })),
  logApiRequestStart: jest.fn(() => ({
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  })),
  handleApiError: jest.fn(),
  createSuccessResponse: jest.fn(),
  createErrorResponse: jest
    .fn()
    .mockImplementation((error, status) => ({ error, status })),
  safeParseRequestBody: mockSafeParseRequestBody,
  safeEmitRealtimeEvent: mockSafeEmitRealtimeEvent,
  createRealtimeEvent: mockCreateRealtimeEvent,
}));

// Mock logger
jest.mock('@/lib/logger', () => ({
  logDbOperation: jest.fn(),
}));

describe('Pokemon Status API Routes', () => {
  const samplePokemon = {
    id: 'pokemon-123',
    name: 'Pikachu',
    playerId: 'player-123',
    sessionId: 'session-123',
    isDead: false,
    linkGroup: null,
  };

  const linkedPokemon = {
    ...samplePokemon,
    linkGroup: 'link-group-1',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockPokemonStatusPrismaInstance.pokemon.update.mockReset();
    mockPokemonStatusNextResponseJson.mockReset();
    mockValidatePokemonAccess.mockReset();
    mockProcessLinkedPokemonDeath.mockReset();
    mockSafeParseRequestBody.mockReset();
    mockSafeEmitRealtimeEvent.mockReset();
    mockCreateRealtimeEvent.mockReset();
  });

  describe('PUT /api/pokemon/[sessionId]/status', () => {
    it('should update a Pokemon status (isDead) successfully', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/status/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        isDead: true,
      };

      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockSafeParseRequestBody.mockResolvedValue({
        success: true,
        data: requestData,
      });

      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: samplePokemon,
      });

      mockPokemonStatusPrismaInstance.pokemon.update.mockResolvedValue({
        ...samplePokemon,
        isDead: true,
      });

      // Act
      await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(mockValidatePokemonAccess).toHaveBeenCalledWith({
        sessionId,
        pokemonId: requestData.pokemonId,
      });

      expect(
        mockPokemonStatusPrismaInstance.pokemon.update
      ).toHaveBeenCalledWith({
        where: { id: requestData.pokemonId },
        data: { isDead: true },
      });

      expect(mockSafeEmitRealtimeEvent).toHaveBeenCalled();
    });

    it('should handle linked Pokemon deaths', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/status/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        isDead: true,
      };

      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockSafeParseRequestBody.mockResolvedValue({
        success: true,
        data: requestData,
      });

      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: linkedPokemon,
      });

      const updatedLinkedPokemon = [
        { ...linkedPokemon, isDead: true },
        {
          id: 'pokemon-456',
          name: 'Charmander',
          isDead: true,
          linkGroup: 'link-group-1',
        },
      ];

      mockProcessLinkedPokemonDeath.mockResolvedValue(updatedLinkedPokemon);

      // Act
      await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(mockValidatePokemonAccess).toHaveBeenCalledWith({
        sessionId,
        pokemonId: requestData.pokemonId,
      });

      expect(mockProcessLinkedPokemonDeath).toHaveBeenCalledWith(
        sessionId,
        'link-group-1'
      );

      expect(
        mockPokemonStatusPrismaInstance.pokemon.update
      ).not.toHaveBeenCalled();
      expect(mockSafeEmitRealtimeEvent).toHaveBeenCalled();
    });

    it('should handle validation errors in request body', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/status/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockSafeParseRequestBody.mockResolvedValue({
        success: false,
        error: 'Invalid request data',
        details: ['pokemonId is required'],
      });

      // Act
      await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(mockValidatePokemonAccess).not.toHaveBeenCalled();
      expect(
        mockPokemonStatusPrismaInstance.pokemon.update
      ).not.toHaveBeenCalled();
    });

    it('should handle invalid Pokemon access', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/status/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-999',
        isDead: true,
      };

      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockSafeParseRequestBody.mockResolvedValue({
        success: true,
        data: requestData,
      });

      mockValidatePokemonAccess.mockResolvedValue({
        isValid: false,
        error: 'Pokemon not found',
        statusCode: 404,
      });

      // Act
      await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(mockValidatePokemonAccess).toHaveBeenCalledWith({
        sessionId,
        pokemonId: requestData.pokemonId,
      });

      expect(
        mockPokemonStatusPrismaInstance.pokemon.update
      ).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/status/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        isDead: true,
      };

      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockSafeParseRequestBody.mockResolvedValue({
        success: true,
        data: requestData,
      });

      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: samplePokemon,
      });

      const error = new Error('Database error');
      mockPokemonStatusPrismaInstance.pokemon.update.mockRejectedValue(error);

      // Act
      await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(mockValidatePokemonAccess).toHaveBeenCalledWith({
        sessionId,
        pokemonId: requestData.pokemonId,
      });

      expect(
        mockPokemonStatusPrismaInstance.pokemon.update
      ).toHaveBeenCalledWith({
        where: { id: requestData.pokemonId },
        data: { isDead: true },
      });
    });

    it('should allow updating death status to false', async () => {
      // Import fresh module for this test
      const { PUT } = await import(
        '@/app/api/pokemon/[sessionId]/status/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        pokemonId: 'pokemon-123',
        isDead: false,
      };

      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockSafeParseRequestBody.mockResolvedValue({
        success: true,
        data: requestData,
      });

      mockValidatePokemonAccess.mockResolvedValue({
        isValid: true,
        pokemon: {
          ...samplePokemon,
          isDead: true, // Starting from dead
        },
      });

      mockPokemonStatusPrismaInstance.pokemon.update.mockResolvedValue({
        ...samplePokemon,
        isDead: false, // Revived
      });

      // Act
      await PUT(mockRequest, { params: mockParams });

      // Assert
      expect(
        mockPokemonStatusPrismaInstance.pokemon.update
      ).toHaveBeenCalledWith({
        where: { id: requestData.pokemonId },
        data: { isDead: false },
      });

      // Should not emit event when reviving
      expect(mockSafeEmitRealtimeEvent).not.toHaveBeenCalled();
    });
  });
});
