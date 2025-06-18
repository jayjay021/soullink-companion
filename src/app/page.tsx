'use client';
import { useState } from 'react';
import { Button, Title, Stack, Center, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { CreateSessionModal, SessionCard, UserSetupModal } from '@/components';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/app/get-query-client';
import { UserProvider } from './context/UserContext';

function PageContent() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const queryClient = getQueryClient();

  // Fetch sessions using TanStack Query
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const res = await fetch('/api/session');
      if (!res.ok) throw new Error('Failed to fetch sessions');
      return res.json();
    },
    staleTime: 60 * 1000,
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Center>
          <Stack w={500} p="xl">
            <Group justify="space-between">
              <Title order={1}>Sessions</Title>
              <Button onClick={() => setAddDialogOpen(true)}>Add</Button>
            </Group>
            <Stack>
              {sessions.map(
                (session: {
                  id: string;
                  name: string;
                  players: { username: string }[];
                }) => (
                  <SessionCard key={session.id} session={session} />
                )
              )}
            </Stack>
          </Stack>
          <CreateSessionModal
            opened={addDialogOpen}
            onClose={() => {
              setAddDialogOpen(false);
              refetch(); // Refetch sessions after dialog closes
            }}
          />
          <UserSetupModal />
        </Center>
      </HydrationBoundary>
    </main>
  );
}

export default function Page() {
  return (
    <UserProvider>
      <PageContent />
    </UserProvider>
  );
}
