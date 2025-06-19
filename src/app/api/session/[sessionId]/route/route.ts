import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/session/[sessionId]/route
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }
  // Get all unique routes for this session's pokemons
  const routes = await prisma.pokemon.findMany({
    where: { sessionId },
    select: { route: true },
    distinct: ['route'],
  });
  return NextResponse.json(routes.map((r) => r.route));
}
