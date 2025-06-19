'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/app/context/UserContext';
import type { PokemonData } from '@/types';

export interface UpdatePokemonStatusRequest {
  pokemonId: string;
  isDead?: boolean;
  inBox?: boolean;
  inTeam?: boolean;
}

export function usePokemonActions(sessionId: string) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useUser();

  // Mutation for marking Pokemon as dead
  const markAsDead = useMutation({
    mutationFn: async ({ pokemonId }: { pokemonId: string }) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/pokemon/${sessionId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pokemonId,
            isDead: true,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to mark Pokemon as dead');
        }

        return await response.json();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      // Invalidate queries to refresh Pokemon data
      queryClient.invalidateQueries({ queryKey: ['pokemon', sessionId] });
    },
  });

  // Helper function to get all Pokemon for this player
  const getPokemonForPlayer = async (): Promise<PokemonData[]> => {
    const response = await fetch(
      `/api/pokemon/${sessionId}?player=${encodeURIComponent(userId)}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon');
    }
    const data = await response.json();
    // Handle both array response and object with data property
    return Array.isArray(data) ? data : data.data || [];
  };

  // Helper function to find the first available team position
  const findFirstEmptyTeamSlot = (teamPokemon: PokemonData[]): number => {
    // Team slots are 0-5, check which one is free
    const usedPositions = teamPokemon.map((p) => p.position);
    for (let i = 0; i < 6; i++) {
      if (!usedPositions.includes(i)) {
        return i;
      }
    }
    // If no empty slot, use 0 (this should be rare as team is limited to 6)
    return 0;
  };

  // Helper function to find the last position in box
  const findLastBoxPosition = (boxPokemon: PokemonData[]): number => {
    if (boxPokemon.length === 0) return 0;
    return Math.max(...boxPokemon.map((p) => p.position)) + 1;
  };

  // Mutation for moving Pokemon between team and box
  const movePokemon = useMutation({
    mutationFn: async ({
      pokemonId,
      inBox,
    }: {
      pokemonId: string;
      inBox?: boolean;
    }) => {
      setIsLoading(true);
      setError(null);

      try {
        // First get current Pokemon to determine its current state
        const allPokemon = await getPokemonForPlayer();
        const pokemon = allPokemon.find((p) => p.id === pokemonId);

        if (!pokemon) {
          throw new Error('Pokemon not found');
        }

        // Determine the new position based on whether moving to team or box
        let newPosition: number;
        if (inBox) {
          // Moving to box - find the last position in the box
          const boxPokemon = allPokemon.filter((p) => p.inBox);
          newPosition = findLastBoxPosition(boxPokemon);
        } else {
          // Moving to team - find the first empty team slot
          const teamPokemon = allPokemon.filter((p) => p.inTeam);
          newPosition = findFirstEmptyTeamSlot(teamPokemon);
        }

        // Use the position endpoint instead of status endpoint
        const response = await fetch(`/api/pokemon/${sessionId}/position`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pokemonId,
            newPosition,
            inBox: !!inBox, // Convert to boolean to ensure correct type
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to move Pokemon');
        }

        return await response.json();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      // Invalidate queries to refresh Pokemon data
      queryClient.invalidateQueries({ queryKey: ['pokemon', sessionId] });
    },
  });

  return {
    markAsDead,
    movePokemon,
    isLoading,
    error,
  };
}
