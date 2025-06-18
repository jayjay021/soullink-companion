'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Title, Stack, Center, Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import AddSessionDialog from './components/session/dialog/AddSessionDialog';
import UsernameDialog from './components/dialog/UsernameDialog';
import SessionCard from './components/session/SessionCard';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/app/get-query-client';
import { UserProvider, useUser } from './context/UserContext';

function PageContent() {
  const { isViewer } = useUser();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const router = useRouter();
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
          <Stack w={500} p='xl'>
            <Group justify='space-between'>
              <Title order={1}>Sessions</Title>
              <Button onClick={() => setAddDialogOpen(true)}>Add</Button>
            </Group>
            <Stack>
              {sessions.map((session: any) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </Stack>
          </Stack>
          <AddSessionDialog
            opened={addDialogOpen}
            onClose={() => {
              setAddDialogOpen(false);
              refetch(); // Refetch sessions after dialog closes
            }}
          />
          <UsernameDialog />
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
