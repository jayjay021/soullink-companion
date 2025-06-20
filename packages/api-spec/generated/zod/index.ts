import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const HealthResponse = z
  .object({
    status: z.enum(["ok", "error"]),
    timestamp: z.string().datetime({ offset: true }),
    uptime: z.number(),
    version: z.string().optional(),
  })
  .passthrough();
const Error = z
  .object({
    success: z.literal(false),
    error: z
      .object({
        message: z.string(),
        code: z.string().optional(),
        details: z.object({}).partial().passthrough().optional(),
      })
      .passthrough(),
  })
  .passthrough();
const SessionStatus = z.enum(["WAITING", "STARTED", "FINISHED"]);
const SessionListItem = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    status: SessionStatus,
  })
  .passthrough();
const SessionsResponse = z
  .object({ sessions: z.array(SessionListItem) })
  .passthrough();
const createSession_Body = z
  .object({ name: z.string(), description: z.string() })
  .passthrough();
const Player = z.object({ id: z.string(), name: z.string() }).passthrough();
const Session = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    createdAt: z.string().datetime({ offset: true }),
    status: SessionStatus,
    players: z.array(Player),
  })
  .passthrough();
const updateSession_Body = z
  .object({ name: z.string(), description: z.string(), status: SessionStatus })
  .partial()
  .passthrough();
const joinSession_Body = z.object({ player: Player }).passthrough();
const PokedexPokemonName = z
  .object({ english: z.string(), japanese: z.string(), german: z.string() })
  .passthrough();
const PokedexPokemonStats = z
  .object({
    HP: z.number().int().gte(1),
    Attack: z.number().int().gte(1),
    Defense: z.number().int().gte(1),
    "Sp. Attack": z.number().int().gte(1),
    "Sp. Defense": z.number().int().gte(1),
    Speed: z.number().int().gte(1),
  })
  .passthrough();
const PokedexPokemonEvolution = z
  .object({
    prev: z.array(z.string()).min(2).max(2),
    next: z.array(z.array(z.string()).min(2).max(2)),
  })
  .partial()
  .passthrough();
const PokedexPokemonProfile = z
  .object({
    height: z.string(),
    weight: z.string(),
    egg: z.array(z.string()),
    ability: z.array(z.array(z.string()).min(2).max(2)),
    gender: z.string(),
  })
  .passthrough();
const PokedexPokemonImage = z
  .object({
    sprite: z.string().url(),
    thumbnail: z.string().url().optional(),
    hires: z.string().url().optional(),
  })
  .passthrough();
const PokedexPokemon = z
  .object({
    id: z.number().int().gte(1).lte(1025),
    name: PokedexPokemonName,
    type: z.array(z.string()).min(1).max(2),
    base: PokedexPokemonStats,
    species: z.string(),
    description: z.string(),
    evolution: PokedexPokemonEvolution.optional(),
    profile: PokedexPokemonProfile,
    image: PokedexPokemonImage,
  })
  .passthrough();
const PokedexPokemonResponse = z
  .object({ pokemon: z.array(PokedexPokemon) })
  .passthrough();
const PokemonStatus = z.enum(["CAUGHT", "FAINTED", "IN_BATTLE", "RUNNING"]);
const AddPokemonRequest = z
  .object({
    playerId: z.string(),
    pokemonId: z.string(),
    status: PokemonStatus,
    routeName: z.string(),
  })
  .passthrough();
const Pokemon = z
  .object({
    id: z.string(),
    playerId: z.string(),
    sessionId: z.string(),
    pokemonId: z.string(),
    status: PokemonStatus,
    routeName: z.string(),
  })
  .passthrough();
const PokemonListResponse = z
  .object({ pokemon: z.array(Pokemon) })
  .passthrough();
const UpdatePokemonRequest = z
  .object({ status: PokemonStatus, routeName: z.string() })
  .partial()
  .passthrough();
const RouteListResponse = z
  .object({ routes: z.array(z.string()) })
  .passthrough();

export const schemas = {
  HealthResponse,
  Error,
  SessionStatus,
  SessionListItem,
  SessionsResponse,
  createSession_Body,
  Player,
  Session,
  updateSession_Body,
  joinSession_Body,
  PokedexPokemonName,
  PokedexPokemonStats,
  PokedexPokemonEvolution,
  PokedexPokemonProfile,
  PokedexPokemonImage,
  PokedexPokemon,
  PokedexPokemonResponse,
  PokemonStatus,
  AddPokemonRequest,
  Pokemon,
  PokemonListResponse,
  UpdatePokemonRequest,
  RouteListResponse,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/health",
    alias: "getHealth",
    description: `Returns the health status of the API`,
    requestFormat: "json",
    response: HealthResponse,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/pokedex/pokemon",
    alias: "getPokedexPokemon",
    description: `Returns a list of Pokémon from the Pokédex with optional filters`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Query",
        schema: z.number().int().gte(1).lte(1025).optional(),
      },
      {
        name: "name",
        type: "Query",
        schema: z.string().min(1).optional(),
      },
    ],
    response: PokedexPokemonResponse,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/pokemon/:sessionId",
    alias: "addPokemon",
    description: `Add a Pokémon for a player in a session`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: AddPokemonRequest,
      },
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Pokemon,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/pokemon/:sessionId",
    alias: "listPokemon",
    description: `List or filter Pokémon for a session/player`,
    requestFormat: "json",
    parameters: [
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "playerId",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "routeName",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "status",
        type: "Query",
        schema: z
          .enum(["CAUGHT", "FAINTED", "IN_BATTLE", "RUNNING"])
          .optional(),
      },
    ],
    response: PokemonListResponse,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "patch",
    path: "/pokemon/:sessionId/:pokemonId",
    alias: "updatePokemon",
    description: `Update a Pokémon’s status, location, or properties`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdatePokemonRequest,
      },
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "pokemonId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Pokemon,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/pokemon/:sessionId/routes",
    alias: "getPokemonRoutes",
    description: `Get unique routes for a session/player`,
    requestFormat: "json",
    parameters: [
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "playerId",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: RouteListResponse,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/session",
    alias: "listSessions",
    description: `Returns a list of all sessions`,
    requestFormat: "json",
    response: SessionsResponse,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/session",
    alias: "createSession",
    description: `Creates a new session`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: createSession_Body,
      },
    ],
    response: Session,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
  {
    method: "get",
    path: "/session/:sessionId",
    alias: "getSession",
    description: `Returns a session by its ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Session,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
  {
    method: "put",
    path: "/session/:sessionId",
    alias: "updateSession",
    description: `Update session name, description, or status`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: updateSession_Body,
      },
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Session,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
  {
    method: "delete",
    path: "/session/:sessionId",
    alias: "deleteSession",
    description: `Deletes a session by its ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
  {
    method: "post",
    path: "/session/:sessionId/join",
    alias: "joinSession",
    description: `Join a session as a player`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: joinSession_Body,
      },
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Session,
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: Error,
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: Error,
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: Error,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
