import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useCreateUser, useUpdateUser } from '../hooks/useApi';
import type { components } from '@repo/api-spec/types';

type User = components['schemas']['User'];

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  createUser: (username: string) => Promise<void>;
  updateUser: (username: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'soullink-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error('Error loading user from localStorage:', err);
      // Clear invalid data
      localStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = async (username: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const result = await createUserMutation.mutateAsync({ username });
      const newUser = result.user;

      // Store in localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (username: string) => {
    if (!user) {
      throw new Error('No user to update');
    }

    try {
      setError(null);
      setIsLoading(true);

      const result = await updateUserMutation.mutateAsync({
        userId: user.id,
        data: { username },
      });
      const updatedUser = result.user;

      // Update localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    createUser,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 