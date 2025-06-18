'use client';
import { Stack, Box, Card, Title, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { SessionHeader } from '@/components';
import type { SessionData } from '@/types';

interface ViewerSessionViewProps {
  sessionId: string;
}

export const ViewerSessionView: React.FC<ViewerSessionViewProps> = ({
  sessionId,
}) => {
  // Fetch session info
  const {
    data: session,
    isLoading: loadingSession,
    error: errorSession,
  } = useQuery<SessionData>({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/session/${sessionId}`);
      if (!res.ok) throw new Error('Session not found');
      return res.json();
    },
  });

  if (loadingSession) return <div>Loading...</div>;
  if (errorSession || !session) return <div>Session not found.</div>;

  return (
    <Box m={50}>
      <Stack gap="lg">
        <SessionHeader session={session} />
        <Card variant="outline" p="md">
          <Title order={3}>Viewer Mode</Title>
          <Text>
            You are viewing this session as a spectator. Player management
            features are not available.
          </Text>
          {/* TODO: Add viewer-specific features like read-only pokemon display */}
        </Card>
      </Stack>
    </Box>
  );
};
