// Mock Prisma at module level for Session Routes tests
const mockSessionRoutesPrismaInstance = {
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
    .mockImplementation(() => mockSessionRoutesPrismaInstance),
}));

// Mock NextResponse for Session Routes tests
const mockSessionRoutesNextResponseJson = jest.fn();
jest.mock('next/server', () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: mockSessionRoutesNextResponseJson,
  },
}));

describe('Session API Routes', () => {
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
    mockSessionRoutesPrismaInstance.session.findUnique.mockReset();
    mockSessionRoutesPrismaInstance.session.findMany.mockReset();
    mockSessionRoutesPrismaInstance.session.create.mockReset();
    mockSessionRoutesPrismaInstance.player.findUnique.mockReset();
    mockSessionRoutesPrismaInstance.player.create.mockReset();
    mockSessionRoutesPrismaInstance.playerSession.findUnique.mockReset();
    mockSessionRoutesPrismaInstance.playerSession.create.mockReset();
    // Reset NextResponse mock
    mockSessionRoutesNextResponseJson.mockReset();
  });

  describe('GET /api/session', () => {
    it('should return all sessions successfully', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/session/route');

      // Arrange
      const sessions = [sampleSession];
      mockSessionRoutesPrismaInstance.session.findMany.mockResolvedValue(
        sessions
      );

      // Act
      await GET();

      // Assert
      expect(
        mockSessionRoutesPrismaInstance.session.findMany
      ).toHaveBeenCalledWith({
        include: {
          playerSessions: {
            include: {
              player: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      const expectedResponse = [
        {
          ...sampleSession,
          players: [samplePlayer],
        },
      ];
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        expectedResponse
      );
    });

    it('should return empty array when no sessions exist', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/session/route');

      // Arrange
      mockSessionRoutesPrismaInstance.session.findMany.mockResolvedValue([]);

      // Act
      await GET();

      // Assert
      expect(
        mockSessionRoutesPrismaInstance.session.findMany
      ).toHaveBeenCalled();
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith([]);
    });

    it('should handle database errors', async () => {
      // Import fresh module for each test
      const { GET } = await import('@/app/api/session/route');

      // Arrange
      const error = new Error('Database connection failed');
      mockSessionRoutesPrismaInstance.session.findMany.mockRejectedValue(error);

      // Act
      await GET();

      // Assert
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        { error: 'Failed to fetch sessions' },
        { status: 500 }
      );
    });
  });

  describe('POST /api/session', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let POST: any;

    beforeAll(async () => {
      const sessionModule = await import('@/app/api/session/route');
      POST = sessionModule.POST;
    });

    it('should create a new session with new player', async () => {
      // Arrange
      const requestData = {
        name: 'Test Session',
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };

      mockSessionRoutesPrismaInstance.player.findUnique.mockResolvedValue(null);
      mockSessionRoutesPrismaInstance.player.create.mockResolvedValue(
        samplePlayer
      );
      mockSessionRoutesPrismaInstance.session.create.mockResolvedValue(
        sampleSession
      );

      // Act
      await POST(mockRequest);

      // Assert
      expect(
        mockSessionRoutesPrismaInstance.player.findUnique
      ).toHaveBeenCalledWith({
        where: { id: 'player-123' },
      });
      expect(
        mockSessionRoutesPrismaInstance.player.create
      ).toHaveBeenCalledWith({
        data: {
          id: 'player-123',
          username: 'testuser',
        },
      });
      expect(
        mockSessionRoutesPrismaInstance.session.create
      ).toHaveBeenCalledWith({
        data: {
          name: 'Test Session',
          playerSessions: {
            create: {
              playerId: 'player-123',
              isViewer: false,
            },
          },
        },
        include: {
          playerSessions: {
            include: {
              player: true,
            },
          },
        },
      });

      const expectedResponse = {
        ...sampleSession,
        players: [samplePlayer],
      };
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        expectedResponse,
        {
          status: 201,
        }
      );
    });

    it('should create a new session with existing player', async () => {
      // Arrange
      const requestData = {
        name: 'Test Session',
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };

      mockSessionRoutesPrismaInstance.player.findUnique.mockResolvedValue(
        samplePlayer
      );
      mockSessionRoutesPrismaInstance.session.create.mockResolvedValue(
        sampleSession
      );

      // Act
      await POST(mockRequest);

      // Assert
      expect(
        mockSessionRoutesPrismaInstance.player.findUnique
      ).toHaveBeenCalledWith({
        where: { id: 'player-123' },
      });
      expect(
        mockSessionRoutesPrismaInstance.player.create
      ).not.toHaveBeenCalled();
      expect(mockSessionRoutesPrismaInstance.session.create).toHaveBeenCalled();
    });

    it('should return 400 for invalid request data', async () => {
      // Arrange
      const invalidRequest = {
        name: '', // Invalid: empty name
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(invalidRequest),
      };

      // Act
      await POST(mockRequest);

      // Assert
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        {
          error: 'Invalid request',
          details: expect.any(Object),
        },
        { status: 400 }
      );
      expect(
        mockSessionRoutesPrismaInstance.session.create
      ).not.toHaveBeenCalled();
    });

    it('should handle database errors during session creation', async () => {
      // Arrange
      const requestData = {
        name: 'Test Session',
        username: 'testuser',
        playerUuid: 'player-123',
      };

      const mockRequest = {
        json: jest.fn().mockResolvedValue(requestData),
      };

      const error = new Error('Database error');
      mockSessionRoutesPrismaInstance.player.findUnique.mockResolvedValue(
        samplePlayer
      );
      mockSessionRoutesPrismaInstance.session.create.mockRejectedValue(error);

      // Act
      await POST(mockRequest);

      // Assert
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    });
  });

  describe('Session Detail API Route', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let GET: any;

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

    beforeAll(async () => {
      const sessionDetailModule = await import(
        '@/app/api/session/[sessionId]/route'
      );
      GET = sessionDetailModule.GET;
    });

    beforeEach(() => {
      // Complete reset for this isolated test suite
      jest.clearAllMocks();
      mockSessionRoutesPrismaInstance.session.findUnique.mockReset();
      mockSessionRoutesNextResponseJson.mockReset();
    });

    it('should return session details successfully', async () => {
      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {};
      const mockParams = Promise.resolve({ sessionId });

      // Reset mocks specifically for this test
      mockSessionRoutesPrismaInstance.session.findUnique.mockReset();
      mockSessionRoutesNextResponseJson.mockReset();
      mockSessionRoutesPrismaInstance.session.findUnique.mockResolvedValue(
        sampleSession
      );

      // Act
      await GET(mockRequest, { params: mockParams });

      // Assert
      expect(
        mockSessionRoutesPrismaInstance.session.findUnique
      ).toHaveBeenCalledWith({
        where: { id: sessionId },
        include: {
          playerSessions: {
            include: {
              player: true,
            },
          },
        },
      });

      const expectedResponse = {
        ...sampleSession,
        players: [samplePlayer],
      };
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        expectedResponse
      );
    });

    it('should return 404 when session not found', async () => {
      // Arrange
      const sessionId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // Valid UUID format
      const mockRequest = {};
      const mockParams = Promise.resolve({ sessionId });

      // Reset mocks specifically for this test
      mockSessionRoutesPrismaInstance.session.findUnique.mockReset();
      mockSessionRoutesNextResponseJson.mockReset();
      mockSessionRoutesPrismaInstance.session.findUnique.mockResolvedValue(
        null
      );

      // Act
      await GET(mockRequest, { params: mockParams });

      // Assert
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        { error: 'Session not found' },
        { status: 404 }
      );
    });

    it('should handle database errors', async () => {
      // Arrange
      const sessionId = 'session-123';
      const mockRequest = {};
      const mockParams = Promise.resolve({ sessionId });

      const error = new Error('Database connection failed');
      mockSessionRoutesPrismaInstance.session.findUnique.mockRejectedValue(
        error
      );

      // Act
      await GET(mockRequest, { params: mockParams });

      // Assert
      expect(mockSessionRoutesNextResponseJson).toHaveBeenCalledWith(
        { error: 'Failed to fetch session' },
        { status: 500 }
      );
    });
  });
});
