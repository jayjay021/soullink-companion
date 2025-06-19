// Jest global setup
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent'; // Disable logs in tests

// Global mock for logger - simple and reliable
jest.mock('@/lib/logger', () => {
  const mockChildLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    child: jest.fn(),
  };

  // Set up recursive child method
  mockChildLogger.child.mockReturnValue(mockChildLogger);

  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    child: jest.fn().mockReturnValue(mockChildLogger),
  };

  return {
    __esModule: true,
    logger: mockLogger,
    createChildLogger: jest.fn(() => mockChildLogger),
    logApiRequest: jest.fn(),
    logApiError: jest.fn(),
    logDbOperation: jest.fn(),
    logWithLevel: {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    },
    logMiddlewareRequest: jest.fn(),
  };
});

// Global mock for Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
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
    playerSession: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  })),
}));

// Mock Next.js server
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => {
      const response = new Response(JSON.stringify(data), {
        status: options?.status || 200,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
      });
      return response;
    }),
  },
  NextRequest: jest.fn(),
}));

// Setup globals for fetch API
if (!global.Request) {
  global.Request = class MockRequest {
    constructor(url, options = {}) {
      this.url = url;
      this.method = options.method || 'GET';
      this.headers = new Map(Object.entries(options.headers || {}));
      this.body = options.body;
    }

    async json() {
      return JSON.parse(this.body || '{}');
    }

    async text() {
      return this.body || '';
    }
  };
}

if (!global.Response) {
  global.Response = class MockResponse {
    constructor(body, options = {}) {
      this.body = body;
      this.status = options.status || 200;
      this.statusText = options.statusText || 'OK';
      this.headers = new Map(Object.entries(options.headers || {}));
    }

    async json() {
      return JSON.parse(this.body || '{}');
    }

    async text() {
      return this.body || '';
    }
  };
}

// Mock realtime
jest.mock('@/lib/realtime', () => ({
  emitToSession: jest.fn(),
}));
