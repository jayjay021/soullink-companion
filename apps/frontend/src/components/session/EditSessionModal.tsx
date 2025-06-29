import { Modal, Stack, TextInput, Textarea, Group, Button } from '@mantine/core';

interface EditSessionModalProps {
  opened: boolean;
  onClose: () => void;
  formData: { name: string; description: string };
  onFormDataChange: (data: { name: string; description: string }) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function EditSessionModal({ 
  opened, 
  onClose, 
  formData, 
  onFormDataChange, 
  onSubmit, 
  isLoading 
}: EditSessionModalProps) {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose}
      title="Edit Session"
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
            Update Session
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
} 