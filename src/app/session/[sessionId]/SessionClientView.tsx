'use client';
import { Card, Title, Text, Stack, Box, Group } from '@mantine/core';
import { PlayerDashboard, AddPokemonModal } from '@/components';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface SessionData {
  id: string;
  name: string;
  players: { id: string; username: string }[];
}

interface PokemonData {
  id: string;
  name: string;
  image: string;
  route: string;
  isDead: boolean;
  isLinked: boolean;
  position: number;
  inBox: boolean;
}

interface SessionClientViewProps {
  sessionId: string;
}

const SessionClientView: React.FC<SessionClientViewProps> = ({ sessionId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogInBox, setDialogInBox] = useState(true);
  const [dialogPosition, setDialogPosition] = useState<number>(0);

  // Fetch session info
  const {
    data: session,
    isLoading: loadingSession,
    error: errorSession,
  } = useQuery<SessionData>({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/session/${sessionId}`);
      if (!res.ok) throw new Error('Session not found');
      return res.json();
    },
  });

  // Fetch pokemons for this session
  const {
    data: pokemons,
    isLoading: loadingPokemons,
    error: errorPokemons,
    refetch: refetchPokemons,
  } = useQuery<PokemonData[]>({
    queryKey: ['pokemons', sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/pokemon/${sessionId}`);
      if (!res.ok) throw new Error('Pokémon not found');
      return res.json();
    },
  });

  // Fetch used routes for this session
  const {
    data: usedRoutes,
    isLoading: loadingRoutes,
    error: errorRoutes,
  } = useQuery<string[]>({
    queryKey: ['routes', sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/pokemon/${sessionId}/routes`);
      if (!res.ok) throw new Error('Routes not found');
      return res.json();
    },
  });

  if (loadingSession || loadingPokemons || loadingRoutes)
    return <div>Loading...</div>;
  if (errorSession || !session) return <div>Session not found.</div>;
  if (errorPokemons || !pokemons) return <div>Failed to load Pokémon.</div>;
  if (errorRoutes || !usedRoutes) return <div>Failed to load routes.</div>;

  // Get playerUuid from localStorage and find the playerId in the session
  let playerId = '';
  if (typeof window !== 'undefined') {
    const uuid = localStorage.getItem('playerUuid');
    if (uuid && session?.players) {
      const player = session.players.find((p) => p.id === uuid);
      if (player) playerId = player.id;
    }
  }

  const team = pokemons.filter((p) => !p.inBox);
  const box = pokemons.filter((p) => p.inBox);

  const handlePokemonUpdate = () => {
    refetchPokemons();
  };

  const handleAddPokemon = (inBox: boolean, position?: number) => {
    setDialogInBox(inBox);
    setDialogPosition(position ?? 0);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box m={50}>
      <Stack gap="lg">
        <Card>
          <Title order={2}>{session.name}</Title>
          <Text>ID: {session.id}</Text>
          <Text>
            Players: {session.players.map((p) => p.username).join(', ')}
          </Text>
        </Card>
        <Card variant="outline" p="md">
          <Group justify="space-between" align="center" mb="md">
            <Title order={3}>Pokemon</Title>
          </Group>
          <Text>
            Manage your Pokémon by dragging and dropping or clicking empty
            slots.
          </Text>
          <PlayerDashboard
            team={team}
            box={box}
            sessionId={sessionId}
            onPokemonUpdate={handlePokemonUpdate}
            onAddPokemon={handleAddPokemon}
          />{' '}
          <AddPokemonModal
            sessionId={sessionId}
            playerId={playerId}
            opened={dialogOpen}
            onClose={handleCloseDialog}
            defaultInBox={dialogInBox}
            position={dialogPosition}
          />
        </Card>
      </Stack>
    </Box>
  );
};

export default SessionClientView;
