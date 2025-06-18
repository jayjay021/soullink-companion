'use client';

import React, { useState, useCallback } from 'react';
import { Stack, Title, Card } from '@mantine/core';
import PlayerTeam from './PlayerTeam';

interface Pokemon {
  id: string;
  name: string;
  image: string;
  route: string;
  isDead: boolean;
  isLinked: boolean;
  position: number;
}

interface PlayerViewProps {
  team: Pokemon[];
  box: Pokemon[];
  sessionId: string;
  onPokemonUpdate?: () => void;
  onAddPokemon?: (inBox: boolean, position?: number) => void;
}

const PlayerView: React.FC<PlayerViewProps> = ({
  team,
  box,
  sessionId,
  onPokemonUpdate,
  onAddPokemon,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEmptySlotClick = (isTeam: boolean, position?: number) => {
    if (onAddPokemon) {
      onAddPokemon(!isTeam, position); // inBox is opposite of isTeam
    }
  };

  const handlePokemonMove = useCallback(
    async (pokemonId: string, newPosition: number, toTeam: boolean) => {
      if (isUpdating) return;

      setIsUpdating(true);
      try {
        const response = await fetch(`/api/pokemon/${sessionId}/position`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pokemonId,
            newPosition,
            inBox: !toTeam,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update Pokemon position');
        }

        // Call the update callback to refresh the data
        if (onPokemonUpdate) {
          onPokemonUpdate();
        }
      } catch (error) {
        console.error('Error moving Pokemon:', error);
        // You might want to show a toast notification here
      } finally {
        setIsUpdating(false);
      }
    },
    [sessionId, onPokemonUpdate, isUpdating]
  );

  return (
    <Stack>
      <Card>
        <Title order={3} mb='md'>
          Your Team
        </Title>
        <PlayerTeam
          pokemons={team}
          isTeam={true}
          onPokemonMove={handlePokemonMove}
          onEmptySlotClick={handleEmptySlotClick}
        />
      </Card>
      <Card>
        <Title order={3} mb='md'>
          Box
        </Title>
        <PlayerTeam
          pokemons={box}
          isTeam={false}
          onPokemonMove={handlePokemonMove}
          onEmptySlotClick={handleEmptySlotClick}
        />
      </Card>
    </Stack>
  );
};

export default PlayerView;
