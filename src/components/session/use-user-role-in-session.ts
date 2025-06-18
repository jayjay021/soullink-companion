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

  if (loading || !sessionPlayers) {
    return { isPlayer: false, playerId: null, isLoading: true };
  }

  const player = sessionPlayers.find((p) => p.id === userId);

  return {
    isPlayer: !!player,
    playerId: player?.id || null,
    isLoading: false,
  };
};
