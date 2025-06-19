'use client';

import React, { useState, useCallback } from 'react';
import { Stack, Title, Card } from '@mantine/core';
import { PokemonGrid, type Pokemon } from '@/components';

interface PlayerDashboardProps {
  team: Pokemon[];
  box: Pokemon[];
  sessionId: string;
  onPokemonUpdate?: () => void;
  onAddPokemon?: (inBox: boolean, position?: number) => void;
  sessionPlayers?: { id: string; username: string }[];
  allSessionPokemon?: Pokemon[];
}

export function PlayerDashboard({
  team,
  box,
  sessionId,
  onPokemonUpdate,
  onAddPokemon,
  sessionPlayers,
  allSessionPokemon,
}: PlayerDashboardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEmptySlotClick = (isTeam: boolean, position?: number) => {
    if (onAddPokemon) {
      // inBox is opposite of isTeam (team means inBox=false, box means inBox=true)
      const inBox = !isTeam;
      onAddPokemon(inBox, position);
    } else {
      console.warn('onAddPokemon callback is not defined');
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
        <Title order={3} mb="md">
          Your Team
        </Title>
        <PokemonGrid
          pokemons={team}
          isTeam={true}
          onPokemonMove={handlePokemonMove}
          onEmptySlotClick={handleEmptySlotClick}
          sessionPlayers={sessionPlayers}
          allSessionPokemon={allSessionPokemon}
        />
      </Card>
      <Card>
        <Title order={3} mb="md">
          Box
        </Title>
        <PokemonGrid
          pokemons={box}
          isTeam={false}
          onPokemonMove={handlePokemonMove}
          onEmptySlotClick={handleEmptySlotClick}
          sessionPlayers={sessionPlayers}
          allSessionPokemon={allSessionPokemon}
        />
      </Card>
    </Stack>
  );
}
