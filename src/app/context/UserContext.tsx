'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
  userId: string;
  setUserId: (id: string) => void;
  isViewer: boolean;
  setIsViewer: (v: boolean) => void;
  reloadUser: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsernameState] = useState('');
  const [userId, setUserIdState] = useState('');
  const [isViewer, setIsViewerState] = useState(false);
  const [loading, setLoading] = useState(true);

  // Wrapper functions that sync with localStorage
  const setUsername = (name: string) => {
    setUsernameState(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem('username', name);
    }
  };

  const setUserId = (id: string) => {
    setUserIdState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('playerUuid', id);
    }
  };

  const setIsViewer = (viewer: boolean) => {
    setIsViewerState(viewer);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isViewer', String(viewer));
    }
  };

  const reloadUser = () => {
    setLoading(true);

    // Ensure we're on the client side
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    const storedUsername = localStorage.getItem('username') || '';
    const storedUserId = localStorage.getItem('playerUuid') || '';
    const storedViewer = localStorage.getItem('isViewer') === 'true';

    setUsernameState(storedUsername);
    setUserIdState(storedUserId);
    setIsViewerState(storedViewer);
    setLoading(false);
  };

  useEffect(() => {
    // Ensure we're on the client side before accessing localStorage
    if (typeof window !== 'undefined') {
      reloadUser();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        userId,
        setUserId,
        isViewer,
        setIsViewer,
        reloadUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
