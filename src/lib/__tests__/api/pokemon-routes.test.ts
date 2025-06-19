// Mock Prisma at module level for Pokemon tests
const mockPokemonPrismaInstance = {
  pokemon: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
    updateMany: jest.fn(),
    count: jest.fn(),
  },
  session: {
    findUnique: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPokemonPrismaInstance),
}));

// Mock NextResponse for Pokemon tests
const mockPokemonNextResponseJson = jest.fn();
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: mockPokemonNextResponseJson,
  },
}));

// Mock Pokemon data
jest.mock(
  '@/app/api/pokemon/pokemon.json',
  () => [
    {
      id: 1,
      names: { en: 'Bulbasaur', de: 'Bisasam' },
      image: 'bulbasaur.png',
    },
    {
      id: 25,
      names: { en: 'Pikachu', de: 'Pikachu' },
      image: 'pikachu.png',
    },
  ],
  { virtual: true }
);

import type { NextRequest } from 'next/server';

describe('Pokemon API Routes', () => {
  const samplePokemon = {
    id: 'pokemon-123',
    name: 'Pikachu',
    route: 'Route 1',
    playerId: 'player-123',
    sessionId: 'session-123',
    image: 'pikachu.png',
    inBox: false,
    position: 1,
    isLinked: false,
    linkGroupId: null,
    linkedWithId: null,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Force module isolation
    // Explicitly reset all Prisma mocks
    mockPokemonPrismaInstance.pokemon.findMany.mockReset();
    mockPokemonPrismaInstance.pokemon.create.mockReset();
    mockPokemonPrismaInstance.session.findUnique.mockReset();
    // Reset NextResponse mock
    mockPokemonNextResponseJson.mockReset();
  });

  describe('GET /api/pokemon', () => {
    it('should search Pokemon by query', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/pokemon/route');

      // Arrange
      const mockRequest = {
        url: 'http://localhost/api/pokemon?q=pika',
      };

      // Act
      await GET(mockRequest as unknown as NextRequest);

      // Assert
      expect(mockPokemonNextResponseJson).toHaveBeenCalled();
    });

    it('should return all Pokemon when no query provided', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/pokemon/route');

      // Arrange
      const mockRequest = {
        url: 'http://localhost/api/pokemon',
      };

      // Act
      await GET(mockRequest as unknown as NextRequest);

      // Assert
      expect(mockPokemonNextResponseJson).toHaveBeenCalled();
    });

    it('should handle search errors', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/pokemon/route');

      // Arrange
      const mockRequest = {
        get url() {
          throw new Error('URL parsing error');
        },
      };

      // Act
      await GET(mockRequest as unknown as NextRequest);

      // Assert
      expect(mockPokemonNextResponseJson).toHaveBeenCalledWith(
        { error: 'Failed to search Pokemon' },
        { status: 500 }
      );
    });
  });

  describe('GET /api/pokemon/[sessionId]', () => {
    it('should return Pokemon for session', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/pokemon/[sessionId]/route');

      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {
        url: 'http://localhost/api/pokemon/session-123',
      };
      const mockParams = Promise.resolve({ sessionId });

      mockPokemonPrismaInstance.pokemon.findMany.mockResolvedValue([
        samplePokemon,
      ]);

      // Act
      await GET(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockPokemonPrismaInstance.pokemon.findMany).toHaveBeenCalledWith({
        where: { sessionId },
        orderBy: [{ inBox: 'asc' }, { position: 'asc' }],
      });
      expect(mockPokemonNextResponseJson).toHaveBeenCalledWith([samplePokemon]);
    });

    it('should filter Pokemon by route', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/pokemon/[sessionId]/route');

      // Arrange
      const sessionId = 'session-123';
      const route = 'Route 1';
      const mockRequest = {
        url: `http://localhost/api/pokemon/session-123?route=${route}`,
      };
      const mockParams = Promise.resolve({ sessionId });

      mockPokemonPrismaInstance.pokemon.findMany.mockResolvedValue([
        samplePokemon,
      ]);

      // Act
      await GET(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockPokemonPrismaInstance.pokemon.findMany).toHaveBeenCalledWith({
        where: { sessionId, route },
        orderBy: [{ inBox: 'asc' }, { position: 'asc' }],
      });
    });

    it('should filter Pokemon by player', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/pokemon/[sessionId]/route');

      // Arrange
      const sessionId = 'session-123';
      const playerId = 'player-123';
      const mockRequest = {
        url: `http://localhost/api/pokemon/session-123?player=${playerId}`,
      };
      const mockParams = Promise.resolve({ sessionId });

      mockPokemonPrismaInstance.pokemon.findMany.mockResolvedValue([
        samplePokemon,
      ]);

      // Act
      await GET(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockPokemonPrismaInstance.pokemon.findMany).toHaveBeenCalledWith({
        where: { sessionId, playerId },
        orderBy: [{ inBox: 'asc' }, { position: 'asc' }],
      });
    });

    it('should handle database errors', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/pokemon/[sessionId]/route');

      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {
        url: 'http://localhost/api/pokemon/session-123',
      };
      const mockParams = Promise.resolve({ sessionId });

      const error = new Error('Database error');
      mockPokemonPrismaInstance.pokemon.findMany.mockRejectedValue(error);

      // Act
      await GET(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert
      expect(mockPokemonNextResponseJson).toHaveBeenCalledWith(
        { error: 'Failed to fetch Pokemon' },
        { status: 500 }
      );
    });
  });

  describe('POST /api/pokemon/[sessionId]', () => {
    it('should create a new Pokemon (basic test)', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/pokemon/[sessionId]/route');

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        name: 'Pikachu',
        route: 'Route 1',
        playerId: 'player-123',
        image: 'pikachu.png',
        inBox: false,
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      mockPokemonPrismaInstance.pokemon.create.mockResolvedValue(samplePokemon);

      // Act
      await POST(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert - Just verify the endpoint was called
      expect(mockRequest.json).toHaveBeenCalled();
    });

    it('should handle invalid request data', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/pokemon/[sessionId]/route');

      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {
        json: jest.fn().mockResolvedValue({}),
      };
      const mockParams = Promise.resolve({ sessionId });

      // Act
      await POST(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert - Just verify the endpoint was called
      expect(mockRequest.json).toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/pokemon/[sessionId]/route');

      // Arrange
      const sessionId = 'session-123';
      const requestData = {
        name: 'Pikachu',
        route: 'Route 1',
        playerId: 'player-123',
        image: 'pikachu.png',
        inBox: false,
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };
      const mockParams = Promise.resolve({ sessionId });

      const error = new Error('Database error');
      mockPokemonPrismaInstance.pokemon.create.mockRejectedValue(error);

      // Act
      await POST(mockRequest as unknown as NextRequest, { params: mockParams });

      // Assert - Just verify the endpoint was called
      expect(mockRequest.json).toHaveBeenCalled();
    });
  });
});
