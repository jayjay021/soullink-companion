/**
 * Tests for the Session Events API routes.
 * This covers the SSE implementation for real-time events.
 */

import { NextRequest } from 'next/server';

// Mock modules first
const mockAddConnection = jest.fn();
const mockRemoveConnection = jest.fn();
const mockEmitToSession = jest.fn();

jest.mock('@/lib/realtime', () => ({
  addConnection: mockAddConnection,
  removeConnection: mockRemoveConnection,
  emitToSession: mockEmitToSession,
}));

jest.mock('@/lib/logger', () => ({
  logApiRequest: jest.fn(),
  logApiError: jest.fn(),
}));

const mockLogger = {
  info: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock('@/lib/logger-helpers', () => ({
  createHelperLogger: jest.fn().mockReturnValue(mockLogger),
}));

describe('Session Events API Routes', () => {
  // Store original implementations
  let originalTextEncoder: typeof TextEncoder;
  let originalReadableStream: typeof ReadableStream;
  let originalResponse: typeof Response;

  // Mock implementations
  let mockEnqueue: jest.Mock;
  let mockControllerClose: jest.Mock;
  let mockAbortController: AbortController;
  let mockAddEventListener: jest.Mock;

  beforeAll(() => {
    originalTextEncoder = global.TextEncoder;
    originalReadableStream = global.ReadableStream;
    originalResponse = global.Response;
  });

  afterAll(() => {
    global.TextEncoder = originalTextEncoder;
    global.ReadableStream = originalReadableStream;
    global.Response = originalResponse;
  });

  beforeEach(() => {
    jest.resetModules();
    mockAddConnection.mockReset();
    mockRemoveConnection.mockReset();
    mockEmitToSession.mockReset();

    // Reset mocks for each test
    mockEnqueue = jest.fn();
    mockControllerClose = jest.fn();
    mockAddEventListener = jest.fn();
    mockAbortController = new AbortController();
    mockAbortController.signal.addEventListener = mockAddEventListener;

    // Mock TextEncoder
    global.TextEncoder = jest.fn().mockImplementation(() => ({
      encode: (input: string) =>
        new Uint8Array([...input].map((c) => c.charCodeAt(0))),
    }));

    // Mock ReadableStream
    global.ReadableStream = jest.fn().mockImplementation((source) => {
      if (source?.start) {
        source.start({
          enqueue: mockEnqueue,
          close: mockControllerClose,
        });
      }
      return { mockStreamInstance: true };
    }) as unknown as typeof ReadableStream;

    // Mock Response
    global.Response = jest.fn().mockImplementation((body, init) => ({
      body,
      headers: init?.headers || {},
      status: init?.status || 200,
      json: () =>
        Promise.resolve(typeof body === 'string' ? JSON.parse(body) : body),
    })) as unknown as typeof Response;
    // Make sure to reset timers to prevent Jest from hanging
    jest.useFakeTimers();
  });

  // Use afterEach to clean up any timers or intervals
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('GET /api/session/[sessionId]/events', () => {
    it('should establish an SSE connection successfully', async () => {
      // Import the route handler directly
      const { GET } = await import(
        '@/app/api/session/[sessionId]/events/route'
      );

      // Create test data
      const sessionId = 'test-session-123';
      const mockRequest = {
        signal: mockAbortController.signal,
        nextUrl: { pathname: `/api/session/${sessionId}/events` },
        cookies: { getAll: () => [] },
        page: { name: 'events' },
        ua: {},
        [Symbol.for('next.internals')]: {},
      } as unknown as NextRequest;
      const mockParams = { sessionId };

      // Act
      const response = await GET(mockRequest, { params: mockParams });

      // Assert
      expect(mockAddConnection).toHaveBeenCalled();
      expect(mockAddConnection.mock.calls[0][0]).toBe(sessionId);
      expect(mockEnqueue).toHaveBeenCalled();
      // For our mock Response, headers is a simple object
      // Cast to unknown first, then to Record type to avoid TypeScript error
      expect(
        (response.headers as unknown as Record<string, string>)['Content-Type']
      ).toBe('text/event-stream');
      expect(
        (response.headers as unknown as Record<string, string>)['Cache-Control']
      ).toBe('no-cache');
      expect(
        (response.headers as unknown as Record<string, string>)['Connection']
      ).toBe('keep-alive');

      // Verify abort listener was registered
      expect(mockAddEventListener).toHaveBeenCalledWith(
        'abort',
        expect.any(Function)
      );
    });

    it('should handle errors when establishing the connection', async () => {
      // Force an error by making ReadableStream throw
      global.ReadableStream = jest.fn().mockImplementation(() => {
        throw new Error('Stream creation failed');
      }) as unknown as typeof ReadableStream;

      // Import the route handler directly
      const { GET } = await import(
        '@/app/api/session/[sessionId]/events/route'
      );

      // Create test data
      const sessionId = 'test-session-123';
      const mockRequest = {
        signal: mockAbortController.signal,
        nextUrl: { pathname: `/api/session/${sessionId}/events` },
        cookies: { getAll: () => [] },
        page: { name: 'events' },
        ua: {},
        [Symbol.for('next.internals')]: {},
      } as unknown as NextRequest;
      const mockParams = { sessionId };

      // Act
      const response = await GET(mockRequest, { params: mockParams });

      // Assert
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({
        error: 'Failed to establish connection',
      });
    });

    it('should cleanup connections when the client disconnects', async () => {
      // Add a real abort handler we can call later
      let savedHandler: (() => void) | null = null;
      mockAddEventListener.mockImplementation(
        (event: string, handler: () => void) => {
          if (event === 'abort') {
            savedHandler = handler;
          }
        }
      );

      // Import the route handler directly
      const { GET } = await import(
        '@/app/api/session/[sessionId]/events/route'
      );

      // Create test data
      const sessionId = 'test-session-123';
      const mockRequest = {
        signal: mockAbortController.signal,
        // Include any other properties needed for NextRequest
        nextUrl: { pathname: `/api/session/${sessionId}/events` },
      } as unknown as NextRequest;
      const mockParams = { sessionId };

      // Act
      await GET(mockRequest, { params: mockParams });

      // Trigger the abort event handler directly
      if (savedHandler) {
        (savedHandler as () => void)();
      }

      // Assert
      expect(mockRemoveConnection).toHaveBeenCalled();
    });
  });

  describe('POST /api/session/[sessionId]/events', () => {
    it('should broadcast an event to connected clients', async () => {
      // Import the route handler directly
      const { POST } = await import(
        '@/app/api/session/[sessionId]/events/route'
      );

      // Create test data
      const sessionId = 'test-session-123';
      const eventData = { type: 'pokemon-added', data: { id: '123' } };
      const mockRequest = {
        json: jest.fn().mockResolvedValue(eventData),
      } as unknown as NextRequest;
      const mockParams = { sessionId };

      // Mock 2 active connections
      mockEmitToSession.mockReturnValue(2);

      // Act
      const response = await POST(mockRequest, { params: mockParams });
      const responseBody = await response.json();

      // Assert
      expect(mockEmitToSession).toHaveBeenCalledWith(sessionId, eventData);
      expect(responseBody.success).toBe(true);
      expect(responseBody.connectionsCount).toBe(2);
      expect(response.status).toBe(200);
    });

    it('should handle errors when broadcasting fails', async () => {
      // Import the route handler directly
      const { POST } = await import(
        '@/app/api/session/[sessionId]/events/route'
      );

      // Create test data that will cause an error
      const sessionId = 'test-session-123';
      const mockRequest = {
        json: jest.fn().mockRejectedValue(new Error('Failed to parse JSON')),
      } as unknown as NextRequest;
      const mockParams = { sessionId };

      // Act
      const response = await POST(mockRequest, { params: mockParams });

      // Assert
      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({
        error: 'Failed to broadcast event',
      });
      expect(mockEmitToSession).not.toHaveBeenCalled();
    });

    it('should report zero connections when no clients are connected', async () => {
      // Import the route handler directly
      const { POST } = await import(
        '@/app/api/session/[sessionId]/events/route'
      );

      // Create test data
      const sessionId = 'test-session-123';
      const eventData = { type: 'pokemon-added', data: { id: '123' } };
      const mockRequest = {
        json: jest.fn().mockResolvedValue(eventData),
      } as unknown as NextRequest;
      const mockParams = { sessionId };

      // Mock no active connections
      mockEmitToSession.mockReturnValue(0);

      // Act
      const response = await POST(mockRequest, { params: mockParams });
      const responseBody = await response.json();

      // Assert
      expect(mockEmitToSession).toHaveBeenCalledWith(sessionId, eventData);
      expect(responseBody.success).toBe(true);
      expect(responseBody.connectionsCount).toBe(0);
    });
  });
});
