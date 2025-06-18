'use client';
import { useEffect, useState } from 'react';

interface Player {
  id: string;
  username: string;
}

interface UseUserRoleParams {
  sessionPlayers?: Player[];
}

interface UseUserRoleReturn {
  isPlayer: boolean;
  playerId: string | null;
  isLoading: boolean;
}

export const useUserRole = ({
  sessionPlayers,
}: UseUserRoleParams): UseUserRoleReturn => {
  const [isPlayer, setIsPlayer] = useState(false);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionPlayers) {
      const uuid = localStorage.getItem('playerUuid');
      if (uuid) {
        const player = sessionPlayers.find((p) => p.id === uuid);
        if (player) {
          setIsPlayer(true);
          setPlayerId(player.id);
        } else {
          setIsPlayer(false);
          setPlayerId(null);
        }
      } else {
        setIsPlayer(false);
        setPlayerId(null);
      }
      setIsLoading(false);
    }
  }, [sessionPlayers]);

  return { isPlayer, playerId, isLoading };
};
