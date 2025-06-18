import { Card, Group, Title, Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
  const { username, userId, isViewer } = useUser();
  
  const joinSessionMutation = useMutation({
    mutationFn: async (id: string) => {
      if (isViewer) {
        router.push(`/session/${id}`);
        return;
      }
      if (!username || !userId) throw new Error('Missing username or userId');
      const body: JoinSessionRequest = {
        sessionId: id,
        username,
        playerUuid: userId,
      };
      const res = await fetch('/api/session/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to join session');
      router.push(`/session/${id}`);
    },
  });

  return (
    <Card withBorder shadow='sm' p='md'>
      <Group justify='space-between'>
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
