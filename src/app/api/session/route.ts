import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse, CreateSessionRequest } from '@/types/api';
import { CreateSessionRequestSchema } from '@/types/api';

const prisma = new PrismaClient();

// GET /api/session
export async function GET(
  req: NextRequest
): Promise<NextResponse<SessionResponse[]>> {
  const sessions = await prisma.session.findMany({
    include: { players: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(sessions);
}

// POST /api/session
export async function POST(
  req: NextRequest
): Promise<NextResponse<SessionResponse | { error: string; details?: any }>> {
  const body = await req.json();
  const parseResult = CreateSessionRequestSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parseResult.error.flatten() },
      { status: 400 }
    );
  }
  const { name, username, playerUuid } = parseResult.data;
  const session = await prisma.session.create({
    data: {
      name,
      players: { create: { username, id: playerUuid } },
    },
    include: { players: true },
  });
  return NextResponse.json(session, { status: 201 });
}
