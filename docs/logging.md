# Pino Logger Integration Guide

This document explains how to use Pino logger in the SoulLink Companion project.

## Overview

Pino is a fast JSON logger for Node.js applications. It's configured to work both on the server-side (API routes) and client-side (React components) with appropriate formatting for each environment.

## Configuration

The logger is configured in `/src/lib/logger.ts` with environment-specific settings:

- **Development**: Pretty-printed logs with colors and timestamps
- **Production**: Structured JSON logs for better processing and monitoring
- **Client-side**: Browser-compatible logging with structured output

## Environment Variables

Set logging levels using environment variables:

```bash
# .env.local
LOG_LEVEL=debug  # debug, info, warn, error
```

Available log levels (from most to least verbose):

- `debug` - Detailed debugging information
- `info` - General application information
- `warn` - Warning messages
- `error` - Error messages only

## Middleware Logging Configuration

The middleware logging can be controlled separately from the main application logging using the `MIDDLEWARE_LOG_LEVEL` environment variable.

### Environment Variables

```bash
# .env.local
LOG_LEVEL=debug           # Controls application-wide logging
MIDDLEWARE_LOG_LEVEL=info # Controls middleware request/response logging specifically
```

### Middleware Log Levels

- **`debug`** - Logs all requests and responses with full details
- **`info`** - Logs all successful requests and responses (default)
- **`warn`** - Logs only 4xx client errors and above
- **`error`** - Logs only 5xx server errors

### Middleware Log Output

The middleware automatically adjusts log levels based on HTTP status codes:

```typescript
// Success responses (2xx, 3xx) -> info level
// Client errors (4xx) -> warn level
// Server errors (5xx) -> error level
```

Example middleware log output:

```json
{
  "level": "INFO",
  "component": "middleware",
  "method": "GET",
  "pathname": "/api/pokemon",
  "ip": "127.0.0.1",
  "url": "http://localhost:3000/api/pokemon?q=pika",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2025-06-19T12:34:56.789Z",
  "msg": "GET /api/pokemon - Request received"
}

{
  "level": "INFO",
  "component": "middleware",
  "method": "GET",
  "pathname": "/api/pokemon",
  "ip": "127.0.0.1",
  "status": 200,
  "duration": "45ms",
  "timestamp": "2025-06-19T12:34:56.834Z",
  "msg": "GET /api/pokemon - Response 200 (45ms)"
}
```

### Reducing Middleware Noise

To reduce middleware logging noise in production:

```bash
# Only log warnings and errors from middleware
MIDDLEWARE_LOG_LEVEL=warn

# Disable middleware logging entirely (not recommended)
MIDDLEWARE_LOG_LEVEL=error
```

## Usage Examples

### Basic Logging

```typescript
import { logger } from '@/lib/logger';

// Different log levels
logger.debug('Detailed debugging info');
logger.info('General information');
logger.warn('Warning message');
logger.error('Error occurred');
```

### Creating Child Loggers with Context

```typescript
import { createChildLogger } from '@/lib/logger';

// Create a logger with context
const apiLogger = createChildLogger({
  component: 'api',
  endpoint: '/api/pokemon',
});

apiLogger.info({ userId: '123' }, 'User performed action');
// Output: {"level":"INFO","component":"api","endpoint":"/api/pokemon","userId":"123","msg":"User performed action"}
```

### API Route Logging

```typescript
import { logger, logApiRequest, logApiError } from '@/lib/logger';

export async function GET(req: NextRequest) {
  const start = Date.now();
  const apiLogger = logger.child({
    component: 'api',
    endpoint: '/api/example',
  });

  try {
    apiLogger.info('Processing request');

    // Your API logic here
    const result = await someOperation();

    const duration = Date.now() - start;
    logApiRequest('GET', '/api/example', duration);

    return NextResponse.json(result);
  } catch (error) {
    logApiError('GET', '/api/example', error, 500);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
```

### Database Operation Logging

```typescript
import { logDbOperation } from '@/lib/logger';

const start = Date.now();
const users = await prisma.user.findMany();
const duration = Date.now() - start;

logDbOperation('findMany', 'user', duration);
```

### React Component Logging

```typescript
'use client';

import { useEffect } from 'react';
import { logger, createChildLogger } from '@/lib/logger';

export const MyComponent = () => {
  const componentLogger = createChildLogger({
    component: 'MyComponent',
    page: 'dashboard'
  });

  useEffect(() => {
    componentLogger.info('Component mounted');

    return () => {
      componentLogger.info('Component unmounted');
    };
  }, [componentLogger]);

  const handleUserAction = () => {
    componentLogger.info({ action: 'button_click' }, 'User clicked button');
  };

  return <button onClick={handleUserAction}>Click me</button>;
};
```

### Error Logging

```typescript
try {
  await riskyOperation();
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  logger.error(
    {
      error: errorMessage,
      stack: errorStack,
      context: 'additional context',
    },
    'Operation failed'
  );
}
```

## Structured Logging Best Practices

### 1. Use Consistent Context

Always include relevant context in your logs:

```typescript
const logger = createChildLogger({
  component: 'pokemon-manager',
  sessionId: session.id,
  userId: user.id,
});
```

### 2. Log Meaningful Events

Focus on logging events that are useful for debugging and monitoring:

```typescript
// Good: Actionable information
logger.info({ pokemonId, level, trainer }, 'Pokemon added to session');

// Avoid: Noise without context
logger.info('Something happened');
```

### 3. Include Performance Metrics

Track timing for important operations:

```typescript
const start = Date.now();
await expensiveOperation();
const duration = Date.now() - start;

logger.info({ duration: `${duration}ms` }, 'Operation completed');
```

### 4. Structure Error Information

Include all relevant error details:

```typescript
logger.error(
  {
    error: error.message,
    stack: error.stack,
    userId,
    sessionId,
    operation: 'createPokemon',
  },
  'Failed to create pokemon'
);
```

## Utility Functions

The logger configuration provides several utility functions:

- `logApiRequest(method, url, duration?)` - Log API requests
- `logApiError(method, url, error, statusCode?)` - Log API errors
- `logDbOperation(operation, table, duration?)` - Log database operations
- `createChildLogger(context)` - Create logger with context

## Development vs Production

### Development

- Pretty-printed, colorized output
- Logs to console with readable formatting
- Default level: `debug`

### Production

- Structured JSON output
- Optimized for log aggregation services
- Default level: `info`
- Includes serializers for error objects

## Log Aggregation

In production, you can pipe logs to services like:

- **ELK Stack** (Elasticsearch, Logstash, Kibana)
- **Datadog**
- **New Relic**
- **Splunk**
- **AWS CloudWatch**

Example with Docker and log drivers:

```dockerfile
# Dockerfile
CMD ["npm", "start"] | tee /dev/stdout
```

## Performance Considerations

Pino is designed to be extremely fast:

- Asynchronous logging by default
- Minimal overhead in production
- JSON serialization optimization
- Child logger reuse for performance

## Debugging

To see all logs in development, set LOG_LEVEL to debug:

```bash
# .env.local
LOG_LEVEL=debug
```

To see only errors in production:

```bash
# .env.production
LOG_LEVEL=error
```

### Viewing Log Levels Clearly

By default, Pino uses pretty-printing in development which makes logs readable but doesn't prominently show log levels. To see log levels clearly:

**Option 1: JSON Logs (Recommended for debugging)**

```bash
# .env.local
PRETTY_LOGS=false
MIDDLEWARE_LOG_LEVEL=info
```

This will output structured JSON with visible log levels:

```json
{
  "level": 30,
  "time": 1671234567890,
  "component": "middleware",
  "method": "GET",
  "pathname": "/api/pokemon",
  "ip": "::1",
  "msg": "GET /api/pokemon - Request received"
}
```

**Option 2: Pretty Logs with Level Labels**

```bash
# .env.local
PRETTY_LOGS=true  # or omit (default)
MIDDLEWARE_LOG_LEVEL=info
```

This outputs human-readable logs with level indicators:

```
[INFO] middleware - GET /api/pokemon - Request received
```

**Log Level Number Mapping:**

- `10` = DEBUG
- `20` = DEBUG
- `30` = INFO
- `40` = WARN
- `50` = ERROR

## Integration with Monitoring

Combine with monitoring solutions:

```typescript
// Send critical errors to monitoring service
logger.error(
  {
    error: error.message,
    userId,
    severity: 'critical',
  },
  'Critical system error'
);

// Trigger alert based on log content
```

This setup provides comprehensive logging for debugging, monitoring, and maintaining your Next.js application.

### Middleware Logging in Edge Runtime

Next.js middleware runs in the Edge Runtime, which has different behavior than the Node.js runtime where your API routes run. To ensure consistent JSON logging across both environments:

**Middleware Logging**: Uses a custom JSON logger that always outputs structured logs
**API Route Logging**: Uses Pino with configurable pretty-printing

This ensures you get consistent log format regardless of the runtime environment:

```json
// Middleware logs (always JSON)
{"level":"INFO","time":"2025-06-19T12:11:36.140Z","component":"middleware","method":"GET","pathname":"/api/session","ip":"::1","msg":"GET /api/session - Request received"}

// API logs (JSON when PRETTY_LOGS=false)
{"level":"INFO","time":"2025-06-19T12:11:36.140Z","component":"api","endpoint":"/api/session","msg":"Sessions fetched successfully"}
```

**Why Different Loggers?**

- **Edge Runtime** (middleware): Limited Node.js APIs, custom JSON logger required
- **Node.js Runtime** (API routes): Full Pino features available

Both produce consistent JSON output when `PRETTY_LOGS=false` is set.

## Filtering Out Next.js Built-in Logs

Next.js outputs its own request logs (like `GET /api/session 200 in 59ms`) that can interfere with your structured logging. Here's how to get clean output:

### Quick Solutions

**Option 1: Filtered Development (Recommended)**

```bash
pnpm run dev:clean
```

This filters out Next.js noise while keeping your structured logs with nice formatting.

**Option 2: Pure JSON Logs**

```bash
pnpm run dev:json
```

This gives you clean JSON logs with all Next.js noise filtered out.

**Option 3: Manual Filtering**

```bash
pnpm dev 2>&1 | node scripts/filter-logs.js
```

### What Gets Filtered Out

The filter removes:

- `GET /api/session 200 in 59ms` style logs
- Next.js compilation messages
- Server startup noise
- Build output

### What You Keep

- Your structured JSON logs from Pino
- Middleware request/response logs
- API route logs with timing
- Database operation logs
- Error logs and stack traces

### Example Clean Output

**Before (Noisy):**

```
{"level":"INFO","component":"api","msg":"Sessions fetched"}
 GET /api/session 200 in 59ms
{"level":"DEBUG","component":"database","msg":"DB operation"}
```

**After (Clean):**

```
[12:15:18] [INFO] api - Sessions fetched {"sessionCount":3,"duration":"26ms"}
[12:15:19] [DEBUG] database - DB operation {"operation":"findMany","table":"session","duration":"24ms"}
```
