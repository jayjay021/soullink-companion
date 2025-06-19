import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';
import { JoinSessionRequestSchema } from '@/types/api';

const prisma = new PrismaClient();

// POST /api/session/join
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<SessionResponse | { error: string; details?: unknown }>
> {
  const body = await req.json();
  const parseResult = JoinSessionRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parseResult.error.flatten() },
      { status: 400 }
    );
  }
  const { sessionId, username, playerUuid } = parseResult.data;

  // Check if player already exists
  let player = await prisma.player.findUnique({
    where: { id: playerUuid },
  });

  // Create player if it doesn't exist
  if (!player) {
    player = await prisma.player.create({
      data: { id: playerUuid, username },
    });
  }

  // Check if player is already in the session
  const existingPlayerSession = await prisma.playerSession.findUnique({
    where: {
      playerId_sessionId: {
        playerId: playerUuid,
        sessionId: sessionId,
      },
    },
  });

  // Create player-session relationship if it doesn't exist
  if (!existingPlayerSession) {
    await prisma.playerSession.create({
      data: {
        playerId: playerUuid,
        sessionId: sessionId,
        isViewer: false,
      },
    });
  }

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

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }

  // Transform the response to match the expected format
  const transformedSession = {
    ...session,
    players: session.playerSessions.map((ps) => ps.player),
  };

  return NextResponse.json(transformedSession as SessionResponse);
}
