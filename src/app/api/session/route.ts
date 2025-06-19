import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';
import { CreateSessionRequestSchema } from '@/types/api';
import {
  logger,
  logApiRequest,
  logApiError,
  logDbOperation,
} from '@/lib/logger';

const prisma = new PrismaClient();

// GET /api/session
export async function GET(): Promise<
  NextResponse<SessionResponse[] | { error: string }>
> {
  const start = Date.now();
  const apiLogger = logger.child({
    component: 'api',
    endpoint: '/api/session',
  });

  try {
    apiLogger.info('Fetching all sessions');

    const dbStart = Date.now();
    const sessions = await prisma.session.findMany({
      include: {
        playerSessions: {
          include: {
            player: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    const dbDuration = Date.now() - dbStart;

    logDbOperation('findMany', 'session', dbDuration);

    // Transform the response to match the expected format
    const transformedSessions = sessions.map((session) => ({
      ...session,
      players: session.playerSessions.map((ps) => ps.player),
    }));

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionCount: transformedSessions.length,
        duration: `${duration}ms`,
      },
      'Sessions fetched successfully'
    );

    logApiRequest('GET', '/api/session', duration);

    return NextResponse.json(transformedSessions as SessionResponse[]);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('GET', '/api/session', error, 500);
    apiLogger.error(
      {
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to fetch sessions'
    );

    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

// POST /api/session
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<SessionResponse | { error: string; details?: unknown }>
> {
  const start = Date.now();
  const apiLogger = logger.child({
    component: 'api',
    endpoint: '/api/session',
  });

  try {
    const body = await req.json();
    apiLogger.info({ requestBody: body }, 'Creating new session');

    const parseResult = CreateSessionRequestSchema.safeParse(body);
    if (!parseResult.success) {
      apiLogger.warn(
        {
          validationErrors: parseResult.error.flatten(),
        },
        'Invalid request data for session creation'
      );

      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const { name, username, playerUuid } = parseResult.data;

    apiLogger.info(
      { name, username, playerUuid },
      'Creating session with validated data'
    );

    // Check if player already exists
    const playerStart = Date.now();
    let player = await prisma.player.findUnique({
      where: { id: playerUuid },
    });
    logDbOperation('findUnique', 'player', Date.now() - playerStart);

    // Create player if it doesn't exist
    if (!player) {
      apiLogger.info({ playerUuid, username }, 'Creating new player');
      const createPlayerStart = Date.now();
      player = await prisma.player.create({
        data: {
          id: playerUuid,
          username,
        },
      });
      logDbOperation('create', 'player', Date.now() - createPlayerStart);
      apiLogger.info({ playerId: player.id }, 'Player created successfully');
    } else {
      apiLogger.info({ playerId: player.id }, 'Using existing player');
    }

    const sessionStart = Date.now();
    const session = await prisma.session.create({
      data: {
        name,
        playerSessions: {
          create: {
            playerId: player.id,
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
    logDbOperation('create', 'session', Date.now() - sessionStart);

    // Transform the response to match the expected format
    const transformedSession = {
      ...session,
      players: session.playerSessions.map((ps) => ps.player),
    };

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId: session.id,
        sessionName: session.name,
        playerId: player.id,
        duration: `${duration}ms`,
      },
      'Session created successfully'
    );

    logApiRequest('POST', '/api/session', duration);

    return NextResponse.json(transformedSession as SessionResponse, {
      status: 201,
    });
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('POST', '/api/session', error, 500);
    apiLogger.error(
      {
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to create session'
    );

    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
