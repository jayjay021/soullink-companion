export interface SessionData {
  id: string;
  name: string;
  players: { id: string; username: string }[];
}

export interface PokemonData {
  id: string;
  name: string;
  image: string;
  route: string;
  isDead: boolean;
  isLinked: boolean;
  position: number;
  inBox: boolean;
  linkGroup?: string | null;
  inTeam: boolean;
  validTeamLink: boolean;
  playerId: string;
  sessionId: string;
}
