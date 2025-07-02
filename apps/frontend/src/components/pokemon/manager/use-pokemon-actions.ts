import { useState } from 'react';
import { useUpdatePokemonMutation, useListPokemonQuery } from '../../../lib/api-client/generated.api';
import { useAuth } from '../../../contexts/AuthContext';
import { PokemonPositionManager } from '@repo/pokemon-utils';

export function usePokemonActions(sessionId: string) {
  const { user } = useAuth();
  const userId = user?.id;
  const [updatePokemon] = useUpdatePokemonMutation();
  const { data: playerPokemon = { pokemon: [] } } = useListPokemonQuery({ sessionId, userId });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const markAsDead = {
    mutate: async ({ pokemonId }: { pokemonId: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const pokemon = playerPokemon.pokemon.find((p) => p.id === pokemonId);
        if (!pokemon) throw new Error('Pokemon not found');
        await updatePokemon({
          sessionId,
          id: pokemonId,
          updatePokemonRequest: {
            status: 'DEAD',
            routeName: pokemon.routeName,
            location: pokemon.location,
            position: pokemon.position,
          },
        }).unwrap();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
  };

  const movePokemon = {
    mutate: async ({ pokemonId, inBox }: { pokemonId: string; inBox?: boolean }) => {
      setIsLoading(true);
      setError(null);
      try {
        const pokemon = playerPokemon.pokemon.find((p) => p.id === pokemonId);
        if (!pokemon) throw new Error('Pokemon not found');
        // Use PokemonPositionManager for validation and position
        const newLocation = inBox ? 'BOX' : 'TEAM';
        const newPosition = inBox
          ? PokemonPositionManager.getNextBoxPosition(playerPokemon.pokemon, userId || '')
          : PokemonPositionManager.getNextTeamPosition(playerPokemon.pokemon, userId || '') || 1;
        const { valid, error: validationError } = PokemonPositionManager.validateMove(
          playerPokemon.pokemon,
          pokemonId,
          newLocation,
          newPosition
        );
        if (!valid) throw new Error(validationError || 'Invalid move');
        await updatePokemon({
          sessionId,
          id: pokemonId,
          updatePokemonRequest: {
            location: newLocation,
            position: newPosition,
            status: pokemon.status,
            routeName: pokemon.routeName,
          },
        }).unwrap();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    },
  };

  return {
    markAsDead,
    movePokemon,
    isLoading,
    error,
  };
} 