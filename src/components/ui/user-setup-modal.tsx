'use client';
import {
  Modal,
  TextInput,
  Button,
  Group,
  Checkbox,
  LoadingOverlay,
} from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useUser } from '@/app/context/UserContext';

export function UserSetupModal() {
  const { username: contextUser, reloadUser, loading } = useUser();
  const [opened, setOpened] = useState(false);
  const [isViewer, setIsViewer] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  // Open dialog if not loading and no username
  useEffect(() => {
    if (!loading) {
      setOpened(!contextUser);
    }
  }, [loading, contextUser]);

  const handleSubmit = () => {
    if (username.trim()) {
      // Save to localStorage
      localStorage.setItem('username', username);
      localStorage.setItem('isViewer', String(isViewer));

      let playerUuid = localStorage.getItem('playerUuid');
      if (!playerUuid) {
        playerUuid = uuidv4();
        localStorage.setItem('playerUuid', playerUuid);
      }

      // Only use reloadUser() to ensure consistency - don't mix manual state updates with reloadUser
      reloadUser();

      setOpened(false);
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Modal
        closeOnClickOutside={false}
        closeOnEscape={false}
        opened={opened && !loading}
        onClose={() => setOpened(false)}
        title="Welcome! Please set up your profile"
        closeButtonProps={{ style: { display: 'none' } }} // Hide close button
        centered
      >
        <TextInput
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <Checkbox
          label="Viewer mode (read-only access)"
          checked={isViewer}
          onChange={(e) => setIsViewer(e.currentTarget.checked)}
          mt="md"
        />
        <Group mt="md" justify="flex-end">
          <Button onClick={handleSubmit} disabled={!username.trim()}>
            Continue
          </Button>
        </Group>
      </Modal>
    </>
  );
}
