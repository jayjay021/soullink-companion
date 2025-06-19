import { z } from 'zod';

export const CreateSessionRequestSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  playerUuid: z.string().min(1),
});
export type CreateSessionRequest = z.infer<typeof CreateSessionRequestSchema>;

export const JoinSessionRequestSchema = z.object({
  sessionId: z.string().min(1),
  username: z.string().min(1),
  playerUuid: z.string().min(1),
});
export type JoinSessionRequest = z.infer<typeof JoinSessionRequestSchema>;

export const CreatePokemonRequestSchema = z.object({
  name: z.string().min(1),
  route: z.string().min(1),
  playerId: z.string().min(1),
  image: z.string().min(1),
  inBox: z.boolean().optional().default(true),
  position: z.number().optional().default(0),
  inTeam: z.boolean().optional().default(false),
});
export type CreatePokemonRequest = z.infer<typeof CreatePokemonRequestSchema>;

export const UpdatePokemonStatusSchema = z.object({
  pokemonId: z.string().min(1),
  isDead: z.boolean().optional(),
  inBox: z.boolean().optional(),
  inTeam: z.boolean().optional(),
});
export type UpdatePokemonStatusRequest = z.infer<
  typeof UpdatePokemonStatusSchema
>;

export interface Pokemon {
  id: string;
  name: string;
  image: string;
  route: string;
  isDead: boolean;
  isLinked: boolean;
  inBox: boolean;
  position: number;
  playerId: string;
  sessionId: string;
  linkGroup?: string | null;
  inTeam: boolean;
  validTeamLink: boolean;
}

export type PokemonListResponse = Pokemon[];
export type RouteListResponse = string[];

export interface Session {
  id: string;
  name: string;
  players: { id: string; username: string }[];
}
export type SessionResponse = Session;

// Error response types
export interface ApiError {
  error: string;
  details?: unknown;
}

export interface ValidationError extends ApiError {
  error: string;
  field?: string;
}
