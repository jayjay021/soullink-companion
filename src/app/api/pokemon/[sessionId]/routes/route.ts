import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { RouteListResponse } from '@/types/api';

const prisma = new PrismaClient();

// GET /api/pokemon/[sessionId]/routes
export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
): Promise<NextResponse<RouteListResponse>> {
  const { sessionId } = await params;
  const routes = await prisma.pokemon.findMany({
    where: { sessionId },
    select: { route: true },
    distinct: ['route'],
  });
  return NextResponse.json(routes.map((r) => r.route));
}
