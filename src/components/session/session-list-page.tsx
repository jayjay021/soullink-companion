'use client';
import { useState } from 'react';
import { Stack, Center } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/app/get-query-client';
import {
  CreateSessionModal,
  UserSetupModal,
  SessionListHeader,
  SessionList,
} from '@/components';
import type { SessionData } from '@/types';

export function SessionListPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const queryClient = getQueryClient();

  // Fetch sessions using TanStack Query
  const { data: sessions = [], refetch } = useQuery({
    queryKey: ['sessions'],
    queryFn: async (): Promise<SessionData[]> => {
      const res = await fetch('/api/session');
      if (!res.ok) throw new Error('Failed to fetch sessions');
      return res.json();
    },
    staleTime: 60 * 1000,
  });

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    refetch(); // Refetch sessions after dialog closes
  };

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Center>
          <Stack w={500} p="xl">
            <SessionListHeader onAddClick={handleOpenAddDialog} />
            <SessionList sessions={sessions} />
          </Stack>
          <CreateSessionModal
            opened={addDialogOpen}
            onClose={handleCloseAddDialog}
          />
          <UserSetupModal />
        </Center>
      </HydrationBoundary>
    </main>
  );
}
