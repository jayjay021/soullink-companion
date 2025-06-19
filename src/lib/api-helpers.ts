import { NextResponse } from 'next/server';
import { logger, logApiRequest, logApiError } from '@/lib/logger';
import { emitToSession } from '@/lib/realtime';

export interface ApiError {
  error: string;
  details?: unknown;
}

export interface ApiRequestContext {
  method: string;
  endpoint: string;
  sessionId?: string;
  startTime: number;
}

export interface RealtimeEventData {
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  error: string,
  statusCode: number = 500,
  details?: unknown
): NextResponse<ApiError> {
  const response: ApiError = { error };
  if (details) {
    response.details = details;
  }
  return NextResponse.json(response, { status: statusCode });
}

/**
 * Creates a standardized success response with timing
 */
export function createSuccessResponse<T>(
  data: T,
  context: ApiRequestContext,
  statusCode: number = 200
): NextResponse<T> {
  const duration = Date.now() - context.startTime;

  // Log the successful API request
  logApiRequest(context.method, context.endpoint, duration);

  return NextResponse.json(data, { status: statusCode });
}

/**
 * Handles API errors with standardized logging and response
 */
export function handleApiError(
  error: unknown,
  context: ApiRequestContext,
  customMessage?: string
): NextResponse<ApiError> {
  const duration = Date.now() - context.startTime;
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  // Log the error
  logApiError(context.method, context.endpoint, error, 500);

  // Create error logger
  const errorLogger = logger.child({
    component: 'api',
    endpoint: context.endpoint,
    sessionId: context.sessionId,
  });

  errorLogger.error(
    {
      sessionId: context.sessionId,
      error: errorMessage,
      stack: errorStack,
      duration: `${duration}ms`,
    },
    customMessage || 'API request failed'
  );

  return createErrorResponse(customMessage || 'Internal server error', 500);
}

/**
 * Safely emits a real-time event with error handling
 */
export async function safeEmitRealtimeEvent(
  sessionId: string,
  eventData: RealtimeEventData,
  context?: { pokemonId?: string; playerId?: string }
): Promise<void> {
  const eventLogger = logger.child({
    component: 'realtime',
    sessionId,
    eventType: eventData.type,
  });

  try {
    await emitToSession(sessionId, eventData);
    eventLogger.debug(
      {
        sessionId,
        eventType: eventData.type,
        pokemonId: context?.pokemonId,
        playerId: context?.playerId,
      },
      'Real-time event emitted successfully'
    );
  } catch (eventError) {
    const eventErrorMessage =
      eventError instanceof Error ? eventError.message : String(eventError);

    eventLogger.warn(
      {
        sessionId,
        eventType: eventData.type,
        pokemonId: context?.pokemonId,
        playerId: context?.playerId,
        error: eventErrorMessage,
      },
      'Failed to emit real-time event'
    );
    // Don't throw - real-time events are not critical to API success
  }
}

/**
 * Creates a standardized API request context
 */
export function createApiContext(
  method: string,
  endpoint: string,
  sessionId?: string
): ApiRequestContext {
  return {
    method,
    endpoint,
    sessionId,
    startTime: Date.now(),
  };
}

/**
 * Logs API request start with consistent format
 */
export function logApiRequestStart(
  context: ApiRequestContext,
  requestData?: unknown
): typeof logger {
  const apiLogger = logger.child({
    component: 'api',
    endpoint: context.endpoint,
    sessionId: context.sessionId,
  });

  apiLogger.info(
    {
      sessionId: context.sessionId,
      requestBody: requestData,
    },
    `${context.method} request started`
  );

  return apiLogger;
}

/**
 * Creates a real-time event object with timestamp
 */
export function createRealtimeEvent(
  type: string,
  data: Record<string, unknown>
): RealtimeEventData {
  return {
    type,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Validates and parses JSON request body safely
 */
export async function safeParseRequestBody<T>(
  request: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: any
): Promise<
  | { success: true; data: T }
  | { success: false; error: string; details?: unknown }
> {
  try {
    const body = await request.json();

    if (schema) {
      const parseResult = schema.safeParse(body);
      if (!parseResult.success) {
        return {
          success: false,
          error: 'Invalid request data',
          details: parseResult.error.flatten(),
        };
      }
      return { success: true, data: parseResult.data as T };
    }

    return { success: true, data: body as T };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to parse request body',
      details: error instanceof Error ? error.message : String(error),
    };
  }
}
