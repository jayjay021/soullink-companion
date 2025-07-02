import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/Layout';
import { Loader, Container, Stack } from '@mantine/core';

// Lazy load all page components
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const SessionsPage = lazy(() => import('./pages/SessionsPage').then(module => ({ default: module.SessionsPage })));
const SessionDetailPage = lazy(() => import('./pages/SessionDetailPage').then(module => ({ default: module.SessionDetailPage })));
const PokedexPage = lazy(() => import('./pages/PokedexPage').then(module => ({ default: module.PokedexPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({ default: module.SettingsPage })));

// Loading component for lazy-loaded pages
function PageLoader() {
  return (
    <Container size="lg">
      <Stack gap="lg" align="center" py="xl">
        <Loader size="lg" />
      </Stack>
    </Container>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: 'sessions',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SessionsPage />
          </Suspense>
        ),
      },
      {
        path: 'sessions/:sessionId',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SessionDetailPage />
          </Suspense>
        ),
      },
      {
        path: 'pokedex',
        element: (
          <Suspense fallback={<PageLoader />}>
            <PokedexPage />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<PageLoader />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
]); 