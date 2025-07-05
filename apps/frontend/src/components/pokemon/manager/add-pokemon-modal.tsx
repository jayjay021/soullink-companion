import React, { useState, useEffect } from 'react';
import { Modal, Button, Autocomplete, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PokemonAutocomplete } from './pokemon-autocomplete';
import {
  useAddPokemonMutation,
  useGetPokemonRoutesQuery,
} from '../../../lib/api-client/generated.api';
import type {
  CreatePokemonRequest,
  PokedexPokemon,
} from '../../../lib/api-client/generated.api';

interface AddPokemonModalProps {
  sessionId: string;
  playerId: string;
  opened: boolean;
  onClose: () => void;
  defaultInBox?: boolean;
  position: number;
}

export function AddPokemonModal({
  sessionId,
  playerId,
  opened,
  onClose,
  defaultInBox = true,
  position,
}: AddPokemonModalProps) {
  const [name, setName] = useState('');
  const [route, setRoute] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<PokedexPokemon | null>(
    null
  );
  const [pokemonError, setPokemonError] = useState<string | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [addPokemon, { isLoading: isAdding }] = useAddPokemonMutation();
  const {
    data: usedRoutes,
    isLoading: routesLoading,
    refetch,
  } = useGetPokemonRoutesQuery({ sessionId }, { skip: !opened });

  useEffect(() => {
    if (opened) {
      refetch();
    }
  }, [opened, refetch]);

  const handleRouteChange = (value: string) => {
    setRoute(value);
    setRouteError(null); // Clear route error when user types
  };

  const handleAdd = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Clear previous errors
    setPokemonError(null);
    setRouteError(null);

    if (name && route && selectedPokemon && playerId) {
      try {
        const req: CreatePokemonRequest = {
          userId: playerId,
          pokemonId: selectedPokemon.id,
          status: 'CAUGHT',
          routeName: route,
          location: defaultInBox ? 'BOX' : 'TEAM',
          position: position,
        };
        await addPokemon({ sessionId, createPokemonRequest: req }).unwrap();
        setName('');
        setRoute('');
        setSelectedPokemon(null);
        onClose();
        notifications.show({
          title: 'Success',
          message: `${name} has been added to your collection!`,
          color: 'green',
        });
      } catch (error: unknown) {
        // Handle field-specific errors
        if (error && typeof error === 'object' && 'data' in error) {
          const errorData = error as {
            data?: { error?: { message?: string } };
          };
          const errorMessage = errorData.data?.error?.message;

          if (errorMessage) {
            if (
              errorMessage.includes('evolution line') ||
              errorMessage.includes('already caught')
            ) {
              setPokemonError(errorMessage);
            } else if (
              errorMessage.includes('route') ||
              errorMessage.includes('duplicate')
            ) {
              setRouteError(errorMessage);
            } else if (
              errorMessage.includes('position') ||
              errorMessage.includes('already taken')
            ) {
              // This is a position error, show general notification
              notifications.show({
                title: 'Error',
                message: errorMessage,
                color: 'red',
              });
            } else {
              // General error
              notifications.show({
                title: 'Error',
                message: errorMessage,
                color: 'red',
              });
            }
          } else {
            notifications.show({
              title: 'Error',
              message: 'An error occurred while adding the Pokémon',
              color: 'red',
            });
          }
        } else {
          notifications.show({
            title: 'Error',
            message: 'An error occurred while adding the Pokémon',
            color: 'red',
          });
        }
      }
    }
  };

  const handleClose = () => {
    setName('');
    setRoute('');
    setSelectedPokemon(null);
    setPokemonError(null);
    setRouteError(null);
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title='Add Pokémon'>
      <form onSubmit={handleAdd}>
        <Stack>
          <PokemonAutocomplete
            value={name}
            onChange={setSelectedPokemon}
            onNameChange={setName}
            error={pokemonError}
          />
          <Autocomplete
            label='Route'
            value={route}
            onChange={handleRouteChange}
            data={usedRoutes?.routes || []}
            placeholder='Enter or select a route'
            disabled={routesLoading}
            error={routeError}
          />
          <Button
            type='submit'
            disabled={!name || !route || !selectedPokemon || isAdding}
            loading={isAdding}
          >
            Add
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
