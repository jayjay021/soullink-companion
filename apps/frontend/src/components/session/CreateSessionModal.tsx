import { Modal, Stack, TextInput, Textarea, Group, Button } from '@mantine/core';

interface CreateSessionModalProps {
  opened: boolean;
  onClose: () => void;
  formData: { name: string; description: string };
  onFormDataChange: (data: { name: string; description: string }) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function CreateSessionModal({ 
  opened, 
  onClose, 
  formData, 
  onFormDataChange, 
  onSubmit, 
  isLoading 
}: CreateSessionModalProps) {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title="Create New Session"
      size="md"
    >
      <Stack gap="md">
        <TextInput
          label="Session Name"
          placeholder="Enter session name"
          value={formData.name}
          onChange={(e) => onFormDataChange({ ...formData, name: e.target.value })}
          required
        />
        <Textarea
          label="Description"
          placeholder="Enter session description"
          value={formData.description}
          onChange={(e) => onFormDataChange({ ...formData, description: e.target.value })}
          required
          rows={3}
        />
        <Group justify="flex-end">
          <Button variant="light" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            loading={isLoading}
            disabled={!formData.name || !formData.description}
          >
            Create Session
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
} 