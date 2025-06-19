import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';
import { CreateSessionRequestSchema } from '@/types/api';

const prisma = new PrismaClient();

// GET /api/session
export async function GET(): Promise<NextResponse<SessionResponse[]>> {
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

  // Transform the response to match the expected format
  const transformedSessions = sessions.map((session) => ({
    ...session,
    players: session.playerSessions.map((ps) => ps.player),
  }));

  return NextResponse.json(transformedSessions as SessionResponse[]);
}

// POST /api/session
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<SessionResponse | { error: string; details?: unknown }>
> {
  const body = await req.json();
  const parseResult = CreateSessionRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parseResult.error.flatten() },
      { status: 400 }
    );
  }
  const { name, username, playerUuid } = parseResult.data;

  // Check if player already exists
  let player = await prisma.player.findUnique({
    where: { id: playerUuid },
  });

  // Create player if it doesn't exist
  if (!player) {
    player = await prisma.player.create({
      data: {
        id: playerUuid,
        username,
      },
    });
  }

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

  // Transform the response to match the expected format
  const transformedSession = {
    ...session,
    players: session.playerSessions.map((ps) => ps.player),
  };

  return NextResponse.json(transformedSession as SessionResponse, {
    status: 201,
  });
}
