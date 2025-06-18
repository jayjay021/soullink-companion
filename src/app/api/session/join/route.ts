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
  let player = await prisma.player.findFirst({
    where: { sessionId, id: playerUuid },
  });
  if (!player) {
    player = await prisma.player.create({
      data: { id: playerUuid, sessionId, username },
    });
  }
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { players: true },
  });
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
  return NextResponse.json(session);
}
