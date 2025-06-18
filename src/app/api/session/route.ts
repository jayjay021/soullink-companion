import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { SessionResponse } from '@/types/api';
import { CreateSessionRequestSchema } from '@/types/api';

const prisma = new PrismaClient();

// GET /api/session
export async function GET(): Promise<NextResponse<SessionResponse[]>> {
  const sessions = await prisma.session.findMany({
    include: { players: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(sessions);
}

// POST /api/session
export async function POST(
  req: NextRequest
): Promise<
  NextResponse<SessionResponse | { error: string; details?: unknown }>
> {
  const body = await req.json();
  const parseResult = CreateSessionRequestSchema.safeParse(body);
  console.log('Received request body:', body);
  console.log('Parse result:', parseResult);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parseResult.error.flatten() },
      { status: 400 }
    );
  }
  const { name, username, playerUuid } = parseResult.data;
  console.log('Creating session with data:', { name, username, playerUuid });

  // Check if player already exists
  const player = await prisma.player.findUnique({
    where: { id: playerUuid },
  });

  const session = await prisma.session.create({
    data: {
      name,
      players: player
        ? { connect: { id: playerUuid } }
        : { create: { username, id: playerUuid } },
    },
    include: { players: true },
  });
  return NextResponse.json(session, { status: 201 });
}
