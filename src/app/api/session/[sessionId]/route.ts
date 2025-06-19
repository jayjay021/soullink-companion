import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';

const prisma = new PrismaClient();

// GET /api/session/[sessionId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse<SessionResponse | { error: string }>> {
  const { sessionId } = await params;
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
