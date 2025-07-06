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
const CreateUserRequest = z.object({
  username: z.string(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});
const User = z.object({
  id: z.string(),
  username: z.string().min(2).max(50),
  createdAt: z.string().datetime({ offset: true }),
});
const CreateUserResponse = z.object({ user: User }).passthrough();
const GetUserResponse = z.object({ user: User }).passthrough();
const UpdateUserRequest = z
  .object({ username: z.string(), email: z.string().email() })
  .partial();
const SessionStatus = z.enum(["WAITING", "STARTED", "FINISHED"]);
const UserRef = z.object({
  id: z.string(),
  username: z.string().min(2).max(50),
});
const SessionListItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string().datetime({ offset: true }),
  status: SessionStatus,
  users: z.array(UserRef),
});
const SessionsResponse = z.object({ sessions: z.array(SessionListItem) });
const CreateSessionRequest = z.object({
  name: z.string(),
  description: z.string(),
});
const Session = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  createdAt: z.string().datetime({ offset: true }),
  status: SessionStatus,
  users: z.array(UserRef),
});
const UpdateSessionRequest = z
  .object({ name: z.string(), description: z.string(), status: SessionStatus })
  .partial();
const JoinSessionRequest = z.object({ userId: z.string() });
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
const PaginationInfo = z
  .object({
    total: z.number().int(),
    limit: z.number().int(),
    offset: z.number().int(),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  })
  .passthrough();
const PokedexPokemonResponse = z
  .object({ pokemon: z.array(PokedexPokemon), pagination: PaginationInfo })
  .passthrough();
const PokemonStatus = z.enum(["CAUGHT", "NOT_CAUGHT", "DEAD"]);
const PokemonLocation = z.enum(["TEAM", "BOX"]);
const CreatePokemonRequest = z.object({
  userId: z.string(),
  pokemonId: z.number(),
  status: PokemonStatus,
  routeName: z.string(),
  location: PokemonLocation,
  position: z.number().int(),
});
const Pokemon = z.object({
  id: z.string(),
  user: UserRef,
  sessionId: z.string(),
  pokemonId: z.number(),
  name: z.string(),
  image: z.string(),
  status: PokemonStatus,
  routeName: z.string(),
  location: PokemonLocation,
  position: z.number().int(),
});
const PokemonListResponse = z.object({ pokemon: z.array(Pokemon) });
const UpdatePokemonRequest = z.object({
  status: PokemonStatus,
  routeName: z.string(),
  location: PokemonLocation,
  position: z.number().int(),
});
const SwapPokemonRequest = z.object({
  pokemon1Id: z.string(),
  pokemon2Id: z.string(),
});
const SwapPokemonResponse = z.object({ pokemon1: Pokemon, pokemon2: Pokemon });
const RouteListResponse = z
  .object({ routes: z.array(z.string()) })
  .passthrough();
const LoginRequest = z.object({
  email: z.string().email(),
  password: z.string(),
});
const LoginResponse = z.object({ user: User, token: z.string() });
const RegisterResponse = z.object({ user: User, token: z.string() });
const PokedexStatus = z.enum(["SEEN", "CAUGHT"]);
const PokedexLocation = z.enum(["WILD", "CAUGHT"]);

export const schemas = {
  HealthResponse,
  Error,
  CreateUserRequest,
  User,
  CreateUserResponse,
  GetUserResponse,
  UpdateUserRequest,
  SessionStatus,
  UserRef,
  SessionListItem,
  SessionsResponse,
  CreateSessionRequest,
  Session,
  UpdateSessionRequest,
  JoinSessionRequest,
  PokedexPokemonName,
  PokedexPokemonStats,
  PokedexPokemonEvolution,
  PokedexPokemonProfile,
  PokedexPokemonImage,
  PokedexPokemon,
  PaginationInfo,
  PokedexPokemonResponse,
  PokemonStatus,
  PokemonLocation,
  CreatePokemonRequest,
  Pokemon,
  PokemonListResponse,
  UpdatePokemonRequest,
  SwapPokemonRequest,
  SwapPokemonResponse,
  RouteListResponse,
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  PokedexStatus,
  PokedexLocation,
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
    description: `Returns a list of Pokémon from the Pokédex with optional filters and pagination`,
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
      {
        name: "type",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "minId",
        type: "Query",
        schema: z.number().int().gte(1).lte(1025).optional(),
      },
      {
        name: "maxId",
        type: "Query",
        schema: z.number().int().gte(1).lte(1025).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(20),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().int().gte(0).optional().default(0),
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
    description: `Add a Pokémon for a user in a session`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreatePokemonRequest,
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
    description: `List or filter Pokémon for a session/user`,
    requestFormat: "json",
    parameters: [
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "userId",
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
        schema: z.enum(["CAUGHT", "NOT_CAUGHT", "DEAD"]).optional(),
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
    path: "/pokemon/:sessionId/:id",
    alias: "updatePokemon",
    description: `Update a Pokémon&#x27;s status, location, or properties`,
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
        name: "id",
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
    description: `Get unique routes for a session/user`,
    requestFormat: "json",
    parameters: [
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "userId",
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
    method: "post",
    path: "/pokemon/:sessionId/swap",
    alias: "swapPokemon",
    description: `Atomically swap the position and location of two Pokémon within a session`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: SwapPokemonRequest,
      },
      {
        name: "sessionId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: SwapPokemonResponse,
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
        status: 409,
        description: `Conflict - Cannot swap Pokémon (e.g., different users, invalid positions)`,
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
        schema: CreateSessionRequest,
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
        schema: UpdateSessionRequest,
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
    description: `Join a session as a user`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ userId: z.string() }),
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
    method: "post",
    path: "/users",
    alias: "createUser",
    description: `Creates a new user with a username`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateUserRequest,
      },
    ],
    response: CreateUserResponse,
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
    path: "/users/:userId",
    alias: "getUserById",
    description: `Returns a user by their ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "userId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: GetUserResponse,
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
    path: "/users/:userId",
    alias: "updateUser",
    description: `Update a user&#x27;s username`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: UpdateUserRequest,
      },
      {
        name: "userId",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: GetUserResponse,
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
