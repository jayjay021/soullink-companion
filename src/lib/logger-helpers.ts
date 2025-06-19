import { logger } from '@/lib/logger';

/**
 * Creates a child logger with fallback to main logger if child() returns undefined/null
 * This prevents issues in test environments where mocking can occasionally fail
 */
export function createHelperLogger(context: Record<string, unknown>) {
  return logger.child(context) ?? logger;
}
