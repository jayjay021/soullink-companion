import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { logger } from '@/lib/logger';

const prisma = new PrismaClient();

// GET /api/session/[sessionId]/route
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const start = Date.now();
  const apiLogger = logger.child({
    component: 'api',
    endpoint: '/api/session/[sessionId]/route',
  });

  try {
    const { sessionId } = await params;

    apiLogger.debug({ sessionId }, 'Extracted sessionId from params');

    if (!sessionId) {
      apiLogger.warn('Missing sessionId parameter');
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
    }

    apiLogger.debug({ sessionId }, 'Fetching unique routes for session');

    const dbStart = Date.now();
    // Get all unique routes for this session's pokemons
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
      'Successfully retrieved session routes'
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
      'Failed to get session routes'
    );

    return NextResponse.json(
      { error: 'Failed to get session routes' },
      { status: 500 }
    );
  }
}
