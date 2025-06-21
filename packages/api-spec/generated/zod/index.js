"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.schemas = void 0;
exports.createApiClient = createApiClient;
const core_1 = require("@zodios/core");
const zod_1 = require("zod");
const HealthResponse = zod_1.z
    .object({
    status: zod_1.z.enum(["ok", "error"]),
    timestamp: zod_1.z.string().datetime({ offset: true }),
    uptime: zod_1.z.number(),
    version: zod_1.z.string().optional(),
})
    .passthrough();
const Error = zod_1.z
    .object({
    success: zod_1.z.literal(false),
    error: zod_1.z
        .object({
        message: zod_1.z.string(),
        code: zod_1.z.string().optional(),
        details: zod_1.z.object({}).partial().passthrough().optional(),
    })
        .passthrough(),
})
    .passthrough();
const SessionStatus = zod_1.z.enum(["WAITING", "STARTED", "FINISHED"]);
const SessionListItem = zod_1.z
    .object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    createdAt: zod_1.z.string().datetime({ offset: true }),
    status: SessionStatus,
})
    .passthrough();
const SessionsResponse = zod_1.z
    .object({ sessions: zod_1.z.array(SessionListItem) })
    .passthrough();
const createSession_Body = zod_1.z
    .object({ name: zod_1.z.string(), description: zod_1.z.string() })
    .passthrough();
const Player = zod_1.z.object({ id: zod_1.z.string(), name: zod_1.z.string() }).passthrough();
const Session = zod_1.z
    .object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    createdAt: zod_1.z.string().datetime({ offset: true }),
    status: SessionStatus,
    players: zod_1.z.array(Player),
})
    .passthrough();
const updateSession_Body = zod_1.z
    .object({ name: zod_1.z.string(), description: zod_1.z.string(), status: SessionStatus })
    .partial()
    .passthrough();
const joinSession_Body = zod_1.z.object({ player: Player }).passthrough();
const PokedexPokemonName = zod_1.z
    .object({ english: zod_1.z.string(), japanese: zod_1.z.string(), german: zod_1.z.string() })
    .passthrough();
const PokedexPokemonStats = zod_1.z
    .object({
    HP: zod_1.z.number().int().gte(1),
    Attack: zod_1.z.number().int().gte(1),
    Defense: zod_1.z.number().int().gte(1),
    "Sp. Attack": zod_1.z.number().int().gte(1),
    "Sp. Defense": zod_1.z.number().int().gte(1),
    Speed: zod_1.z.number().int().gte(1),
})
    .passthrough();
const PokedexPokemonEvolution = zod_1.z
    .object({
    prev: zod_1.z.array(zod_1.z.string()).min(2).max(2),
    next: zod_1.z.array(zod_1.z.array(zod_1.z.string()).min(2).max(2)),
})
    .partial()
    .passthrough();
const PokedexPokemonProfile = zod_1.z
    .object({
    height: zod_1.z.string(),
    weight: zod_1.z.string(),
    egg: zod_1.z.array(zod_1.z.string()),
    ability: zod_1.z.array(zod_1.z.array(zod_1.z.string()).min(2).max(2)),
    gender: zod_1.z.string(),
})
    .passthrough();
const PokedexPokemonImage = zod_1.z
    .object({
    sprite: zod_1.z.string().url(),
    thumbnail: zod_1.z.string().url().optional(),
    hires: zod_1.z.string().url().optional(),
})
    .passthrough();
const PokedexPokemon = zod_1.z
    .object({
    id: zod_1.z.number().int().gte(1).lte(1025),
    name: PokedexPokemonName,
    type: zod_1.z.array(zod_1.z.string()).min(1).max(2),
    base: PokedexPokemonStats,
    species: zod_1.z.string(),
    description: zod_1.z.string(),
    evolution: PokedexPokemonEvolution.optional(),
    profile: PokedexPokemonProfile,
    image: PokedexPokemonImage,
})
    .passthrough();
const PokedexPokemonResponse = zod_1.z
    .object({ pokemon: zod_1.z.array(PokedexPokemon) })
    .passthrough();
const PokemonStatus = zod_1.z.enum(["CAUGHT", "NOT_CAUGHT", "DEAD"]);
const PokemonLocation = zod_1.z.enum(["TEAM", "BOX"]);
const AddPokemonRequest = zod_1.z
    .object({
    playerId: zod_1.z.string(),
    pokemonId: zod_1.z.number(),
    status: PokemonStatus,
    routeName: zod_1.z.string(),
    location: PokemonLocation,
    position: zod_1.z.number().int(),
})
    .passthrough();
const Pokemon = zod_1.z
    .object({
    id: zod_1.z.string(),
    playerId: zod_1.z.string(),
    sessionId: zod_1.z.string(),
    pokemonId: zod_1.z.number(),
    status: PokemonStatus,
    routeName: zod_1.z.string(),
    location: PokemonLocation,
    position: zod_1.z.number().int(),
})
    .passthrough();
const PokemonListResponse = zod_1.z
    .object({ pokemon: zod_1.z.array(Pokemon) })
    .passthrough();
const UpdatePokemonRequest = zod_1.z
    .object({
    status: PokemonStatus,
    routeName: zod_1.z.string(),
    location: PokemonLocation,
    position: zod_1.z.number().int(),
})
    .partial()
    .passthrough();
const RouteListResponse = zod_1.z
    .object({ routes: zod_1.z.array(zod_1.z.string()) })
    .passthrough();
exports.schemas = {
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
    PokemonLocation,
    AddPokemonRequest,
    Pokemon,
    PokemonListResponse,
    UpdatePokemonRequest,
    RouteListResponse,
};
const endpoints = (0, core_1.makeApi)([
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
                schema: zod_1.z.number().int().gte(1).lte(1025).optional(),
            },
            {
                name: "name",
                type: "Query",
                schema: zod_1.z.string().min(1).optional(),
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
                schema: zod_1.z.string(),
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
                schema: zod_1.z.string(),
            },
            {
                name: "playerId",
                type: "Query",
                schema: zod_1.z.string().optional(),
            },
            {
                name: "routeName",
                type: "Query",
                schema: zod_1.z.string().optional(),
            },
            {
                name: "status",
                type: "Query",
                schema: zod_1.z.enum(["CAUGHT", "NOT_CAUGHT", "DEAD"]).optional(),
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
                schema: zod_1.z.string(),
            },
            {
                name: "id",
                type: "Path",
                schema: zod_1.z.string(),
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
                schema: zod_1.z.string(),
            },
            {
                name: "playerId",
                type: "Query",
                schema: zod_1.z.string().optional(),
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
                schema: zod_1.z.string(),
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
                schema: zod_1.z.string(),
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
                schema: zod_1.z.string(),
            },
        ],
        response: zod_1.z.void(),
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
                schema: zod_1.z.string(),
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
exports.api = new core_1.Zodios(endpoints);
function createApiClient(baseUrl, options) {
    return new core_1.Zodios(baseUrl, endpoints, options);
}
