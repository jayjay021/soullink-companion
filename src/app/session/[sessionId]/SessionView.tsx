'use client';
import { useQuery } from '@tanstack/react-query';
import { PlayerSessionView } from './PlayerSessionView';
import { ViewerSessionView } from './ViewerSessionView';
import { useUserRoleInSession } from '@/components';
import type { SessionData } from '@/types';

interface SessionViewProps {
  sessionId: string;
}

export const SessionView: React.FC<SessionViewProps> = ({ sessionId }) => {
  // First fetch session data to determine user role
  const {
    data: session,
    isLoading: loadingSession,
    error: errorSession,
  } = useQuery<SessionData>({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      const res = await fetch(`/api/session/${sessionId}`);
      if (!res.ok) throw new Error('Session not found');
      return res.json();
    },
  });

  const { isPlayer, isLoading: loadingUserRole } = useUserRoleInSession({
    sessionPlayers: session?.players,
  });

  if (loadingSession || loadingUserRole) return <div>Loading...</div>;
  if (errorSession || !session) return <div>Session not found.</div>;

  // Render appropriate view based on user role
  if (isPlayer) {
    return <PlayerSessionView sessionId={sessionId} />;
  } else {
    return <ViewerSessionView sessionId={sessionId} />;
  }
};
