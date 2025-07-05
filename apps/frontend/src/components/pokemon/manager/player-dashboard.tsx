// TODO: Migrate real logic from pokemon-bak
import { useState, useCallback } from 'react';
import { Stack, Title, Card } from '@mantine/core';
import { PokemonGrid } from './pokemon-grid';
import { EnhancedPokemon } from './pokemon-utils';
import { useUpdatePokemonMutation } from '../../../lib/api-client/generated.api';
import { PokemonPositionManager } from '@repo/pokemon-utils';
// import { useMovePokemonMutation } from '../../../lib/api-client/generated.api'; // Uncomment and adjust as needed
// import { movePokemonWithUtils } from 'pokemon-utils'; // Uncomment and adjust as needed

interface PlayerDashboardProps {
  team: EnhancedPokemon[];
  box: EnhancedPokemon[];
  sessionId: string;
  onPokemonUpdate?: () => void;
  onAddPokemon?: (inBox: boolean, position?: number) => void;
  sessionPlayers?: { id: string; username: string }[];
  allSessionPokemon?: EnhancedPokemon[];
  canAddPokemon?: boolean;
}

export function PlayerDashboard({
  team,
  box,
  sessionId,
  onPokemonUpdate,
  onAddPokemon,
  sessionPlayers,
  allSessionPokemon,
  canAddPokemon = true,
}: PlayerDashboardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatePokemon] = useUpdatePokemonMutation();

  const handleEmptySlotClick = (isTeam: boolean, position?: number) => {
    if (!canAddPokemon) {
      // Optionally show a notification or do nothing
      return;
    }
    if (onAddPokemon) {
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
        // Combine all Pokémon for validation
        const allPokemon = [...team, ...box];
        const newLocation = toTeam ? 'TEAM' : 'BOX';
        console.log('newPosition', newPosition);
        const { valid, error: validationError } =
          PokemonPositionManager.validateMove(
            allPokemon,
            pokemonId,
            newLocation,
            newPosition
          );
        if (!valid) {
          alert(validationError || 'Invalid move');
          setIsUpdating(false);
          return;
        }
        // Find the Pokémon to move
        const pokemon = allPokemon.find((p) => p.id === pokemonId);
        if (!pokemon) {
          alert('Pokémon not found');
          setIsUpdating(false);
          return;
        }
        // Send the mutation (must include all required fields)
        await updatePokemon({
          sessionId,
          id: pokemonId,
          updatePokemonRequest: {
            status: pokemon.status,
            routeName: pokemon.routeName,
            location: newLocation,
            position: newPosition,
          },
        }).unwrap();
        if (onPokemonUpdate) onPokemonUpdate();
      } catch (error) {
        console.error('Error moving Pokemon:', error);
        alert('Error moving Pokémon');
      } finally {
        setIsUpdating(false);
      }
    },
    [sessionId, team, box, updatePokemon, onPokemonUpdate, isUpdating]
  );

  return (
    <Stack gap='md'>
      <Card p={0}>
        <Title order={3} mb='md'>
          Your Team
        </Title>
        <PokemonGrid
          pokemons={team}
          isTeam={true}
          onPokemonMove={handlePokemonMove}
          onEmptySlotClick={handleEmptySlotClick}
          sessionPlayers={sessionPlayers}
          allSessionPokemon={allSessionPokemon}
          sessionId={sessionId}
          canAddPokemon={canAddPokemon}
        />
      </Card>
      <Card p={0}>
        <Title order={3} mb='md'>
          Box
        </Title>
        <PokemonGrid
          pokemons={box}
          isTeam={false}
          onPokemonMove={handlePokemonMove}
          onEmptySlotClick={handleEmptySlotClick}
          sessionPlayers={sessionPlayers}
          allSessionPokemon={allSessionPokemon}
          sessionId={sessionId}
          canAddPokemon={canAddPokemon}
        />
      </Card>
    </Stack>
  );
}
