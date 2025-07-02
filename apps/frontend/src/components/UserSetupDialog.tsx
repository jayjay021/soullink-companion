import { useState } from 'react';
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Title,
  Text,
  Alert,
} from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

interface UserSetupDialogProps {
  opened: boolean;
  onClose: () => void;
}

export function UserSetupDialog({ opened, onClose }: UserSetupDialogProps) {
  const { createUser, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateUsername = (value: string): string | null => {
    if (!value.trim()) {
      return 'Username is required';
    }
    if (value.trim().length < 2) {
      return 'Username must be at least 2 characters';
    }
    if (value.length > 50) {
      return 'Username must be at most 50 characters';
    }
    return null;
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setValidationError(validateUsername(value));
  };

  const handleSubmit = async () => {
    const error = validateUsername(username);
    if (error) {
      setValidationError(error);
      return;
    }

    try {
      await createUser(username.trim());
      onClose();
    } catch {
      setValidationError('Failed to create user');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !validationError && username.trim()) {
      handleSubmit();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Welcome to SoulLink Companion!"
      size="md"
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      centered
    >
      <Stack gap="lg">
        <div>
          <Title order={3} mb="xs">
            Set Up Your Profile
          </Title>
          <Text size="sm" c="dimmed">
            Choose a username to get started. You can change this later in your settings.
          </Text>
        </div>

        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => handleUsernameChange(e.target.value)}
          onKeyPress={handleKeyPress}
          error={validationError}
          required
          autoFocus
          maxLength={50}
        />

        {error && (
          <Alert color="red" title="Error">
            {error}
          </Alert>
        )}

        <Button
          onClick={handleSubmit}
          loading={isLoading}
          disabled={!username.trim() || !!validationError}
          fullWidth
        >
          Get Started
        </Button>
      </Stack>
    </Modal>
  );
} 