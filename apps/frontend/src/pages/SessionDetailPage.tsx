import { useParams, Navigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Card,
  Stack,
  Loader,
  Grid,
} from '@mantine/core';
import { useGetSessionQuery } from '../lib/api-client/generated.api';
import { SessionHeader, PlayerInfo } from '../components/session';
import { PokemonManager } from '../components/pokemon/manager/pokemon-manager';
import { useListPokemonQuery } from '../lib/api-client/generated.api';
import { useAuth } from '../contexts/AuthContext';
import { enhancePokemon } from '../components/pokemon/manager/pokemon-utils';

export function SessionDetailPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { user } = useAuth();
  const playerId = user?.id;

  if (!sessionId) {
    return <Navigate to='/sessions' replace />;
  }

  const { data: session, isLoading, error } = useGetSessionQuery({ sessionId });
  const { data: pokemonData = { pokemon: [] }, refetch } = useListPokemonQuery(
    { sessionId, userId: playerId },
    { skip: !playerId, refetchOnMountOrArgChange: true }
  );

  if (isLoading) {
    return (
      <Container size='lg'>
        <Stack gap='lg' align='center' py='xl'>
          <Loader size='lg' />
          <Text>Loading session...</Text>
        </Stack>
      </Container>
    );
  }

  if (error || !session) {
    return (
      <Container size='lg'>
        <Card withBorder p='xl'>
          <Stack gap='md'>
            <Title order={1} c='red'>
              Session Not Found
            </Title>
            <Text>
              The session you're looking for doesn't exist or you don't have
              access to it.
            </Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  const team = pokemonData.pokemon
    .filter((p) => p.location === 'TEAM')
    .map((p) => enhancePokemon(p, pokemonData.pokemon));
  const box = pokemonData.pokemon
    .filter((p) => p.location === 'BOX')
    .map((p) => enhancePokemon(p, pokemonData.pokemon));

  return (
    <Container size='lg'>
      <Stack gap='lg'>
        {/* Session Header with title, details, and status button */}
        <SessionHeader session={session} />

        {/* Main content area using horizontal layout */}
        <Grid gutter='lg'>
          {/* Left column - Pokemon manager */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <PokemonManager
              team={team}
              box={box}
              sessionId={session.id}
              playerId={playerId || ''}
              onPokemonUpdate={refetch}
              sessionPlayers={session.users}
              allSessionPokemon={pokemonData.pokemon.map((p) =>
                enhancePokemon(p, pokemonData.pokemon)
              )}
              sessionStatus={session.status}
            />
          </Grid.Col>

          {/* Right column - Player info and session info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap='lg'>
              <PlayerInfo users={session.users} />

              <Card withBorder p='xl'>
                <Stack gap='md'>
                  <Title order={3} size='h4'>
                    Session Info
                  </Title>
                  <Stack gap='xs'>
                    <Text size='sm'>
                      <strong>Type:</strong> Standard Session
                    </Text>
                    <Text size='sm'>
                      <strong>Rules:</strong> Standard Pokemon rules
                    </Text>
                    <Text size='sm'>
                      <strong>Max Players:</strong> 8
                    </Text>
                  </Stack>
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
