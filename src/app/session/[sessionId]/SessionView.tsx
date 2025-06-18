'use client';
import { useQuery } from '@tanstack/react-query';
import { PlayerSessionView } from './PlayerSessionView';
import { ViewerSessionView } from './ViewerSessionView';
import { useUserRoleInSession } from '@/components';
import { useUser } from '@/app/context/UserContext';
import type { SessionData } from '@/types';

interface SessionViewProps {
  sessionId: string;
}

export const SessionView: React.FC<SessionViewProps> = ({ sessionId }) => {
  const { userId, isViewer } = useUser();

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

  // Show loading while either session or user role is loading
  if (loadingSession || loadingUserRole) return <div>Loading...</div>;
  if (errorSession || !session) return <div>Session not found.</div>;

  // If user is marked as viewer, always show viewer view
  if (isViewer) {
    return <ViewerSessionView sessionId={sessionId} />;
  }

  // If user has a userId but is not a player in this session, show viewer view
  // This handles the case where user has a playerUuid from another session
  if (userId && !isPlayer) {
    return <ViewerSessionView sessionId={sessionId} />;
  }

  // If user is a player in this session, show player view
  if (isPlayer) {
    return <PlayerSessionView sessionId={sessionId} />;
  }

  // Default fallback - show viewer view
  return <ViewerSessionView sessionId={sessionId} />;
};
