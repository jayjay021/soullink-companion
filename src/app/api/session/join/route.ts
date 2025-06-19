import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';
import { JoinSessionRequestSchema } from '@/types/api';
import {
  logger,
  logApiRequest,
  logApiError,
  logDbOperation,
} from '@/lib/logger';

const prisma = new PrismaClient();

// POST /api/session/join
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<SessionResponse | { error: string; details?: unknown }>
> {
  const start = Date.now();
  const apiLogger = logger.child({
    component: 'api',
    endpoint: '/api/session/join',
  });

  try {
    const body = await req.json();
    apiLogger.info({ requestBody: body }, 'Processing session join request');

    const parseResult = JoinSessionRequestSchema.safeParse(body);
    if (!parseResult.success) {
      apiLogger.warn(
        {
          validationErrors: parseResult.error.flatten(),
        },
        'Invalid request data for session join'
      );

      return NextResponse.json(
        { error: 'Invalid request', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }
    const { sessionId, username, playerUuid } = parseResult.data;

    apiLogger.info(
      { sessionId, username, playerUuid },
      'Joining session with validated data'
    );

    // Check if player already exists
    const playerStart = Date.now();
    let player = await prisma.player.findUnique({
      where: { id: playerUuid },
    });
    logDbOperation('findUnique', 'player', Date.now() - playerStart);

    // Create player if it doesn't exist
    if (!player) {
      apiLogger.info(
        { playerUuid, username },
        'Creating new player for session join'
      );
      const createPlayerStart = Date.now();
      player = await prisma.player.create({
        data: { id: playerUuid, username },
      });
      logDbOperation('create', 'player', Date.now() - createPlayerStart);
      apiLogger.info(
        { playerId: player.id },
        'New player created for session join'
      );
    } else {
      apiLogger.debug(
        { playerId: player.id },
        'Using existing player for session join'
      );
    }

    // Check if player is already in the session
    const checkSessionStart = Date.now();
    const existingPlayerSession = await prisma.playerSession.findUnique({
      where: {
        playerId_sessionId: {
          playerId: playerUuid,
          sessionId: sessionId,
        },
      },
    });
    logDbOperation(
      'findUnique',
      'playerSession',
      Date.now() - checkSessionStart
    );

    // Create player-session relationship if it doesn't exist
    if (!existingPlayerSession) {
      apiLogger.info({ playerUuid, sessionId }, 'Adding player to session');
      const createRelationStart = Date.now();
      await prisma.playerSession.create({
        data: {
          playerId: playerUuid,
          sessionId: sessionId,
          isViewer: false,
        },
      });
      logDbOperation(
        'create',
        'playerSession',
        Date.now() - createRelationStart
      );
      apiLogger.info(
        { playerUuid, sessionId },
        'Player added to session successfully'
      );
    } else {
      apiLogger.debug({ playerUuid, sessionId }, 'Player already in session');
    }

    const sessionStart = Date.now();
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
    logDbOperation('findUnique', 'session', Date.now() - sessionStart);

    if (!session) {
      const duration = Date.now() - start;
      apiLogger.warn(
        {
          sessionId,
          duration: `${duration}ms`,
        },
        'Session not found during join process'
      );

      logApiRequest('POST', '/api/session/join', duration);

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
        playerId: playerUuid,
        playerCount: session.playerSessions.length,
        duration: `${duration}ms`,
      },
      'Player joined session successfully'
    );

    logApiRequest('POST', '/api/session/join', duration);

    return NextResponse.json(transformedSession as SessionResponse);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('POST', '/api/session/join', error, 500);
    apiLogger.error(
      {
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to join session'
    );

    return NextResponse.json(
      { error: 'Failed to join session' },
      { status: 500 }
    );
  }
}
