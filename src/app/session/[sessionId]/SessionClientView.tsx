'use client';
import { Card, Title, Text, Stack, Box, Group } from '@mantine/core';
import PlayerView from '../../components/PlayerView';
import AddPokemonDialog from '@/app/components/AddPokemonDialog';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
  } = useQuery({
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
  } = useQuery({
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
  } = useQuery({
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
      const player = session.players.find((p: any) => p.id === uuid);
      if (player) playerId = player.id;
    }
  }

  const team = pokemons.filter((p: any) => !p.inBox);
  const box = pokemons.filter((p: any) => p.inBox);

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
      <Stack gap='lg'>
        <Card>
          <Title order={2}>{session.name}</Title>
          <Text>ID: {session.id}</Text>
          <Text>
            Players: {session.players.map((p: any) => p.username).join(', ')}
          </Text>
        </Card>
        <Card variant='outline' p='md'>
          <Group justify='space-between' align='center' mb='md'>
            <Title order={3}>Pokemon</Title>
          </Group>
          <Text>
            Manage your Pokémon by dragging and dropping or clicking empty
            slots.
          </Text>
          <PlayerView
            team={team}
            box={box}
            sessionId={sessionId}
            onPokemonUpdate={handlePokemonUpdate}
            onAddPokemon={handleAddPokemon}
          />{' '}
          <AddPokemonDialog
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
