import { useState } from 'react';
import { 
  Container, 
  Title, 
  Group, 
  Button, 
  Loader,
  Stack,
  Text,
  Card
} from '@mantine/core';
import { useSessions, useCreateSession, useDeleteSession, useUpdateSession, useJoinSession } from '../hooks/useApi';
import { useAuth } from '../contexts/AuthContext';
import { IconPlus } from '@tabler/icons-react';
import { SessionList, CreateSessionModal, EditSessionModal } from '../components/session';
import type { components } from '@repo/api-spec/types';

type SessionListItem = components['schemas']['SessionListItem'];

export function SessionsPage() {
  const { user } = useAuth();
  const { data: sessionsResponse, isLoading, error } = useSessions();
  const createSession = useCreateSession();
  const deleteSession = useDeleteSession();
  const updateSession = useUpdateSession();
  const joinSession = useJoinSession();
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionListItem | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const sessions = sessionsResponse?.sessions || [];

  const handleCreateSession = () => {
    if (!user) return;
    
    createSession.mutate(formData, {
      onSuccess: () => {
        setCreateModalOpen(false);
        setFormData({ name: '', description: '' });
      },
    });
  };

  const handleEditSession = () => {
    if (!selectedSession) return;
    
    updateSession.mutate({
      sessionId: selectedSession.id,
      data: formData,
    }, {
      onSuccess: () => {
        setEditModalOpen(false);
        setSelectedSession(null);
        setFormData({ name: '', description: '' });
      },
    });
  };

  const handleDeleteSession = (sessionId: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      deleteSession.mutate(sessionId);
    }
  };

  const handleJoinSession = (sessionId: string) => {
    if (!user) return;
    
    joinSession.mutate({
      sessionId,
      data: { userId: user.id },
    });
  };

  const openEditModal = (session: SessionListItem) => {
    setSelectedSession(session);
    setFormData({ name: session.name, description: session.description });
    setEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <Container size="lg">
        <Stack gap="lg" align="center" py="xl">
          <Loader size="lg" />
          <Text>Loading sessions...</Text>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg">
        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={1} c="red">Error Loading Sessions</Title>
            <Text>
              Failed to load sessions. Please check your API connection.
            </Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="lg">
      <Stack gap="lg">
        <Group justify="space-between">
          <Title order={1}>Sessions</Title>
          <Button 
            leftSection={<IconPlus size={16} />}
            onClick={() => setCreateModalOpen(true)}
          >
            Create Session
          </Button>
        </Group>

        <SessionList
          sessions={sessions}
          onCreateSession={() => setCreateModalOpen(true)}
          onEditSession={openEditModal}
          onDeleteSession={handleDeleteSession}
          onJoinSession={handleJoinSession}
          isJoining={joinSession.isPending}
        />
      </Stack>

      <CreateSessionModal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleCreateSession}
        isLoading={createSession.isPending}
      />

      <EditSessionModal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleEditSession}
        isLoading={updateSession.isPending}
      />
    </Container>
  );
} 