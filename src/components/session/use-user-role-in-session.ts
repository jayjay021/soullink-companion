import { useUser } from '@/app/context/UserContext';

interface Player {
  id: string;
  username: string;
}

interface UseUserRoleInSessionParams {
  sessionPlayers?: Player[];
}

interface UseUserRoleInSessionReturn {
  isPlayer: boolean;
  playerId: string | null;
  isLoading: boolean;
}

export const useUserRoleInSession = ({
  sessionPlayers,
}: UseUserRoleInSessionParams): UseUserRoleInSessionReturn => {
  const { userId, loading } = useUser();

  // Show loading state when UserContext is loading OR when session players not available
  if (loading || !sessionPlayers) {
    return { isPlayer: false, playerId: null, isLoading: true };
  }

  // Ensure userId is available before determining player status
  if (!userId) {
    return { isPlayer: false, playerId: null, isLoading: false };
  }

  const player = sessionPlayers.find((p) => p.id === userId);

  return {
    isPlayer: !!player,
    playerId: player?.id || null,
    isLoading: false,
  };
};
