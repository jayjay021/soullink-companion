import { useParams, Navigate } from 'react-router-dom';
import { Container, Title, Text, Card, Stack, Loader } from '@mantine/core';
import { useGetSessionQuery } from '../lib/api-client/generated.api';
import type { UserRef, Session } from '../lib/api-client/generated.api';


export function SessionDetailPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  
  if (!sessionId) {
    return <Navigate to="/sessions" replace />;
  }

  const { data: session, isLoading, error } = useGetSessionQuery({ sessionId });

  if (isLoading) {
    return (
      <Container size="lg">
        <Stack gap="lg" align="center" py="xl">
          <Loader size="lg" />
          <Text>Loading session...</Text>
        </Stack>
      </Container>
    );
  }

  if (error || !session) {
    return (
      <Container size="lg">
        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={1} c="red">Session Not Found</Title>
            <Text>
              The session you're looking for doesn't exist or you don't have access to it.
            </Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  const sessionData = session as Session;

  return (
    <Container size="lg">
      <Stack gap="lg">
        <Title order={1}>{sessionData.name}</Title>
        
        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">Session Details</Title>
            <Text>{sessionData.description}</Text>
            <Text size="sm" c="dimmed">
              Created: {new Date(sessionData.createdAt).toLocaleDateString()}
            </Text>
            <Text size="sm" c="dimmed">
              Status: {sessionData.status}
            </Text>
            <Text size="sm" c="dimmed">
              Players: {sessionData.users.length}
            </Text>
          </Stack>
        </Card>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">Players</Title>
            {sessionData.users.length === 0 ? (
              <Text c="dimmed">No players have joined this session yet.</Text>
            ) : (
              <Stack gap="xs">
                {sessionData.users.map((user: UserRef) => (
                  <Text key={user.id}>{user.username}</Text>
                ))}
              </Stack>
            )}
          </Stack>
        </Card>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">Session Detail Page</Title>
            <Text c="dimmed">
              This is a placeholder for the session detail page. 
              Future features will include Pokemon tracking, team management, and more.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 