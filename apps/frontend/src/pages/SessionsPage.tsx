import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  useListSessionsQuery,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useUpdateSessionMutation,
  useJoinSessionMutation,
  SessionListItem,
} from '../lib/api-client/generated.api';
import { useAuth } from '../contexts/AuthContext';
import { IconPlus } from '@tabler/icons-react';
import { SessionList, CreateSessionModal, EditSessionModal } from '../components/session';

type FormData = { name: string; description: string };

export function SessionsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: sessionsResponse, isLoading, error } = useListSessionsQuery();
  const [createSession, { isLoading: isCreating }] = useCreateSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const [updateSession, { isLoading: isUpdating }] = useUpdateSessionMutation();
  const [joinSession, { isLoading: isJoining }] = useJoinSessionMutation();
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<SessionListItem | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', description: '' });

  const sessions = sessionsResponse?.sessions || [];

  const handleCreateSession = async () => {
    if (!user) return;
    try {
      await createSession({ createSessionRequest: formData }).unwrap();
      setCreateModalOpen(false);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const handleEditSession = async () => {
    if (!selectedSession) return;
    try {
      await updateSession({
        sessionId: selectedSession.id,
        updateSessionRequest: formData,
      }).unwrap();
      setEditModalOpen(false);
      setSelectedSession(null);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Failed to update session:', error);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession({ sessionId }).unwrap();
      } catch (error) {
        console.error('Failed to delete session:', error);
      }
    }
  };

  const handleJoinSession = async (sessionId: string) => {
    if (!user) return;
    try {
      await joinSession({
        sessionId,
        joinSessionRequest: { userId: user.id },
      }).unwrap();
      navigate(`/sessions/${sessionId}`);
    } catch (error) {
      console.error('Failed to join session:', error);
    }
  };

  const handleViewSession = (sessionId: string) => {
    navigate(`/sessions/${sessionId}`);
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
          currentUser={user}
          onCreateSession={() => setCreateModalOpen(true)}
          onEditSession={openEditModal}
          onDeleteSession={handleDeleteSession}
          onJoinSession={handleJoinSession}
          onViewSession={handleViewSession}
          isJoining={isJoining}
        />
      </Stack>

      <CreateSessionModal
        opened={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleCreateSession}
        isLoading={isCreating}
      />

      <EditSessionModal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleEditSession}
        isLoading={isUpdating}
      />
    </Container>
  );
} 