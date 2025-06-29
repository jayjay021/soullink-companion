import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import { router } from './router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { UserSetupWrapper } from './components/UserSetupWrapper';
import './index.css';
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <MantineProvider theme={theme}>
            <AuthProvider>
              <UserSetupWrapper>
                <RouterProvider router={router} />
              </UserSetupWrapper>
            </AuthProvider>
          </MantineProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  throw new Error('Could not find root element');
}
