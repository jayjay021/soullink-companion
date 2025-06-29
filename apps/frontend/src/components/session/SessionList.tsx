import { Grid, Card, Stack, Text, Button } from '@mantine/core';
import { SessionCard } from './SessionCard';
import type { components } from '@repo/api-spec/types';

type SessionListItem = components['schemas']['SessionListItem'];

interface SessionListProps {
  sessions: SessionListItem[];
  onCreateSession: () => void;
  onEditSession: (session: SessionListItem) => void;
  onDeleteSession: (sessionId: string) => void;
  onJoinSession: (sessionId: string) => void;
  isJoining: boolean;
}

export function SessionList({ 
  sessions, 
  onCreateSession, 
  onEditSession, 
  onDeleteSession, 
  onJoinSession, 
  isJoining 
}: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <Card withBorder p="xl">
        <Stack gap="md" align="center">
          <Text size="lg" c="dimmed">No sessions found</Text>
          <Text c="dimmed">Create your first SoulLink session to get started.</Text>
          <Button onClick={onCreateSession}>
            Create First Session
          </Button>
        </Stack>
      </Card>
    );
  }

  return (
    <Grid>
      {sessions.map((session) => (
        <Grid.Col key={session.id} span={{ base: 12, md: 6, lg: 4 }}>
          <SessionCard
            session={session}
            onEdit={onEditSession}
            onDelete={onDeleteSession}
            onJoin={onJoinSession}
            isJoining={isJoining}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
} 