import { Card, Group, Title, Button } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { JoinSessionRequest } from '@/types/api';
import { useUser } from '@/app/context/UserContext';

interface SessionCardProps {
  session: {
    id: string;
    name: string;
    players: { username: string }[];
  };
}

export function SessionCard({ session }: SessionCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { username, userId, isViewer, setUserId, reloadUser } = useUser();

  const joinSessionMutation = useMutation({
    mutationFn: async (id: string) => {
      if (isViewer) {
        router.push(`/session/${id}`);
        return;
      }

      // Ensure we have a userId - create one if needed
      let actualUserId = userId;
      if (!actualUserId) {
        actualUserId = uuidv4();
        localStorage.setItem('playerUuid', actualUserId);
        setUserId(actualUserId);
      }

      if (!username) {
        throw new Error('Missing username');
      }

      const body: JoinSessionRequest = {
        sessionId: id,
        username,
        playerUuid: actualUserId,
      };
      const res = await fetch('/api/session/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to join session');

      // Invalidate session queries to ensure fresh data
      await queryClient.invalidateQueries({ queryKey: ['session', id] });

      // Reload user context to ensure it's in sync
      reloadUser();

      router.push(`/session/${id}`);
    },
  });

  return (
    <Card withBorder shadow="sm" p="md">
      <Group justify="space-between">
        <div>
          <Title order={3}>{session.name}</Title>
          <div>
            Players: {session.players.map((p) => p.username).join(', ')}
          </div>
        </div>
        <Button
          onClick={() => joinSessionMutation.mutate(session.id)}
          disabled={joinSessionMutation.isPending}
        >
          {joinSessionMutation.isPending
            ? isViewer
              ? 'Opening...'
              : 'Joining...'
            : isViewer
              ? 'View'
              : 'Join'}
        </Button>
      </Group>
    </Card>
  );
}
