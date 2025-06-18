'use client';
import React, { useEffect } from 'react';
import { Modal, TextInput, Button, Group } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

interface UsernameDialogProps {
  opened: boolean;
  username: string;
  setUsername: (name: string) => void;
  onSubmit: () => void;
}

export default function UsernameDialog({
  opened,
  username,
  setUsername,
  onSubmit,
}: UsernameDialogProps) {
  // Generate or retrieve UUID from localStorage
  useEffect(() => {
    if (opened) {
      let uuid = localStorage.getItem('playerUuid');
      if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem('playerUuid', uuid);
      }
    }
  }, [opened]);

  const handleSubmit = () => {
    if (username.trim()) {
      localStorage.setItem('username', username);
      localStorage.setItem('playerUuid', localStorage.getItem('playerUuid')!);
      onSubmit();
    }
  };

  return (
    <Modal opened={opened} onClose={() => {}} title='Enter Username' centered>
      <TextInput
        label='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoFocus
      />
      <Group mt='md' justify='flex-end'>
        <Button onClick={handleSubmit} disabled={!username.trim()}>
          Continue
        </Button>
      </Group>
    </Modal>
  );
}
