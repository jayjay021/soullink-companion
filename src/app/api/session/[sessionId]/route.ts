import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';
import { logApiRequest, logApiError, logDbOperation } from '@/lib/logger';
import { createHelperLogger } from '@/lib/logger-helpers';

const prisma = new PrismaClient();

// GET /api/session/[sessionId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse<SessionResponse | { error: string }>> {
  const start = Date.now();
  const { sessionId } = await params;
  const apiLogger = createHelperLogger({
    component: 'api',
    endpoint: `/api/session/${sessionId}`,
    sessionId,
  });

  try {
    apiLogger.info({ sessionId }, 'Fetching session details');

    const dbStart = Date.now();
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        playerSessions: {
          include: {
            player: true,
          },
        },
      },
    });
    const dbDuration = Date.now() - dbStart;

    logDbOperation('findUnique', 'session', dbDuration);

    if (!session) {
      const duration = Date.now() - start;
      apiLogger.warn(
        {
          sessionId,
          duration: `${duration}ms`,
        },
        'Session not found'
      );

      logApiRequest('GET', `/api/session/${sessionId}`, duration);

      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Transform the response to match the expected format
    const transformedSession = {
      ...session,
      players: session.playerSessions.map((ps) => ps.player),
    };

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId,
        sessionName: session.name,
        playerCount: session.playerSessions.length,
        duration: `${duration}ms`,
      },
      'Session details fetched successfully'
    );

    logApiRequest('GET', `/api/session/${sessionId}`, duration);

    return NextResponse.json(transformedSession as SessionResponse);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('GET', `/api/session/${sessionId}`, error, 500);
    apiLogger.error(
      {
        sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to fetch session details'
    );

    return NextResponse.json(
      { error: 'Failed to fetch session' },
      { status: 500 }
    );
  }
}
