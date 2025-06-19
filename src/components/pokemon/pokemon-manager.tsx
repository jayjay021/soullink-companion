'use client';
import { Card, Title, Text, Group } from '@mantine/core';
import { PlayerDashboard, AddPokemonModal } from '@/components';
import { useState } from 'react';
import type { PokemonData } from '@/types';

interface PokemonManagerProps {
  team: PokemonData[];
  box: PokemonData[];
  sessionId: string;
  playerId: string;
  onPokemonUpdate: () => void;
}

export const PokemonManager: React.FC<PokemonManagerProps> = ({
  team,
  box,
  sessionId,
  playerId,
  onPokemonUpdate,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInBox, setDialogInBox] = useState(true);
  const [dialogPosition, setDialogPosition] = useState<number>(0);

  const handleAddPokemon = (inBox: boolean, position?: number) => {
    setDialogInBox(inBox);
    setDialogPosition(position !== undefined ? position : 0);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Card variant="outline" p="md">
      <Group justify="space-between" align="center" mb="md">
        <Title order={3}>Pokemon</Title>
      </Group>
      <Text>
        Manage your Pokémon by dragging and dropping or clicking empty slots.
      </Text>
      <PlayerDashboard
        team={team}
        box={box}
        sessionId={sessionId}
        onPokemonUpdate={onPokemonUpdate}
        onAddPokemon={handleAddPokemon}
      />
      <AddPokemonModal
        sessionId={sessionId}
        playerId={playerId}
        opened={dialogOpen}
        onClose={handleCloseDialog}
        defaultInBox={dialogInBox}
        position={dialogPosition}
      />
    </Card>
  );
};
