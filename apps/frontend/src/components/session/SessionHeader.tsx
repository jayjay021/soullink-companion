import { Title, Text, Card, Stack, Group, Badge, Button } from '@mantine/core';
import { useUpdateSessionMutation } from '../../lib/api-client/generated.api';
import type { Session } from '../../lib/api-client/generated.api';

interface SessionHeaderProps {
  session: Session;
}

export function SessionHeader({ session }: SessionHeaderProps) {
  const [updateSession, { isLoading: isUpdating }] = useUpdateSessionMutation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'WAITING':
        return 'yellow';
      case 'STARTED':
        return 'green';
      case 'FINISHED':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'WAITING':
        return 'light';
      case 'STARTED':
        return 'filled';
      case 'FINISHED':
        return 'light';
      default:
        return 'light';
    }
  };

  const handleStatusChange = async () => {
    try {
      const newStatus = session.status === 'WAITING' ? 'STARTED' : 'FINISHED';
      await updateSession({
        sessionId: session.id,
        updateSessionRequest: { status: newStatus },
      }).unwrap();
    } catch (error) {
      console.error('Failed to update session status:', error);
    }
  };

  const getStatusButtonProps = () => {
    if (session.status === 'WAITING') {
      return {
        children: 'Start Session',
        color: 'green' as const,
        variant: 'filled' as const,
      };
    } else if (session.status === 'STARTED') {
      return {
        children: 'Finish Session',
        disabled: false,
        color: 'red' as const,
        variant: 'light' as const,
      };
    }
    return null;
  };

  const buttonProps = getStatusButtonProps();

  return (
    <Card withBorder p='xl' mb='lg'>
      <Stack gap='lg'>
        {/* Main header with title, status, and action button */}
        <Group justify='space-between' align='flex-start'>
          <Stack gap='xs' style={{ flex: 1 }}>
            <Title order={1}>{session.name}</Title>
            <Text size='sm' c='dimmed' style={{ maxWidth: '600px' }}>
              {session.description}
            </Text>
            <Group gap='md'>
              <Text size='sm' c='dimmed'>
                Created: {new Date(session.createdAt).toLocaleDateString()}
              </Text>
              <Badge
                variant={getStatusVariant(session.status)}
                color={getStatusColor(session.status)}
              >
                {session.status}
              </Badge>
            </Group>
          </Stack>

          {/* Status change button in top right */}
          {buttonProps && (
            <Button
              {...buttonProps}
              loading={isUpdating}
              onClick={handleStatusChange}
            />
          )}
        </Group>
      </Stack>
    </Card>
  );
}
