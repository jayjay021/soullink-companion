// Mock Prisma at module level for Session Join tests
const mockSessionJoinPrismaInstance = {
  session: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  player: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  playerSession: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest
    .fn()
    .mockImplementation(() => mockSessionJoinPrismaInstance),
}));

// Mock NextResponse for Session Join tests
const mockSessionJoinNextResponseJson = jest.fn();
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: mockSessionJoinNextResponseJson,
  },
}));

import type { NextRequest } from 'next/server';

describe('Session Join API Route', () => {
  const samplePlayer = {
    id: 'player-123',
    username: 'testuser',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  };

  const sampleSession = {
    id: 'session-123',
    name: 'Test Session',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    playerSessions: [
      {
        playerId: 'player-123',
        sessionId: 'session-123',
        isViewer: false,
        player: samplePlayer,
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Force module isolation
    // Explicitly reset all Prisma mocks
    mockSessionJoinPrismaInstance.session.findUnique.mockReset();
    mockSessionJoinPrismaInstance.session.findMany.mockReset();
    mockSessionJoinPrismaInstance.session.create.mockReset();
    mockSessionJoinPrismaInstance.player.findUnique.mockReset();
    mockSessionJoinPrismaInstance.player.create.mockReset();
    mockSessionJoinPrismaInstance.playerSession.findUnique.mockReset();
    mockSessionJoinPrismaInstance.playerSession.create.mockReset();
    // Reset NextResponse mock
    mockSessionJoinNextResponseJson.mockReset();
  });

  describe('POST /api/session/join', () => {
    it('should join existing session with new player', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/session/join/route');

      // Arrange
      const requestData = {
        sessionId: 'session-123',
        username: 'newuser',
        playerUuid: 'new-player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };

      mockSessionJoinPrismaInstance.player.findUnique.mockResolvedValue(null);
      mockSessionJoinPrismaInstance.player.create.mockResolvedValue({
        ...samplePlayer,
        id: 'new-player-123',
        username: 'newuser',
      });
      mockSessionJoinPrismaInstance.playerSession.findUnique.mockResolvedValue(
        null
      );
      mockSessionJoinPrismaInstance.playerSession.create.mockResolvedValue({});
      mockSessionJoinPrismaInstance.session.findUnique.mockResolvedValue(
        sampleSession
      );

      // Act
      await POST(mockRequest as unknown as NextRequest);

      // Assert
      expect(
        mockSessionJoinPrismaInstance.player.findUnique
      ).toHaveBeenCalledWith({
        where: { id: 'new-player-123' },
      });
      expect(mockSessionJoinPrismaInstance.player.create).toHaveBeenCalledWith({
        data: { id: 'new-player-123', username: 'newuser' },
      });
      expect(
        mockSessionJoinPrismaInstance.playerSession.findUnique
      ).toHaveBeenCalledWith({
        where: {
          playerId_sessionId: {
            playerId: 'new-player-123',
            sessionId: 'session-123',
          },
        },
      });
      expect(
        mockSessionJoinPrismaInstance.playerSession.create
      ).toHaveBeenCalledWith({
        data: {
          playerId: 'new-player-123',
          sessionId: 'session-123',
          isViewer: false,
        },
      });

      const expectedResponse = {
        ...sampleSession,
        players: [samplePlayer],
      };
      expect(mockSessionJoinNextResponseJson).toHaveBeenCalledWith(
        expectedResponse
      );
    });

    it('should join existing session with existing player', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/session/join/route');

      // Arrange
      const requestData = {
        sessionId: 'session-123',
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };

      mockSessionJoinPrismaInstance.player.findUnique.mockResolvedValue(
        samplePlayer
      );
      mockSessionJoinPrismaInstance.playerSession.findUnique.mockResolvedValue({
        playerId: 'player-123',
        sessionId: 'session-123',
        isViewer: false,
      });
      mockSessionJoinPrismaInstance.session.findUnique.mockResolvedValue(
        sampleSession
      );

      // Act
      await POST(mockRequest as unknown as NextRequest);

      // Assert
      expect(
        mockSessionJoinPrismaInstance.player.create
      ).not.toHaveBeenCalled();
      expect(
        mockSessionJoinPrismaInstance.playerSession.create
      ).not.toHaveBeenCalled();
    });

    it('should return 404 when session not found', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/session/join/route');

      // Arrange
      const requestData = {
        sessionId: 'nonexistent-session',
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };

      mockSessionJoinPrismaInstance.player.findUnique.mockResolvedValue(
        samplePlayer
      );
      mockSessionJoinPrismaInstance.playerSession.findUnique.mockResolvedValue(
        null
      );
      mockSessionJoinPrismaInstance.playerSession.create.mockResolvedValue({});
      mockSessionJoinPrismaInstance.session.findUnique.mockResolvedValue(null);

      // Act
      await POST(mockRequest as unknown as NextRequest);

      // Assert
      expect(mockSessionJoinNextResponseJson).toHaveBeenCalledWith(
        { error: 'Session not found' },
        { status: 404 }
      );
    });

    it('should return 400 for invalid request data', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/session/join/route');

      // Arrange
      const invalidRequest = {
        sessionId: '', // Invalid: empty sessionId
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(invalidRequest),
      };

      // Act
      await POST(mockRequest as unknown as NextRequest);

      // Assert
      expect(mockSessionJoinNextResponseJson).toHaveBeenCalledWith(
        {
          error: 'Invalid request',
          details: expect.any(Object),
        },
        { status: 400 }
      );
      expect(
        mockSessionJoinPrismaInstance.session.findUnique
      ).not.toHaveBeenCalled();
    });

    it('should handle database errors', async () => {
      // Import fresh module for each test
      const { POST } = await import('@/app/api/session/join/route');

      // Arrange
      const requestData = {
        sessionId: 'session-123',
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };

      const error = new Error('Database error');
      mockSessionJoinPrismaInstance.player.findUnique.mockRejectedValue(error);

      // Act
      await POST(mockRequest as unknown as NextRequest);

      // Assert
      expect(mockSessionJoinNextResponseJson).toHaveBeenCalledWith(
        { error: 'Failed to join session' },
        { status: 500 }
      );
    });
  });
});
