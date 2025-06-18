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
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [isViewer, setIsViewer] = useState(false);
  const [loading, setLoading] = useState(true);

  const reloadUser = () => {
    setLoading(true);
    const storedUsername = localStorage.getItem('username') || '';
    const storedUserId = localStorage.getItem('playerUuid') || '';
    const storedViewer = localStorage.getItem('isViewer') === 'true';
    setUsername(storedUsername);
    setUserId(storedUserId);
    setIsViewer(storedViewer);
    setLoading(false);
  };

  useEffect(() => {
    reloadUser();
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
