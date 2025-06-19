'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface RealtimeContextType {
  isConnected: boolean;
  joinSession: (sessionId: string) => void;
  leaveSession: (sessionId: string) => void;
}

const RealtimeContext = createContext<RealtimeContextType>({
  isConnected: false,
  joinSession: () => {},
  leaveSession: () => {},
});

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within RealtimeProvider');
  }
  return context;
};

interface RealtimeProviderProps {
  children: React.ReactNode;
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const currentSessionRef = useRef<string | null>(null);
  const queryClient = useQueryClient();

  const leaveSession = useCallback((sessionId: string) => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
    if (currentSessionRef.current === sessionId) {
      currentSessionRef.current = null;
    }
  }, []);

  const joinSession = useCallback(
    (sessionId: string) => {
      // Don't create a new connection if we're already connected to this session
      if (currentSessionRef.current === sessionId && eventSourceRef.current) {
        return;
      }

      // Leave previous session first
      if (currentSessionRef.current) {
        leaveSession(currentSessionRef.current);
      }

      // Create new EventSource for this session
      const newEventSource = new EventSource(
        `/api/session/${sessionId}/events`
      );

      newEventSource.onopen = () => {
        setIsConnected(true);
      };

      newEventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Handle different event types
          switch (data.type) {
            case 'pokemon-added':
            case 'pokemon-moved':
            case 'pokemon-died':
              // Invalidate Pokemon queries to trigger refetch
              queryClient.invalidateQueries({
                queryKey: ['pokemons', sessionId],
              });
              queryClient.invalidateQueries({
                queryKey: ['allPokemons', sessionId],
              });
              break;
            default:
            // Ignore unknown event types
          }
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      };

      newEventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        setIsConnected(false);
      };

      eventSourceRef.current = newEventSource;
      currentSessionRef.current = sessionId;
    },
    [queryClient, leaveSession]
  );

  // Cleanup on unmount - remove dependency on eventSource to prevent infinite loop
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []); // Empty dependency array - only run on mount/unmount

  return (
    <RealtimeContext.Provider
      value={{
        isConnected,
        joinSession,
        leaveSession,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
};
