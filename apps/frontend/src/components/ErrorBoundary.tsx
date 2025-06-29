import React from 'react';
import { Container, Title, Text, Card, Stack, Button, Group } from '@mantine/core';
import { IconAlertTriangle, IconRefresh } from '@tabler/icons-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <Container size="md" py="xl">
      <Card withBorder p="xl">
        <Stack gap="lg" align="center">
          <IconAlertTriangle size={64} color="red" />
          
          <Stack gap="md" align="center">
            <Title order={1} c="red">Something went wrong</Title>
            <Text c="dimmed" ta="center">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </Text>
          </Stack>

          <Group>
            <Button 
              leftSection={<IconRefresh size={16} />}
              onClick={resetError}
              variant="light"
            >
              Try Again
            </Button>
            <Button 
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </Group>

          {import.meta.env.DEV && (
            <Card withBorder p="md" w="100%">
              <Stack gap="sm">
                <Text size="sm" fw={500}>Error Details (Development)</Text>
                <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                  {error.message}
                </Text>
                {error.stack && (
                  <Text size="xs" c="dimmed" style={{ fontFamily: 'monospace' }}>
                    {error.stack}
                  </Text>
                )}
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>
    </Container>
  );
} 