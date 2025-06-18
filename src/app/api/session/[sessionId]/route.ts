import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';

const prisma = new PrismaClient();

// GET /api/session/[sessionId]
export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
): Promise<NextResponse<SessionResponse | { error: string }>> {
  const { sessionId } = await params;
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { players: true },
  });
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
  return NextResponse.json(session);
}
