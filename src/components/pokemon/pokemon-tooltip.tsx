import React from 'react';
import { Stack, Group, Text, Box, Divider, Image } from '@mantine/core';
import { useUser } from '@/app/context/UserContext';
import styles from './pokemon-grid.module.css';

export interface Pokemon {
  id: string;
  name: string;
  image: string;
  route: string;
  isDead: boolean;
  isLinked: boolean;
  position: number;
  linkGroup?: string | null;
  inTeam: boolean;
  inBox: boolean;
  validTeamLink: boolean;
  playerId: string;
  sessionId: string;
}

interface SessionPlayer {
  id: string;
  username: string;
}

interface PokemonTooltipProps {
  pokemon: Pokemon;
  sessionPlayers: SessionPlayer[];
  allSessionPokemon: Pokemon[];
}

export const PokemonTooltip: React.FC<PokemonTooltipProps> = ({
  pokemon,
  sessionPlayers,
  allSessionPokemon,
}) => {
  const { userId } = useUser();

  // Get linked Pokemon for this route
  const linkedPokemon = allSessionPokemon.filter(
    (p) => p.linkGroup === pokemon.linkGroup && p.linkGroup
  );

  // Create a map of player ID to their Pokemon on this route
  const playerPokemonMap = new Map();
  linkedPokemon.forEach((p) => {
    if (!playerPokemonMap.has(p.playerId)) {
      playerPokemonMap.set(p.playerId, p);
    }
  });

  // Filter out current user from the display (improvement #1)
  const otherPlayers = sessionPlayers.filter((player) => player.id !== userId);

  // Count how many players have linked Pokemon
  const linkedPlayerCount = linkedPokemon.length;
  const totalPlayers = sessionPlayers.length;

  return (
    <Box style={{ maxWidth: '400px' }}>
      <Stack gap="sm">
        {/* Header */}
        <Box>
          <Group justify="space-between" align="flex-start">
            <Text fw={600} size="sm">
              {pokemon.name}
            </Text>
            <Text size="xs" c="dimmed">
              {pokemon.inBox ? 'Box' : 'Team'}
            </Text>
          </Group>

          {/* Route */}
          <Text size="xs" c="dimmed">
            {pokemon.route}
          </Text>

          {/* Death status */}
          {pokemon.isDead && (
            <Text size="xs" c="red">
              💀 Dead
            </Text>
          )}
        </Box>

        {/* Separator */}
        <Divider />

        {/* Linked Pokemon Grid */}
        {pokemon.linkGroup && (
          <Box>
            <Text size="sm" fw={500} mb="xs">
              Linked Pokemon (Other Players)
            </Text>
            {otherPlayers.length > 0 ? (
              <Group gap="xs" wrap="nowrap">
                {otherPlayers.map((player) => {
                  const playerPokemon = playerPokemonMap.get(player.id);
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
                          className={`${styles.pokemonBox} ${!playerPokemon ? styles.empty : ''}`}
                          style={{
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: playerPokemon?.isDead
                              ? '2px solid var(--mantine-color-red-6)'
                              : playerPokemon?.inTeam &&
                                  !playerPokemon?.validTeamLink &&
                                  playerPokemon?.linkGroup
                                ? '2px solid var(--mantine-color-orange-6)'
                                : !playerPokemon?.isLinked
                                  ? '2px solid var(--mantine-color-yellow-6)'
                                  : playerPokemon?.isLinked
                                    ? '2px solid var(--mantine-color-green-6)'
                                    : '1px solid var(--mantine-color-gray-4)',
                          }}
                        >
                          {playerPokemon ? (
                            <Image
                              src={playerPokemon.image}
                              alt={playerPokemon.name}
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
                        {/* Always show a placeholder for consistent alignment (improvement #2) */}
                        <Text
                          size="xs"
                          c="dimmed"
                          style={{
                            whiteSpace: 'nowrap',
                            minHeight: '1.2em', // Ensure consistent height
                          }}
                        >
                          {playerPokemon
                            ? playerPokemon.inBox
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

        {/* Separator */}
        <Divider />

        {/* Link Information */}
        <Box>
          {pokemon.linkGroup ? (
            <Stack gap="xs">
              <Group gap="xs">
                <Text size="xs" fw={500}>
                  Link status:
                </Text>
                {pokemon.isLinked ? (
                  <Text size="xs" c="green">
                    ✓ Valid link ({linkedPlayerCount}/{totalPlayers - 1} players
                    linked)
                  </Text>
                ) : (
                  <Text size="xs" c="yellow">
                    ⏳ Waiting for players ({linkedPlayerCount}/
                    {totalPlayers - 1} players linked)
                  </Text>
                )}
              </Group>

              {/* Team link status */}
              {pokemon.inTeam && (
                <Group gap="xs">
                  <Text size="xs" fw={500}>
                    Team link status:
                  </Text>
                  <Text
                    size="xs"
                    c={pokemon.validTeamLink ? 'green' : 'orange'}
                  >
                    {pokemon.validTeamLink
                      ? '✓ Valid - All linked Pokemon in team'
                      : '⚠️ Invalid - Some linked Pokemon not in team'}
                  </Text>
                </Group>
              )}
            </Stack>
          ) : (
            <Group gap="xs">
              <Text size="xs" fw={500}>
                Link status:
              </Text>
              <Text size="xs" c="dimmed">
                No link information
              </Text>
            </Group>
          )}
        </Box>
      </Stack>
    </Box>
  );
};
