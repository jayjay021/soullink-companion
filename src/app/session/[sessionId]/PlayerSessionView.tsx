'use client';
import { Stack, Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { SessionHeader, PokemonManager } from '@/components';
import { useUser } from '@/app/context/UserContext';
import type { SessionData, PokemonData } from '@/types';

interface PlayerSessionViewProps {
  sessionId: string;
}

export const PlayerSessionView: React.FC<PlayerSessionViewProps> = ({
  sessionId,
}) => {
  const { userId } = useUser();

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

  // Fetch pokemons for this session and current player
  const {
    data: pokemons,
    isLoading: loadingPokemons,
    error: errorPokemons,
    refetch: refetchPokemons,
  } = useQuery<PokemonData[]>({
    queryKey: ['pokemons', sessionId, userId],
    queryFn: async () => {
      // Filter by player ID to only fetch this player's Pokémon
      const url = `/api/pokemon/${sessionId}?player=${userId}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Pokémon not found');

      const data = await res.json();
      return data;
    },
    // Only run this query if we have a valid userId
    enabled: !!userId,
  });

  // Fetch ALL pokemons for this session (for tooltip links)
  const {
    data: allSessionPokemon,
    isLoading: loadingAllPokemon,
    error: errorAllPokemon,
  } = useQuery<PokemonData[]>({
    queryKey: ['allPokemons', sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/pokemon/${sessionId}`);
      if (!res.ok) throw new Error('All Pokemon not found');
      return res.json();
    },
  });

  if (loadingSession || loadingPokemons || loadingAllPokemon)
    return <div>Loading...</div>;
  if (errorSession || !session) return <div>Session not found.</div>;
  if (errorPokemons || !pokemons) return <div>Failed to load Pokémon.</div>;
  if (errorAllPokemon || !allSessionPokemon)
    return <div>Failed to load session Pokemon.</div>;

  const team = pokemons.filter((p) => !p.inBox);
  const box = pokemons.filter((p) => p.inBox);

  const handlePokemonUpdate = () => {
    refetchPokemons();
  };

  return (
    <Box m={50}>
      <Stack gap="lg">
        <SessionHeader session={session} />
        <PokemonManager
          team={team}
          box={box}
          sessionId={sessionId}
          playerId={userId}
          onPokemonUpdate={handlePokemonUpdate}
          sessionPlayers={session.players}
          allSessionPokemon={allSessionPokemon}
        />
      </Stack>
    </Box>
  );
};
