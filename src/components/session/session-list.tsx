import { Stack } from '@mantine/core';
import { SessionCard } from './session-card';
import type { SessionData } from '@/types';

interface SessionListProps {
  sessions: SessionData[];
}

export function SessionList({ sessions }: SessionListProps) {
  return (
    <Stack>
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </Stack>
  );
}
