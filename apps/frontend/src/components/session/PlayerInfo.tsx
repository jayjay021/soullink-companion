import { Title, Text, Card, Stack, Group, Avatar } from '@mantine/core';
import type { UserRef } from '../../lib/api-client/generated.api';

interface PlayerInfoProps {
  users: UserRef[];
}

export function PlayerInfo({ users }: PlayerInfoProps) {
  return (
    <Card withBorder p="xl">
      <Stack gap="md">
        <Title order={3} size="h4">Players ({users.length})</Title>
        
        {users.length === 0 ? (
          <Text size="sm" c="dimmed">No players have joined yet.</Text>
        ) : (
          <Stack gap="xs">
            {users.map((user: UserRef) => (
              <Group key={user.id} gap="xs">
                <Avatar size="sm" radius="xl">
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
                <Text size="sm">{user.username}</Text>
              </Group>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
} 