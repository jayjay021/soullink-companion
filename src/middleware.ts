import { NextRequest, NextResponse } from 'next/server';

// Configure middleware logging level
const MIDDLEWARE_LOG_LEVEL = process.env.MIDDLEWARE_LOG_LEVEL || 'info';

// Simple JSON logger for middleware (Edge Runtime compatible)
const middlewareLogger = {
  debug: (data: Record<string, unknown>, message: string) => {
    if (shouldLog(MIDDLEWARE_LOG_LEVEL, 'debug')) {
      console.log(
        JSON.stringify({
          level: 'DEBUG',
          time: new Date().toISOString(),
          ...data,
          msg: message,
        })
      );
    }
  },
  info: (data: Record<string, unknown>, message: string) => {
    if (shouldLog(MIDDLEWARE_LOG_LEVEL, 'info')) {
      console.log(
        JSON.stringify({
          level: 'INFO',
          time: new Date().toISOString(),
          ...data,
          msg: message,
        })
      );
    }
  },
  warn: (data: Record<string, unknown>, message: string) => {
    if (shouldLog(MIDDLEWARE_LOG_LEVEL, 'warn')) {
      console.log(
        JSON.stringify({
          level: 'WARN',
          time: new Date().toISOString(),
          ...data,
          msg: message,
        })
      );
    }
  },
  error: (data: Record<string, unknown>, message: string) => {
    if (shouldLog(MIDDLEWARE_LOG_LEVEL, 'error')) {
      console.log(
        JSON.stringify({
          level: 'ERROR',
          time: new Date().toISOString(),
          ...data,
          msg: message,
        })
      );
    }
  },
};

export function middleware(request: NextRequest) {
  const start = Date.now();
  const { method, url, headers } = request;
  const userAgent = headers.get('user-agent') || 'unknown';
  const ip =
    headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown';
  const pathname = new URL(url).pathname;

  // Base context for all logs
  const logContext = {
    component: 'middleware',
    method,
    pathname,
    ip: ip.split(',')[0]?.trim(), // Get first IP if multiple
  };

  // Log incoming request
  middlewareLogger.info(
    {
      ...logContext,
      url,
      userAgent: userAgent.substring(0, 100), // Truncate long user agents
    },
    `${method} ${pathname} - Request received`
  );

  // Continue with the request and capture response
  const response = NextResponse.next();

  // Log the response completion
  const duration = Date.now() - start;
  const logLevel = getResponseLogLevel(response.status);

  middlewareLogger[logLevel](
    {
      ...logContext,
      status: response.status,
      duration: `${duration}ms`,
    },
    `${method} ${pathname} - Response ${response.status} (${duration}ms)`
  );

  return response;
}

// Helper function to determine if we should log based on configured level
function shouldLog(configuredLevel: string, messageLevel: string): boolean {
  const levels = { debug: 0, info: 1, warn: 2, error: 3 };
  const configLevel = levels[configuredLevel as keyof typeof levels] ?? 1;
  const msgLevel = levels[messageLevel as keyof typeof levels] ?? 1;
  return msgLevel >= configLevel;
}

// Helper function to determine log level based on response status
function getResponseLogLevel(
  status: number
): 'debug' | 'info' | 'warn' | 'error' {
  if (status >= 500) return 'error';
  if (status >= 400) return 'warn';
  if (status >= 300) return 'info';
  return 'info';
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*)'],
};
