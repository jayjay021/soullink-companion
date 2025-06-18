'use client';
import { Card, Title, Text } from '@mantine/core';
import type { SessionData } from '../types';

interface SessionHeaderProps {
  session: SessionData;
}

export const SessionHeader: React.FC<SessionHeaderProps> = ({ session }) => {
  return (
    <Card>
      <Title order={2}>{session.name}</Title>
      <Text>ID: {session.id}</Text>
      <Text>Players: {session.players.map((p) => p.username).join(', ')}</Text>
    </Card>
  );
};
