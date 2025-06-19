import pino from 'pino';

// Create logger configuration based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
const isServer = typeof window === 'undefined';
const usePrettyLogs = process.env.PRETTY_LOGS !== 'false'; // Default to true, set to 'false' to disable

// Base logger configuration
const baseConfig: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
};

// Server-side logger configuration
const serverConfig: pino.LoggerOptions = {
  ...baseConfig,
  ...(isDevelopment && usePrettyLogs
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
            messageFormat:
              '\x1b[36m[{level}]\x1b[0m \x1b[35m{component}\x1b[0m - {msg}',
            customPrettifiers: {
              level: (logLevel: string) => `${logLevel.toUpperCase()}`,
            },
            levelFirst: true,
          },
        },
      }
    : isDevelopment && !usePrettyLogs
      ? {
          // Development with JSON logs (shows log levels clearly)
          serializers: pino.stdSerializers,
        }
      : {
          // Production configuration - structured JSON logs
          serializers: pino.stdSerializers,
        }),
};

// Client-side logger configuration (browser)
const clientConfig: pino.LoggerOptions = {
  ...baseConfig,
  browser: {
    serialize: true,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  },
};

// Create and export the logger
export const logger = pino(isServer ? serverConfig : clientConfig);

// Utility function to create a child logger with context
export const createChildLogger = (context: Record<string, unknown>) => {
  return logger.child(context);
};

// Utility function to log API requests
export const logApiRequest = (
  method: string,
  url: string,
  duration?: number
) => {
  const log = logger.child({ component: 'api' });
  if (duration !== undefined) {
    log.info(
      { method, url, duration: `${duration}ms` },
      'API Request completed'
    );
  } else {
    log.info({ method, url }, 'API Request started');
  }
};

// Utility function to log API errors
export const logApiError = (
  method: string,
  url: string,
  error: Error | unknown,
  statusCode?: number
) => {
  const log = logger.child({ component: 'api' });
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  log.error(
    {
      method,
      url,
      error: errorMessage,
      statusCode,
      stack: errorStack,
    },
    'API Request failed'
  );
};

// Utility function to log database operations
export const logDbOperation = (
  operation: string,
  table: string,
  duration?: number
) => {
  const log = logger.child({ component: 'database' });
  if (duration !== undefined) {
    log.debug(
      { operation, table, duration: `${duration}ms` },
      'Database operation completed'
    );
  } else {
    log.debug({ operation, table }, 'Database operation started');
  }
};

// Enhanced logging utilities with explicit level control
export const logWithLevel = {
  debug: (
    data: Record<string, unknown>,
    message: string,
    context?: Record<string, unknown>
  ) => {
    const log = context ? logger.child(context) : logger;
    log.debug(data, message);
  },
  info: (
    data: Record<string, unknown>,
    message: string,
    context?: Record<string, unknown>
  ) => {
    const log = context ? logger.child(context) : logger;
    log.info(data, message);
  },
  warn: (
    data: Record<string, unknown>,
    message: string,
    context?: Record<string, unknown>
  ) => {
    const log = context ? logger.child(context) : logger;
    log.warn(data, message);
  },
  error: (
    data: Record<string, unknown>,
    message: string,
    context?: Record<string, unknown>
  ) => {
    const log = context ? logger.child(context) : logger;
    log.error(data, message);
  },
};

// Utility function to log middleware requests with explicit levels
export const logMiddlewareRequest = (
  level: 'debug' | 'info' | 'warn' | 'error',
  method: string,
  pathname: string,
  data: Record<string, unknown>,
  message: string
) => {
  const middlewareLogger = createChildLogger({
    component: 'middleware',
    method,
    pathname,
  });

  middlewareLogger[level](data, message);
};

export default logger;
