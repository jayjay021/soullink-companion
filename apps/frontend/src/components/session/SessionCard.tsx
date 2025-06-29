import { Card, Stack, Group, Title, Text, Badge, Button, ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import type { components } from '@repo/api-spec/types';

type SessionListItem = components['schemas']['SessionListItem'];
type SessionStatus = components['schemas']['SessionStatus'];

interface SessionCardProps {
  session: SessionListItem;
  onEdit: (session: SessionListItem) => void;
  onDelete: (sessionId: string) => void;
  onJoin: (sessionId: string) => void;
  isJoining: boolean;
}

export function SessionCard({ session, onEdit, onDelete, onJoin, isJoining }: SessionCardProps) {
  const getStatusColor = (status: SessionStatus) => {
    switch (status) {
      case 'WAITING': return 'yellow';
      case 'STARTED': return 'green';
      case 'FINISHED': return 'gray';
      default: return 'blue';
    }
  };

  const getStatusLabel = (status: SessionStatus) => {
    switch (status) {
      case 'WAITING': return 'Waiting';
      case 'STARTED': return 'Active';
      case 'FINISHED': return 'Finished';
      default: return status;
    }
  };

  return (
    <Card withBorder p="xl">
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={3} size="h4">{session.name}</Title>
          <Menu>
            <Menu.Target>
              <ActionIcon variant="subtle" size="sm">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item 
                leftSection={<IconEdit size={16} />}
                onClick={() => onEdit(session)}
              >
                Edit
              </Menu.Item>
              <Menu.Item 
                leftSection={<IconTrash size={16} />}
                color="red"
                onClick={() => onDelete(session.id)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {session.description}
        </Text>

        <Group gap="xs">
          <Badge color={getStatusColor(session.status)} variant="light">
            {getStatusLabel(session.status)}
          </Badge>
        </Group>

        <Text size="xs" c="dimmed">
          Created {new Date(session.createdAt).toLocaleDateString()}
        </Text>

        <Group gap="xs">
          <Button 
            variant="light" 
            fullWidth
            onClick={() => onJoin(session.id)}
            loading={isJoining}
          >
            Join Session
          </Button>
        </Group>
      </Stack>
    </Card>
  );
} 