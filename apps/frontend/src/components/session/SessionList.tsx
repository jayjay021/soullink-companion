import { Grid, Card, Stack, Text, Button } from '@mantine/core';
import { SessionCard } from './SessionCard';
import { Session, UserRef } from '../../lib/api-client/generated.api';


interface SessionListProps {
  sessions: Session[];
  currentUser: UserRef | null;
  onCreateSession: () => void;
  onEditSession: (session: Session) => void;
  onDeleteSession: (sessionId: string) => void;
  onJoinSession: (sessionId: string) => void;
  onViewSession: (sessionId: string) => void;
  isJoining: boolean;
}

export function SessionList({ 
  sessions, 
  currentUser,
  onCreateSession, 
  onEditSession, 
  onDeleteSession, 
  onJoinSession, 
  onViewSession,
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
            currentUser={currentUser}
            onEdit={onEditSession}
            onDelete={onDeleteSession}
            onJoin={onJoinSession}
            onView={onViewSession}
            isJoining={isJoining}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
} 