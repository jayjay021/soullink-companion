import { api } from "./api";
export const addTagTypes = [
  "System",
  "Users",
  "Session",
  "Pokedex",
  "Pokemon",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getHealth: build.query<GetHealthApiResponse, GetHealthApiArg>({
        query: () => ({ url: `/health` }),
        providesTags: ["System"],
      }),
      createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
        query: (queryArg) => ({
          url: `/users`,
          method: "POST",
          body: queryArg.createUserRequest,
        }),
        invalidatesTags: ["Users"],
      }),
      getUserById: build.query<GetUserByIdApiResponse, GetUserByIdApiArg>({
        query: (queryArg) => ({ url: `/users/${queryArg.userId}` }),
        providesTags: ["Users"],
      }),
      updateUser: build.mutation<UpdateUserApiResponse, UpdateUserApiArg>({
        query: (queryArg) => ({
          url: `/users/${queryArg.userId}`,
          method: "PUT",
          body: queryArg.updateUserRequest,
        }),
        invalidatesTags: ["Users"],
      }),
      listSessions: build.query<ListSessionsApiResponse, ListSessionsApiArg>({
        query: () => ({ url: `/session` }),
        providesTags: ["Session"],
      }),
      createSession: build.mutation<
        CreateSessionApiResponse,
        CreateSessionApiArg
      >({
        query: (queryArg) => ({
          url: `/session`,
          method: "POST",
          body: queryArg.createSessionRequest,
        }),
        invalidatesTags: ["Session"],
      }),
      getSession: build.query<GetSessionApiResponse, GetSessionApiArg>({
        query: (queryArg) => ({ url: `/session/${queryArg.sessionId}` }),
        providesTags: ["Session"],
      }),
      updateSession: build.mutation<
        UpdateSessionApiResponse,
        UpdateSessionApiArg
      >({
        query: (queryArg) => ({
          url: `/session/${queryArg.sessionId}`,
          method: "PUT",
          body: queryArg.updateSessionRequest,
        }),
        invalidatesTags: ["Session"],
      }),
      deleteSession: build.mutation<
        DeleteSessionApiResponse,
        DeleteSessionApiArg
      >({
        query: (queryArg) => ({
          url: `/session/${queryArg.sessionId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Session"],
      }),
      joinSession: build.mutation<JoinSessionApiResponse, JoinSessionApiArg>({
        query: (queryArg) => ({
          url: `/session/${queryArg.sessionId}/join`,
          method: "POST",
          body: queryArg.joinSessionRequest,
        }),
        invalidatesTags: ["Session"],
      }),
      getPokedexPokemon: build.query<
        GetPokedexPokemonApiResponse,
        GetPokedexPokemonApiArg
      >({
        query: (queryArg) => ({
          url: `/pokedex/pokemon`,
          params: {
            id: queryArg.id,
            name: queryArg.name,
            type: queryArg["type"],
            minId: queryArg.minId,
            maxId: queryArg.maxId,
            limit: queryArg.limit,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["Pokedex"],
      }),
      addPokemon: build.mutation<AddPokemonApiResponse, AddPokemonApiArg>({
        query: (queryArg) => ({
          url: `/pokemon/${queryArg.sessionId}`,
          method: "POST",
          body: queryArg.createPokemonRequest,
        }),
        invalidatesTags: ["Pokemon"],
      }),
      listPokemon: build.query<ListPokemonApiResponse, ListPokemonApiArg>({
        query: (queryArg) => ({
          url: `/pokemon/${queryArg.sessionId}`,
          params: {
            userId: queryArg.userId,
            routeName: queryArg.routeName,
            status: queryArg.status,
          },
        }),
        providesTags: ["Pokemon"],
      }),
      updatePokemon: build.mutation<
        UpdatePokemonApiResponse,
        UpdatePokemonApiArg
      >({
        query: (queryArg) => ({
          url: `/pokemon/${queryArg.sessionId}/${queryArg.id}`,
          method: "PATCH",
          body: queryArg.updatePokemonRequest,
        }),
        invalidatesTags: ["Pokemon"],
      }),
      getPokemonRoutes: build.query<
        GetPokemonRoutesApiResponse,
        GetPokemonRoutesApiArg
      >({
        query: (queryArg) => ({
          url: `/pokemon/${queryArg.sessionId}/routes`,
          params: {
            userId: queryArg.userId,
          },
        }),
        providesTags: ["Pokemon"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as api };
export type GetHealthApiResponse =
  /** status 200 Health status */ HealthResponse;
export type GetHealthApiArg = void;
export type CreateUserApiResponse =
  /** status 201 User created successfully */ CreateUserResponse;
export type CreateUserApiArg = {
  createUserRequest: CreateUserRequest;
};
export type GetUserByIdApiResponse =
  /** status 200 User found */ GetUserResponse;
export type GetUserByIdApiArg = {
  userId: string;
};
export type UpdateUserApiResponse =
  /** status 200 User updated successfully */ GetUserResponse;
export type UpdateUserApiArg = {
  userId: string;
  updateUserRequest: UpdateUserRequest;
};
export type ListSessionsApiResponse =
  /** status 200 List of sessions */ SessionsResponse;
export type ListSessionsApiArg = void;
export type CreateSessionApiResponse =
  /** status 201 Session created */ Session;
export type CreateSessionApiArg = {
  createSessionRequest: CreateSessionRequest;
};
export type GetSessionApiResponse = /** status 200 Session found */ Session;
export type GetSessionApiArg = {
  sessionId: string;
};
export type UpdateSessionApiResponse =
  /** status 200 Session updated */ Session;
export type UpdateSessionApiArg = {
  sessionId: string;
  updateSessionRequest: UpdateSessionRequest;
};
export type DeleteSessionApiResponse = unknown;
export type DeleteSessionApiArg = {
  sessionId: string;
};
export type JoinSessionApiResponse =
  /** status 200 User joined session */ Session;
export type JoinSessionApiArg = {
  sessionId: string;
  joinSessionRequest: JoinSessionRequest;
};
export type GetPokedexPokemonApiResponse =
  /** status 200 List of Pokédex Pokémon with pagination metadata */ PokedexPokemonResponse;
export type GetPokedexPokemonApiArg = {
  /** Filter by Pokémon ID */
  id?: number;
  /** Filter by Pokémon name (case-insensitive, partial match) */
  name?: string;
  /** Filter by Pokémon type */
  type?: string;
  /** Filter by minimum Pokémon ID */
  minId?: number;
  /** Filter by maximum Pokémon ID */
  maxId?: number;
  /** Number of Pokémon to return (default: 20, max: 100) */
  limit?: number;
  /** Number of Pokémon to skip for pagination */
  offset?: number;
};
export type AddPokemonApiResponse = /** status 201 Pokémon added */ Pokemon;
export type AddPokemonApiArg = {
  sessionId: string;
  createPokemonRequest: CreatePokemonRequest;
};
export type ListPokemonApiResponse =
  /** status 200 List of Pokémon */ PokemonListResponse;
export type ListPokemonApiArg = {
  sessionId: string;
  userId?: string;
  routeName?: string;
  status?: PokemonStatus;
};
export type UpdatePokemonApiResponse =
  /** status 200 Pokémon updated */ Pokemon;
export type UpdatePokemonApiArg = {
  sessionId: string;
  id: string;
  updatePokemonRequest: UpdatePokemonRequest;
};
export type GetPokemonRoutesApiResponse =
  /** status 200 List of unique routes */ RouteListResponse;
export type GetPokemonRoutesApiArg = {
  sessionId: string;
  userId?: string;
};
export type HealthResponse = {
  /** Health status */
  status: "ok" | "error";
  /** Current server timestamp */
  timestamp: string;
  /** Server uptime in seconds */
  uptime: number;
  /** API version */
  version?: string;
};
export type Error = {
  success: false;
  error: {
    /** Error message */
    message: string;
    /** Error code */
    code?: string;
    /** Additional error details */
    details?: object;
  };
};
export type User = {
  /** Unique user identifier */
  id: string;
  /** User's display name */
  username: string;
  /** When the user was created */
  createdAt: string;
};
export type CreateUserResponse = {
  user: User;
};
export type CreateUserRequest = {
  /** User's display name */
  username: string;
  /** Optional email address */
  email?: string;
  /** Optional password (min 8 chars) */
  password?: string;
};
export type GetUserResponse = {
  user: User;
};
export type UpdateUserRequest = {
  username?: string;
  email?: string;
};
export type SessionStatus = "WAITING" | "STARTED" | "FINISHED";
export type UserRef = {
  /** Unique user identifier */
  id: string;
  /** User's display name */
  username: string;
};
export type SessionListItem = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: SessionStatus;
  users: UserRef[];
};
export type SessionsResponse = {
  sessions: SessionListItem[];
};
export type Session = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: SessionStatus;
  users: UserRef[];
};
export type CreateSessionRequest = {
  name: string;
  description: string;
};
export type UpdateSessionRequest = {
  name?: string;
  description?: string;
  status?: SessionStatus;
};
export type JoinSessionRequest = {
  userId: string;
};
export type PokedexPokemonName = {
  /** English name */
  english: string;
  /** Japanese name */
  japanese: string;
  /** German name */
  german: string;
};
export type PokedexPokemonStats = {
  HP: number;
  Attack: number;
  Defense: number;
  "Sp. Attack": number;
  "Sp. Defense": number;
  Speed: number;
};
export type PokedexPokemonEvolution = {
  /** Previous evolution [id, method] */
  prev?: string[];
  /** Next evolution options [[id, method], ...] */
  next?: string[][];
};
export type PokedexPokemonProfile = {
  /** Pokémon height */
  height: string;
  /** Pokémon weight */
  weight: string;
  /** Egg groups */
  egg: string[];
  /** Abilities [name, isHidden] */
  ability: string[][];
  /** Gender ratio */
  gender: string;
};
export type PokedexPokemonImage = {
  /** Sprite image URL */
  sprite: string;
  /** Thumbnail image URL */
  thumbnail?: string;
  /** High resolution image URL */
  hires?: string;
};
export type PokedexPokemon = {
  /** Pokémon National Dex number */
  id: number;
  name: PokedexPokemonName;
  /** Pokémon types */
  type: string[];
  base: PokedexPokemonStats;
  /** Pokémon species classification */
  species: string;
  /** Pokémon description */
  description: string;
  evolution?: PokedexPokemonEvolution;
  profile: PokedexPokemonProfile;
  image: PokedexPokemonImage;
};
export type PaginationInfo = {
  /** Total number of items */
  total: number;
  /** Number of items per page */
  limit: number;
  /** Offset for pagination */
  offset: number;
  /** Whether there is a next page */
  hasNext: boolean;
  /** Whether there is a previous page */
  hasPrevious: boolean;
};
export type PokedexPokemonResponse = {
  pokemon: PokedexPokemon[];
  pagination: PaginationInfo;
};
export type PokemonStatus = "CAUGHT" | "NOT_CAUGHT" | "DEAD";
export type PokemonLocation = "TEAM" | "BOX";
export type Pokemon = {
  id: string;
  user: UserRef;
  sessionId: string;
  /** Pokémon National Dex number */
  pokemonId: number;
  status: PokemonStatus;
  routeName: string;
  location: PokemonLocation;
  /** Position in the team or box */
  position: number;
};
export type CreatePokemonRequest = {
  /** ID of the user who owns the Pokémon */
  userId: string;
  /** Pokémon National Dex number */
  pokemonId: number;
  status: PokemonStatus;
  /** Name of the route where the Pokémon was encountered */
  routeName: string;
  location: PokemonLocation;
  /** Position in the team or box */
  position: number;
};
export type PokemonListResponse = {
  pokemon: Pokemon[];
};
export type UpdatePokemonRequest = {
  status: PokemonStatus;
  /** Name of the route where the Pokémon was encountered */
  routeName: string;
  location: PokemonLocation;
  /** Position in the team or box */
  position: number;
};
export type RouteListResponse = {
  routes: string[];
};
export const {
  useGetHealthQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useListSessionsQuery,
  useCreateSessionMutation,
  useGetSessionQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
  useJoinSessionMutation,
  useGetPokedexPokemonQuery,
  useAddPokemonMutation,
  useListPokemonQuery,
  useUpdatePokemonMutation,
  useGetPokemonRoutesQuery,
} = injectedRtkApi;
