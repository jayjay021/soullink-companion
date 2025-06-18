import { Group, Title, Button } from '@mantine/core';

interface SessionListHeaderProps {
  onAddClick: () => void;
}

export function SessionListHeader({ onAddClick }: SessionListHeaderProps) {
  return (
    <Group justify="space-between">
      <Title order={1}>Sessions</Title>
      <Button onClick={onAddClick}>Add</Button>
    </Group>
  );
}
