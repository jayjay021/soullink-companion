import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserSetupDialog } from './UserSetupDialog';

interface UserSetupWrapperProps {
  children: React.ReactNode;
}

export function UserSetupWrapper({ children }: UserSetupWrapperProps) {
  const { user, isLoading } = useAuth();

  // Show loading state while checking for user
  if (isLoading) {
    return null; // or a loading spinner
  }

  // Show user setup dialog if no user exists
  if (!user) {
    return <UserSetupDialog opened={true} onClose={() => {}} />;
  }

  // Show the actual app content if user exists
  return <>{children}</>;
} 