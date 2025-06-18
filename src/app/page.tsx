'use client';
import { SessionListPage } from '@/components';
import { UserProvider } from './context/UserContext';

export default function Page() {
  return (
    <UserProvider>
      <SessionListPage />
    </UserProvider>
  );
}
