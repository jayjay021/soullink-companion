import type { NextRequest } from 'next/server';

// Mock Prisma at module level for Pokemon Routes tests
const mockPokemonRoutePrismaInstance = {
  pokemon: {
    findMany: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest
    .fn()
    .mockImplementation(() => mockPokemonRoutePrismaInstance),
}));

// Mock NextResponse for Pokemon Routes tests
const mockPokemonRouteNextResponseJson = jest.fn();
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: mockPokemonRouteNextResponseJson,
  },
}));

// Mock logger helpers
jest.mock('@/lib/logger-helpers', () => ({
  createHelperLogger: jest.fn().mockImplementation(() => ({
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  })),
}));

describe('Pokemon Routes API', () => {
  const sampleRoutes = [
    { route: 'Route 1' },
    { route: 'Route 2' },
    { route: 'Viridian Forest' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockPokemonRoutePrismaInstance.pokemon.findMany.mockReset();
    mockPokemonRouteNextResponseJson.mockReset();
  });

  describe('GET /api/pokemon/[sessionId]/routes', () => {
    it('should return distinct routes for a session', async () => {
      // Import fresh module for this test
      const { GET } = await import(
        '@/app/api/pokemon/[sessionId]/routes/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockPokemonRoutePrismaInstance.pokemon.findMany.mockResolvedValue(
        sampleRoutes
      );

      // Act
      await GET(mockRequest, { params: mockParams });

      // Assert
      expect(
        mockPokemonRoutePrismaInstance.pokemon.findMany
      ).toHaveBeenCalledWith({
        where: { sessionId },
        select: { route: true },
        distinct: ['route'],
      });

      expect(mockPokemonRouteNextResponseJson).toHaveBeenCalledWith([
        'Route 1',
        'Route 2',
        'Viridian Forest',
      ]);
    });

    it('should handle missing sessionId parameter', async () => {
      // Import fresh module for this test
      const { GET } = await import(
        '@/app/api/pokemon/[sessionId]/routes/route'
      );

      // Arrange
      const sessionId = '';
      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      // Act
      await GET(mockRequest, { params: mockParams });

      // Assert
      expect(
        mockPokemonRoutePrismaInstance.pokemon.findMany
      ).not.toHaveBeenCalled();
      expect(mockPokemonRouteNextResponseJson).toHaveBeenCalledWith(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    });

    it('should return an empty array when no routes exist', async () => {
      // Import fresh module for this test
      const { GET } = await import(
        '@/app/api/pokemon/[sessionId]/routes/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      mockPokemonRoutePrismaInstance.pokemon.findMany.mockResolvedValue([]);

      // Act
      await GET(mockRequest, { params: mockParams });

      // Assert
      expect(
        mockPokemonRoutePrismaInstance.pokemon.findMany
      ).toHaveBeenCalledWith({
        where: { sessionId },
        select: { route: true },
        distinct: ['route'],
      });

      expect(mockPokemonRouteNextResponseJson).toHaveBeenCalledWith([]);
    });

    it('should handle database errors', async () => {
      // Import fresh module for this test
      const { GET } = await import(
        '@/app/api/pokemon/[sessionId]/routes/route'
      );

      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {} as unknown as NextRequest;
      const mockParams = Promise.resolve({ sessionId });

      const databaseError = new Error('Database connection error');
      mockPokemonRoutePrismaInstance.pokemon.findMany.mockRejectedValue(
        databaseError
      );

      // Act
      await GET(mockRequest, { params: mockParams });

      // Assert
      expect(
        mockPokemonRoutePrismaInstance.pokemon.findMany
      ).toHaveBeenCalledWith({
        where: { sessionId },
        select: { route: true },
        distinct: ['route'],
      });

      expect(mockPokemonRouteNextResponseJson).toHaveBeenCalledWith(
        { error: 'Failed to get pokemon routes' },
        { status: 500 }
      );
    });
  });
});
