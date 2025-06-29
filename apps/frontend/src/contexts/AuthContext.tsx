import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useCreateUserMutation, useUpdateUserMutation } from '../lib/api-client/generated.api';
import type { User } from '../lib/api-client/generated.api';

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

  const [createUserMutation] = useCreateUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();

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

      const result = await createUserMutation({ createUserRequest: { username } }).unwrap();
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

      const result = await updateUserMutation({
        userId: user.id,
        updateUserRequest: { username },
      }).unwrap();
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