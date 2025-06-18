'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Autocomplete, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PokemonAutocomplete } from './pokemon-autocomplete';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreatePokemonRequest, ApiError } from '@/types/api';
import type { PokemonData } from '@/app/api/pokemon/route';

interface AddPokemonModalProps {
  sessionId: string;
  playerId: string;
  opened: boolean;
  onClose: () => void;
  defaultInBox?: boolean; // Whether the Pokemon should be added to box or team by default
  position?: number; // Specific position to add the Pokemon to
}

export function AddPokemonModal({
  sessionId,
  playerId,
  opened,
  onClose,
  defaultInBox = true,
  position = 0,
}: AddPokemonModalProps) {
  const [name, setName] = useState('');
  const [route, setRoute] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );
  const queryClient = useQueryClient();

  // Fetch used routes for this session
  const {
    data: usedRoutes = [],
    isLoading: routesLoading,
    refetch: refetchRoutes,
  } = useQuery({
    queryKey: ['usedRoutes', sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/session/${sessionId}/route`);
      if (!res.ok) throw new Error('Failed to fetch routes');
      return res.json();
    },
    enabled: opened,
  });

  // Refetch usedRoutes every time the modal is opened
  useEffect(() => {
    if (opened) {
      refetchRoutes();
    }
  }, [opened, refetchRoutes]);

  const mutation = useMutation({
    mutationFn: async (
      data: CreatePokemonRequest & { image: string; inBox: boolean }
    ) => {
      const res = await fetch(`/api/pokemon/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, playerId }),
      });

      if (!res.ok) {
        const errorData: ApiError = await res.json();
        throw new Error(errorData.error || 'Failed to add Pokémon');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemons', sessionId] });
      setName('');
      setRoute('');
      setSelectedPokemon(null);
      onClose();

      notifications.show({
        title: 'Success',
        message: `${name} has been added to your collection!`,
        color: 'green',
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const handleRouteChange = (value: string) => {
    setRoute(value);
  };

  const handleAdd = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (name && route && selectedPokemon && playerId) {
      mutation.mutate({
        name,
        route,
        image: selectedPokemon.image,
        playerId,
        inBox: defaultInBox,
        position: position,
      });
    }
  };

  const handleClose = () => {
    setName('');
    setRoute('');
    setSelectedPokemon(null);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Add Pokémon">
      <form onSubmit={handleAdd}>
        <Stack>
          <PokemonAutocomplete
            value={name}
            onChange={setSelectedPokemon}
            onNameChange={setName}
          />
          <Autocomplete
            label="Route"
            value={route}
            onChange={handleRouteChange}
            data={usedRoutes}
            placeholder="Enter or select a route"
            disabled={routesLoading}
          />
          <Button
            type="submit"
            disabled={!name || !route || !selectedPokemon || mutation.isPending}
            loading={mutation.isPending}
          >
            Add
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
