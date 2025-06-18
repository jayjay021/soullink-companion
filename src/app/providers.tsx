'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Notifications } from '@mantine/notifications';
import { getQueryClient } from '@/app/get-query-client';
import { UserProvider } from '@/app/context/UserContext';
import type * as React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Notifications />
        {children}
        <ReactQueryDevtools />
      </UserProvider>
    </QueryClientProvider>
  );
}
