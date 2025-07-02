import { Outlet } from 'react-router-dom';
import { AppShell, Text, Group, Button } from '@mantine/core';
import { Navigation } from './Navigation';
import { useAuth } from '../contexts/AuthContext';

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text size="lg" fw={700}>
            SoulLink Companion
          </Text>
          {user && (
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Welcome, {user.username}!
              </Text>
              <Button variant="subtle" size="xs" onClick={logout}>
                Logout
              </Button>
            </Group>
          )}
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Navigation />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
} 