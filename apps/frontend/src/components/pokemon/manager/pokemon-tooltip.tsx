import React from 'react';
import {
  Stack,
  Group,
  Text,
  Box,
  Divider,
  Image,
  ActionIcon,
} from '@mantine/core';
import { IconSkull, IconSwitchHorizontal } from '@tabler/icons-react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePokemonActions } from './use-pokemon-actions';
import styles from './pokemon-grid.module.css';
import { Pokemon, UserRef } from '../../../lib/api-client/generated.api';
import { enhancePokemon } from './pokemon-utils';

interface PokemonTooltipProps {
  pokemon: Pokemon;
  sessionPlayers: UserRef[];
  allSessionPokemon: Pokemon[];
  sessionId: string;
}

export const PokemonTooltip: React.FC<PokemonTooltipProps> = ({
  pokemon,
  sessionPlayers,
  allSessionPokemon,
  sessionId,
}) => {
  const { user } = useAuth();
  const userId = user?.id;
  const { markAsDead, movePokemon, isLoading } = usePokemonActions(sessionId);

  // Enhance the Pokémon with derived properties
  const enhancedPokemon = enhancePokemon(pokemon, allSessionPokemon);

  const linkedPokemon = allSessionPokemon.filter(
    (p) => p.routeName === enhancedPokemon.routeName && p.user.id !== userId
  );

  const playerPokemonMap = new Map();
  linkedPokemon.forEach((p) => {
    if (!playerPokemonMap.has(p.user.id)) {
      playerPokemonMap.set(p.user.id, p);
    }
  });

  const otherPlayers = sessionPlayers.filter((player) => player.id !== userId);

  const linkedOtherPlayerCount = linkedPokemon.length;
  const totalOtherPlayers = sessionPlayers.length - 1;

  return (
    <Box style={{ maxWidth: '400px' }}>
      <Stack gap="sm">
        <Box>
          <Group justify="space-between" align="flex-start">
            <Box>
              <Group gap="xs" align="center">
                <Text fw={600} size="sm">
                  {enhancedPokemon.name}
                </Text>
                <Text size="xs" c="dimmed">
                  ({enhancedPokemon.inBox ? 'Box' : 'Team'})
                </Text>
              </Group>
              <Text size="xs" c="dimmed">
                {enhancedPokemon.routeName}
              </Text>
              {enhancedPokemon.isDead && (
                <Text size="xs" c="red">
                  💀 Dead
                </Text>
              )}
            </Box>
            {enhancedPokemon.user.id === userId && !enhancedPokemon.isDead && (
              <Group gap="xs">
                <ActionIcon
                  size="sm"
                  onClick={() =>
                    movePokemon.mutate({
                      pokemonId: enhancedPokemon.id,
                      inBox: enhancedPokemon.inBox,
                    })
                  }
                  disabled={isLoading}
                  title={enhancedPokemon.inBox ? 'Move to Team' : 'Move to Box'}
                >
                  <IconSwitchHorizontal size={16} />
                </ActionIcon>
                <ActionIcon
                  size="sm"
                  color="red"
                  onClick={() => markAsDead.mutate({ pokemonId: enhancedPokemon.id })}
                  disabled={isLoading}
                  title="Mark as Dead"
                >
                  <IconSkull size={16} />
                </ActionIcon>
              </Group>
            )}
          </Group>
        </Box>
        <Divider />
        {enhancedPokemon.linkGroup && (
          <Box>
            <Text size="sm" fw={500} mb="xs">
              Linked Pokemon (Other Players)
            </Text>
            {otherPlayers.length > 0 ? (
              <Group gap="xs" wrap="nowrap">
                {otherPlayers.map((player) => {
                  const playerPokemon = playerPokemonMap.get(player.id);
                  const enhancedPlayerPokemon = playerPokemon 
                    ? enhancePokemon(playerPokemon, allSessionPokemon)
                    : null;
                  
                  return (
                    <Box
                      key={player.id}
                      style={{ textAlign: 'center', minWidth: '60px' }}
                    >
                      <Stack gap={4} align="center">
                        <Text
                          size="xs"
                          fw={500}
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '60px',
                          }}
                        >
                          {player.username}
                        </Text>
                        <Box
                          className={`${styles.pokemonBox} ${!enhancedPlayerPokemon ? styles.empty : ''}`}
                          style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: enhancedPlayerPokemon?.isDead
                              ? '2px solid var(--mantine-color-red-6)'
                              : enhancedPlayerPokemon?.inTeam &&
                                  !enhancedPlayerPokemon?.validTeamLink &&
                                  enhancedPlayerPokemon?.linkGroup
                                ? '2px solid var(--mantine-color-orange-6)'
                                : !enhancedPlayerPokemon?.isLinked
                                  ? '2px solid var(--mantine-color-yellow-6)'
                                  : enhancedPlayerPokemon?.isLinked
                                    ? '2px solid var(--mantine-color-green-6)'
                                    : '1px solid var(--mantine-color-gray-4)',
                          }}
                        >
                          {enhancedPlayerPokemon ? (
                            <Image
                              src={enhancedPlayerPokemon.image}
                              alt={enhancedPlayerPokemon.name}
                              width={40}
                              height={40}
                              fit="contain"
                            />
                          ) : (
                            <Text size="xs" c="dimmed">
                              ?
                            </Text>
                          )}
                        </Box>
                        <Text
                          size="xs"
                          c="dimmed"
                          style={{
                            whiteSpace: 'nowrap',
                            minHeight: '1.2em',
                          }}
                        >
                          {enhancedPlayerPokemon
                            ? enhancedPlayerPokemon.inBox
                              ? 'Box'
                              : 'Team'
                            : ' '}
                        </Text>
                      </Stack>
                    </Box>
                  );
                })}
              </Group>
            ) : (
              <Text size="xs" c="dimmed">
                No other players in this session
              </Text>
            )}
          </Box>
        )}
        <Divider />
        <Box>
          {enhancedPokemon.linkGroup ? (
            <Stack gap="xs">
              <Group gap="xs">
                <Text size="xs" fw={500}>
                  Link status:
                </Text>
                {enhancedPokemon.isLinked ? (
                  <Text size="xs" c="green">
                    ✓ Valid link ({linkedOtherPlayerCount}/{totalOtherPlayers}{' '}
                    players linked)
                  </Text>
                ) : (
                  <Text size="xs" c="yellow">
                    ⏳ Waiting for players ({linkedOtherPlayerCount}/
                    {totalOtherPlayers} players linked)
                  </Text>
                )}
              </Group>
            </Stack>
          ) : null}
        </Box>
      </Stack>
    </Box>
  );
}; 