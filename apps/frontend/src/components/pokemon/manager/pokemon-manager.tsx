import { Card, Title, Text, Group } from '@mantine/core';
import { useState } from 'react';
import { PlayerDashboard } from './player-dashboard';
import { AddPokemonModal } from './add-pokemon-modal';
import { EnhancedPokemon } from './pokemon-utils';


interface PokemonManagerProps {
  team: EnhancedPokemon[];
  box: EnhancedPokemon[];
  sessionId: string;
  playerId: string;
  onPokemonUpdate: () => void;
  sessionPlayers?: { id: string; username: string }[];
  allSessionPokemon?: EnhancedPokemon[];
}

export const PokemonManager: React.FC<PokemonManagerProps> = ({
  team,
  box,
  sessionId,
  playerId,
  onPokemonUpdate,
  sessionPlayers,
  allSessionPokemon,
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
        sessionPlayers={sessionPlayers}
        allSessionPokemon={allSessionPokemon}
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
} 