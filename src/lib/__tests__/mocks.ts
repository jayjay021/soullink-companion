// Shared mocks for tests

// Mock Prisma Client
export const mockPrismaClient = {
  pokemon: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
  },
  session: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  player: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
};

// Mock transaction client (subset of Prisma)
export const mockTransactionClient = {
  pokemon: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
    findUnique: jest.fn(),
  },
};

// Mock logger
interface MockLogger {
  info: jest.Mock;
  error: jest.Mock;
  warn: jest.Mock;
  debug: jest.Mock;
  child: jest.Mock;
}

const createMockLogger = (): MockLogger => {
  const mockLogger: MockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    child: jest.fn().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      child: jest.fn(),
    }),
  };
  return mockLogger;
};

export const mockLogger = createMockLogger();

// Mock logger functions
export const mockLogDbOperation = jest.fn();
export const mockLogApiRequest = jest.fn();
export const mockLogApiError = jest.fn();

// Mock realtime functions
export const mockEmitToSession = jest.fn();

// Sample test data
export const samplePokemon = {
  id: 'pokemon-1',
  name: 'Pikachu',
  sessionId: 'session-1',
  playerId: 'player-1',
  linkGroup: null,
  position: 1,
  inBox: false,
  isLinked: false,
  route: 'Route 1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const sampleSession = {
  id: 'session-1',
  name: 'Test Session',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const samplePlayer = {
  id: 'player-1',
  username: 'testuser',
  isViewer: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Helper to reset all mocks
export const resetAllMocks = (): void => {
  jest.clearAllMocks();

  // Reset Prisma mocks
  Object.values(mockPrismaClient).forEach((resource) => {
    if (typeof resource === 'object' && resource !== null) {
      Object.values(resource).forEach((method) => {
        if (jest.isMockFunction(method)) {
          method.mockReset();
        }
      });
    } else if (jest.isMockFunction(resource)) {
      resource.mockReset();
    }
  });

  // Reset transaction client mocks
  Object.values(mockTransactionClient).forEach((resource) => {
    if (typeof resource === 'object' && resource !== null) {
      Object.values(resource).forEach((method) => {
        if (jest.isMockFunction(method)) {
          method.mockReset();
        }
      });
    }
  });

  // Reset other mocks
  mockLogDbOperation.mockReset();
  mockLogApiRequest.mockReset();
  mockLogApiError.mockReset();
  mockEmitToSession.mockReset();
};
