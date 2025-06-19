import { NextRequest } from 'next/server';
import { addConnection, removeConnection, emitToSession } from '@/lib/realtime';

// Type for our connection wrapper
interface ConnectionWrapper {
  enqueue: (data: Uint8Array) => void;
  close: () => void;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = await params;
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

      // Keep-alive ping every 30 seconds
      const keepAlive = setInterval(() => {
        if (isConnectionClosed) {
          clearInterval(keepAlive);
          return;
        }

        try {
          controller.enqueue(encoder.encode(`: keep-alive\n\n`));
        } catch {
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
      };

      // Handle client disconnect
      request.signal.addEventListener('abort', cleanup);
    },
  });

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
}

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const sessionId = params.sessionId;

  try {
    const body = await request.json();

    // Use shared utility to emit to session
    const connectionsCount = emitToSession(sessionId, body);

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
    console.error('Error in events POST:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to broadcast event' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
