'use client';
import { useState, useCallback } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateSessionRequest } from '@/types/api';
import { useUser } from '@/app/context/UserContext';

interface AddSessionDialogProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddSessionDialog({
  opened,
  onClose,
}: AddSessionDialogProps) {
  const [sessionName, setSessionName] = useState('');
  const queryClient = useQueryClient();
  const { username, userId } = useUser();
  const inputRef = useCallback(
    (node: HTMLInputElement | null) => {
      if (opened && node) {
        node.focus();
      }
    },
    [opened]
  );

  const createSessionMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!username || !userId) throw new Error('Missing username or userId');
      const body: CreateSessionRequest = { name, username, playerUuid: userId };
      const res = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to create session');
      return res.json();
    },
    onSuccess: () => {
      setSessionName('');
      onClose();
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (sessionName.trim()) {
      createSessionMutation.mutate(sessionName.trim());
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Create New Session'
      centered
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          label='Session Name'
          value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          ref={inputRef}
          data-autofocus
        />
        <Group mt='md' justify='flex-end'>
          <Button
            type='submit'
            disabled={!sessionName.trim() || createSessionMutation.isPending}
          >
            {createSessionMutation.isPending ? 'Creating...' : 'Create'}
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
