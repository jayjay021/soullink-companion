/**
 * Example component showing how to use Pino logger in React components
 * This file demonstrates client-side logging patterns
 */

'use client';

import { useEffect } from 'react';
import { Button, Paper, Stack, Text, Title } from '@mantine/core';
import { logger, createChildLogger } from '@/lib/logger';

export const LoggerExample = () => {
  // Create a component-specific logger
  const componentLogger = createChildLogger({
    component: 'LoggerExample',
    page: 'example',
  });

  useEffect(() => {
    componentLogger.info('LoggerExample component mounted');

    // Example of logging user interactions
    componentLogger.debug('Component initialization completed');

    return () => {
      componentLogger.info('LoggerExample component unmounted');
    };
  }, [componentLogger]);

  const handleButtonClick = () => {
    componentLogger.info(
      { action: 'button_click' },
      'User clicked example button'
    );

    // Example of logging different levels
    logger.debug('Debug message from button click');
    logger.info('Info message from button click');
    logger.warn('Warning message from button click');

    // Example of logging with context
    const userLogger = createChildLogger({
      userId: 'example-user',
      sessionId: 'example-session',
    });
    userLogger.info('User performed an action');
  };

  const handleErrorExample = () => {
    try {
      throw new Error('This is an example error');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;

      componentLogger.error(
        {
          error: errorMessage,
          stack: errorStack,
          action: 'error_example',
        },
        'Example error occurred'
      );
    }
  };

  return (
    <Paper p="md" withBorder>
      <Stack gap="md">
        <Title order={3}>Pino Logger Example</Title>
        <Text>
          This component demonstrates how to use Pino logger in React
          components. Check your browser console (development) or server logs
          (production) to see the log output.
        </Text>

        <Stack gap="sm">
          <Button onClick={handleButtonClick} variant="filled">
            Log Info Messages
          </Button>
          <Button onClick={handleErrorExample} variant="outline" color="red">
            Log Error Example
          </Button>
        </Stack>

        <Text size="sm" c="dimmed">
          In development, logs will appear in the browser console with pretty
          formatting. In production, logs will be structured JSON for better
          processing.
        </Text>
      </Stack>
    </Paper>
  );
};
