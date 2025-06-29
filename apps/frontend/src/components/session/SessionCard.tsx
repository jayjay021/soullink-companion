import { Card, Stack, Group, Title, Text, Badge, Button, ActionIcon, Menu } from '@mantine/core';
import { IconDots, IconEdit, IconTrash, IconEye } from '@tabler/icons-react';
import { Session, SessionStatus, UserRef } from '../../lib/api-client/generated.api';

// Custom type that matches the actual backend response


interface SessionCardProps {
  session: Session;
  currentUser: UserRef | null;
  onEdit: (session: Session) => void;
  onDelete: (sessionId: string) => void;
  onJoin: (sessionId: string) => void;
  onView: (sessionId: string) => void;
  isJoining: boolean;
}

export function SessionCard({ 
  session, 
  currentUser, 
  onEdit, 
  onDelete, 
  onJoin, 
  onView, 
  isJoining 
}: SessionCardProps) {
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

  const isUserInSession = currentUser && session.users.some(user => user.id === currentUser.id);

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
          <Badge color="blue" variant="light">
            {session.users.length} player{session.users.length !== 1 ? 's' : ''}
          </Badge>
        </Group>

        <Text size="xs" c="dimmed">
          Created {new Date(session.createdAt).toLocaleDateString()}
        </Text>

        <Group gap="xs">
          {isUserInSession ? (
            <Button 
              variant="light" 
              fullWidth
              leftSection={<IconEye size={16} />}
              onClick={() => onView(session.id)}
            >
              View Session
            </Button>
          ) : (
            <Button 
              variant="light" 
              fullWidth
              onClick={() => onJoin(session.id)}
              loading={isJoining}
            >
              Join Session
            </Button>
          )}
        </Group>
      </Stack>
    </Card>
  );
} 