import { NextRequest } from 'next/server';
import { addConnection, removeConnection, emitToSession } from '@/lib/realtime';
import { logger, logApiRequest, logApiError } from '@/lib/logger';

// Type for our connection wrapper
interface ConnectionWrapper {
  enqueue: (data: Uint8Array) => void;
  close: () => void;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const start = Date.now();
  const { sessionId } = await params;
  const apiLogger = logger.child({
    component: 'api',
    endpoint: `/api/session/${sessionId}/events`,
    sessionId,
  });

  try {
    apiLogger.info({ sessionId }, 'Establishing SSE connection');

    const encoder = new TextEncoder();
    let isConnectionClosed = false;

    const stream = new ReadableStream({
      start(controller) {
        // Send initial connection message
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: 'connected', sessionId })}\n\n`
          )
        );

        apiLogger.debug({ sessionId }, 'SSE initial connection message sent');

        // Create a response wrapper to store in our connections
        const responseWrapper: ConnectionWrapper = {
          enqueue: (data: Uint8Array) => {
            if (!isConnectionClosed) {
              controller.enqueue(data);
            }
          },
          close: () => {
            if (!isConnectionClosed) {
              controller.close();
              isConnectionClosed = true;
            }
          },
        };

        // Add connection to shared store
        addConnection(sessionId, responseWrapper);
        apiLogger.info({ sessionId }, 'SSE connection added to session');

        // Keep-alive ping every 30 seconds
        const keepAlive = setInterval(() => {
          if (isConnectionClosed) {
            clearInterval(keepAlive);
            return;
          }

          try {
            controller.enqueue(encoder.encode(`: keep-alive\n\n`));
            apiLogger.debug({ sessionId }, 'SSE keep-alive sent');
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : String(error);
            apiLogger.warn(
              {
                sessionId,
                error: errorMessage,
              },
              'SSE keep-alive failed, closing connection'
            );
            clearInterval(keepAlive);
            isConnectionClosed = true;
            removeConnection(sessionId, responseWrapper);
          }
        }, 30000);

        // Cleanup when connection closes
        const cleanup = () => {
          clearInterval(keepAlive);
          isConnectionClosed = true;
          removeConnection(sessionId, responseWrapper);
          const duration = Date.now() - start;
          apiLogger.info(
            {
              sessionId,
              duration: `${duration}ms`,
            },
            'SSE connection closed and cleaned up'
          );
        };

        // Handle client disconnect
        request.signal.addEventListener('abort', cleanup);
      },
    });

    const duration = Date.now() - start;
    logApiRequest('GET', `/api/session/${sessionId}/events`, duration);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Cache-Control',
      },
    });
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('GET', `/api/session/${sessionId}/events`, error, 500);
    apiLogger.error(
      {
        sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to establish SSE connection'
    );

    return new Response(
      JSON.stringify({ error: 'Failed to establish connection' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const start = Date.now();
  const sessionId = params.sessionId;
  const apiLogger = logger.child({
    component: 'api',
    endpoint: `/api/session/${sessionId}/events`,
    sessionId,
  });

  try {
    const body = await request.json();
    apiLogger.info(
      { sessionId, eventData: body },
      'Broadcasting event to session'
    );

    // Use shared utility to emit to session
    const connectionsCount = emitToSession(sessionId, body);

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId,
        connectionsCount,
        eventType: body.type || 'unknown',
        duration: `${duration}ms`,
      },
      'Event broadcasted successfully'
    );

    logApiRequest('POST', `/api/session/${sessionId}/events`, duration);

    return new Response(
      JSON.stringify({
        success: true,
        connectionsCount,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('POST', `/api/session/${sessionId}/events`, error, 500);
    apiLogger.error(
      {
        sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to broadcast event'
    );

    return new Response(
      JSON.stringify({ error: 'Failed to broadcast event' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
