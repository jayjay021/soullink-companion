'use client';

import React, { useState, useCallback } from 'react';
import {
  Stack,
  Title,
  Card,
  Button,
  Text,
  Modal,
  Group,
  Box,
} from '@mantine/core';
import { PokemonGrid, type Pokemon, usePokemonActions } from '@/components';
import { IconSkull, IconSwitch } from '@tabler/icons-react';

interface PlayerDashboardProps {
  team: Pokemon[];
  box: Pokemon[];
  sessionId: string;
  onPokemonUpdate?: () => void;
  onAddPokemon?: (inBox: boolean, position?: number) => void;
}

export function PlayerDashboard({
  team,
  box,
  sessionId,
  onPokemonUpdate,
  onAddPokemon,
}: PlayerDashboardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const { markAsDead, movePokemon } = usePokemonActions(sessionId);

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

  const handlePokemonContextMenu = useCallback(
    (pokemon: Pokemon, e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedPokemon(pokemon);
    },
    []
  );

  const handleMarkAsDead = useCallback(() => {
    if (!selectedPokemon) return;

    markAsDead.mutate(
      { pokemonId: selectedPokemon.id },
      {
        onSuccess: () => {
          if (onPokemonUpdate) {
            onPokemonUpdate();
          }
          setSelectedPokemon(null);
        },
      }
    );
  }, [selectedPokemon, markAsDead, onPokemonUpdate]);

  const handleToggleTeamBox = useCallback(() => {
    if (!selectedPokemon) return;

    console.log('Moving Pokemon between team/box:', {
      id: selectedPokemon.id,
      name: selectedPokemon.name,
      currentInBox: selectedPokemon.inBox,
      movingTo: selectedPokemon.inBox ? 'Team' : 'Box',
    });

    // If in box, move to team, vice versa
    // Now using the position endpoint under the hood, which will find the appropriate position
    movePokemon.mutate(
      {
        pokemonId: selectedPokemon.id,
        inBox: !selectedPokemon.inBox,
      },
      {
        onSuccess: () => {
          if (onPokemonUpdate) {
            onPokemonUpdate();
          }
          setSelectedPokemon(null);
        },
      }
    );
  }, [selectedPokemon, movePokemon, onPokemonUpdate]);

  return (
    <Stack>
      {/* Pokemon context menu - using a modal instead of a menu */}
      <Modal
        opened={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        title={
          selectedPokemon ? `Manage ${selectedPokemon.name}` : 'Pokémon Actions'
        }
        size="sm"
        centered
      >
        {selectedPokemon && (
          <Stack>
            <Group>
              <Title order={4}>Actions</Title>
            </Group>

            {!selectedPokemon.isDead && (
              <Button
                color="red"
                leftSection={<IconSkull size={14} />}
                onClick={handleMarkAsDead}
                fullWidth
              >
                Mark as dead
              </Button>
            )}

            <Button
              leftSection={<IconSwitch size={14} />}
              onClick={handleToggleTeamBox}
              fullWidth
            >
              {selectedPokemon.inBox ? 'Move to team' : 'Move to box'}
            </Button>

            <Title order={4} mt="md">
              Link Information
            </Title>

            <Box>
              {selectedPokemon.linkGroup ? (
                selectedPokemon.isLinked ? (
                  <Text c="green" size="sm">
                    Linked with other players (Route: {selectedPokemon.route})
                  </Text>
                ) : (
                  <Text c="yellow" size="sm">
                    Waiting for other players to catch on route{' '}
                    {selectedPokemon.route}
                  </Text>
                )
              ) : (
                <Text c="dimmed" size="sm">
                  Not linked to other Pokémon
                </Text>
              )}
            </Box>

            {selectedPokemon.inTeam && selectedPokemon.linkGroup && (
              <Text
                size="sm"
                c={selectedPokemon.validTeamLink ? 'green' : 'orange'}
              >
                {selectedPokemon.validTeamLink
                  ? 'Valid team link - All linked Pokémon are in team'
                  : 'Invalid team link - Some linked Pokémon are not in team'}
              </Text>
            )}
          </Stack>
        )}
      </Modal>

      <Card>
        <Title order={3} mb="md">
          Your Team
        </Title>
        <PokemonGrid
          pokemons={team}
          isTeam={true}
          onPokemonMove={handlePokemonMove}
          onEmptySlotClick={handleEmptySlotClick}
          onContextMenu={handlePokemonContextMenu}
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
          onContextMenu={handlePokemonContextMenu}
        />
      </Card>
    </Stack>
  );
}
