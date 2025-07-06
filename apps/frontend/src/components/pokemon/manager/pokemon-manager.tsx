import { Title, Text, Group, Alert } from '@mantine/core';
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
  sessionStatus?: 'WAITING' | 'STARTED' | 'FINISHED';
}

export const PokemonManager: React.FC<PokemonManagerProps> = ({
  team,
  box,
  sessionId,
  playerId,
  onPokemonUpdate,
  sessionPlayers,
  allSessionPokemon,
  sessionStatus,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInBox, setDialogInBox] = useState(true);
  const [dialogPosition, setDialogPosition] = useState<number>(0);

  const isSessionStarted = sessionStatus === 'STARTED';

  const handleAddPokemon = (inBox: boolean, position?: number) => {
    // Only allow adding Pokemon if session is started
    if (!isSessionStarted) {
      return;
    }
    setDialogInBox(inBox);
    setDialogPosition(position !== undefined ? position : 0);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Group justify='space-between' align='center' mb='md'>
        <Title order={3}>Pokemon</Title>
      </Group>
      <Text mb='md'>
        Manage your Pokémon by dragging and dropping or clicking empty slots.
      </Text>

      {!isSessionStarted && (
        <Alert color='yellow' title='Session Not Started' mb='md'>
          Pokemon can only be added when the session is in "STARTED" status.
          Currently the session is in "{sessionStatus}" status.
        </Alert>
      )}

      <PlayerDashboard
        team={team}
        box={box}
        sessionId={sessionId}
        onPokemonUpdate={onPokemonUpdate}
        onAddPokemon={handleAddPokemon}
        sessionPlayers={sessionPlayers}
        allSessionPokemon={allSessionPokemon}
        canAddPokemon={isSessionStarted}
      />
      <AddPokemonModal
        sessionId={sessionId}
        playerId={playerId}
        opened={dialogOpen}
        onClose={handleCloseDialog}
        defaultInBox={dialogInBox}
        position={dialogPosition}
      />
    </div>
  );
};
