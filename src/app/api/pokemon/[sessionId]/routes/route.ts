import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { RouteListResponse } from '@/types/api';
import { logger } from '@/lib/logger';

const prisma = new PrismaClient();

// GET /api/pokemon/[sessionId]/routes
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse<RouteListResponse | { error: string }>> {
  const start = Date.now();
  const apiLogger = logger.child({
    component: 'api',
    endpoint: '/api/pokemon/[sessionId]/routes',
  });

  try {
    const { sessionId } = await params;

    apiLogger.debug({ sessionId }, 'Extracted sessionId from params');

    if (!sessionId) {
      apiLogger.warn('Missing sessionId parameter');
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    apiLogger.debug(
      { sessionId },
      'Fetching unique pokemon routes for session'
    );

    const dbStart = Date.now();
    const routes = await prisma.pokemon.findMany({
      where: { sessionId },
      select: { route: true },
      distinct: ['route'],
    });
    const dbDuration = Date.now() - dbStart;

    const routeList = routes.map((r) => r.route);

    const duration = Date.now() - start;
    apiLogger.info(
      {
        sessionId,
        routeCount: routeList.length,
        routes: routeList,
        dbDuration: `${dbDuration}ms`,
        duration: `${duration}ms`,
      },
      'Successfully retrieved pokemon routes for session'
    );

    return NextResponse.json(routeList);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    apiLogger.error(
      {
        sessionId: (await params)?.sessionId,
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Failed to get pokemon routes'
    );

    return NextResponse.json(
      { error: 'Failed to get pokemon routes' },
      { status: 500 }
    );
  }
}
