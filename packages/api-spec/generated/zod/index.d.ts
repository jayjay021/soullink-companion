import { type ZodiosOptions } from "@zodios/core";
import { z } from "zod";
export declare const schemas: {
    HealthResponse: z.ZodObject<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
    Error: z.ZodObject<{
        success: z.ZodLiteral<false>;
        error: z.ZodObject<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        success: z.ZodLiteral<false>;
        error: z.ZodObject<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        success: z.ZodLiteral<false>;
        error: z.ZodObject<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            message: z.ZodString;
            code: z.ZodOptional<z.ZodString>;
            details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
    SessionStatus: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
    SessionListItem: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
    }, z.ZodTypeAny, "passthrough">>;
    SessionsResponse: z.ZodObject<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    createSession_Body: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        name: z.ZodString;
        description: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
    Player: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
    Session: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    updateSession_Body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
    }, z.ZodTypeAny, "passthrough">>;
    joinSession_Body: z.ZodObject<{
        player: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        player: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        player: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
    PokedexPokemonName: z.ZodObject<{
        english: z.ZodString;
        japanese: z.ZodString;
        german: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        english: z.ZodString;
        japanese: z.ZodString;
        german: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        english: z.ZodString;
        japanese: z.ZodString;
        german: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
    PokedexPokemonStats: z.ZodObject<{
        HP: z.ZodNumber;
        Attack: z.ZodNumber;
        Defense: z.ZodNumber;
        "Sp. Attack": z.ZodNumber;
        "Sp. Defense": z.ZodNumber;
        Speed: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        HP: z.ZodNumber;
        Attack: z.ZodNumber;
        Defense: z.ZodNumber;
        "Sp. Attack": z.ZodNumber;
        "Sp. Defense": z.ZodNumber;
        Speed: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        HP: z.ZodNumber;
        Attack: z.ZodNumber;
        Defense: z.ZodNumber;
        "Sp. Attack": z.ZodNumber;
        "Sp. Defense": z.ZodNumber;
        Speed: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    PokedexPokemonEvolution: z.ZodObject<{
        prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
    }, z.ZodTypeAny, "passthrough">>;
    PokedexPokemonProfile: z.ZodObject<{
        height: z.ZodString;
        weight: z.ZodString;
        egg: z.ZodArray<z.ZodString, "many">;
        ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
        gender: z.ZodString;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        height: z.ZodString;
        weight: z.ZodString;
        egg: z.ZodArray<z.ZodString, "many">;
        ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
        gender: z.ZodString;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        height: z.ZodString;
        weight: z.ZodString;
        egg: z.ZodArray<z.ZodString, "many">;
        ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
        gender: z.ZodString;
    }, z.ZodTypeAny, "passthrough">>;
    PokedexPokemonImage: z.ZodObject<{
        sprite: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodString>;
        hires: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        sprite: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodString>;
        hires: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        sprite: z.ZodString;
        thumbnail: z.ZodOptional<z.ZodString>;
        hires: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
    PokedexPokemon: z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodObject<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
        type: z.ZodArray<z.ZodString, "many">;
        base: z.ZodObject<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        species: z.ZodString;
        description: z.ZodString;
        evolution: z.ZodOptional<z.ZodObject<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
        profile: z.ZodObject<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
        image: z.ZodObject<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodNumber;
        name: z.ZodObject<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
        type: z.ZodArray<z.ZodString, "many">;
        base: z.ZodObject<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        species: z.ZodString;
        description: z.ZodString;
        evolution: z.ZodOptional<z.ZodObject<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
        profile: z.ZodObject<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
        image: z.ZodObject<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodNumber;
        name: z.ZodObject<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            english: z.ZodString;
            japanese: z.ZodString;
            german: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
        type: z.ZodArray<z.ZodString, "many">;
        base: z.ZodObject<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            HP: z.ZodNumber;
            Attack: z.ZodNumber;
            Defense: z.ZodNumber;
            "Sp. Attack": z.ZodNumber;
            "Sp. Defense": z.ZodNumber;
            Speed: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
        species: z.ZodString;
        description: z.ZodString;
        evolution: z.ZodOptional<z.ZodObject<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
        }, z.ZodTypeAny, "passthrough">>>;
        profile: z.ZodObject<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            height: z.ZodString;
            weight: z.ZodString;
            egg: z.ZodArray<z.ZodString, "many">;
            ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
            gender: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
        image: z.ZodObject<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            sprite: z.ZodString;
            thumbnail: z.ZodOptional<z.ZodString>;
            hires: z.ZodOptional<z.ZodString>;
        }, z.ZodTypeAny, "passthrough">>;
    }, z.ZodTypeAny, "passthrough">>;
    PokedexPokemonResponse: z.ZodObject<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    PokemonStatus: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
    PokemonLocation: z.ZodEnum<["TEAM", "BOX"]>;
    AddPokemonRequest: z.ZodObject<{
        playerId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        playerId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        playerId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    Pokemon: z.ZodObject<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    PokemonListResponse: z.ZodObject<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    UpdatePokemonRequest: z.ZodObject<{
        status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
        routeName: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
        position: z.ZodOptional<z.ZodNumber>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
        routeName: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
        position: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
        routeName: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
        position: z.ZodOptional<z.ZodNumber>;
    }, z.ZodTypeAny, "passthrough">>;
    RouteListResponse: z.ZodObject<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">>;
};
export declare const api: import("@zodios/core").ZodiosInstance<[{
    method: "get";
    path: "/health";
    alias: "getHealth";
    description: "Returns the health status of the API";
    requestFormat: "json";
    response: z.ZodObject<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/pokedex/pokemon";
    alias: "getPokedexPokemon";
    description: "Returns a list of Pokémon from the Pokédex with optional filters";
    requestFormat: "json";
    parameters: [{
        name: "id";
        type: "Query";
        schema: z.ZodOptional<z.ZodNumber>;
    }, {
        name: "name";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }];
    response: z.ZodObject<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "post";
    path: "/pokemon/:sessionId";
    alias: "addPokemon";
    description: "Add a Pokémon for a player in a session";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            playerId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            playerId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            playerId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/pokemon/:sessionId";
    alias: "listPokemon";
    description: "List or filter Pokémon for a session/player";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }, {
        name: "playerId";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }, {
        name: "routeName";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }, {
        name: "status";
        type: "Query";
        schema: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
    }];
    response: z.ZodObject<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "patch";
    path: "/pokemon/:sessionId/:id";
    alias: "updatePokemon";
    description: "Update a Pokémon’s status, location, or properties";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
            routeName: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
            position: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
            routeName: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
            position: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
            routeName: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
            position: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }, {
        name: "id";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/pokemon/:sessionId/routes";
    alias: "getPokemonRoutes";
    description: "Get unique routes for a session/player";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }, {
        name: "playerId";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }];
    response: z.ZodObject<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/session";
    alias: "listSessions";
    description: "Returns a list of all sessions";
    requestFormat: "json";
    response: z.ZodObject<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "post";
    path: "/session";
    alias: "createSession";
    description: "Creates a new session";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            name: z.ZodString;
            description: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            name: z.ZodString;
            description: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/session/:sessionId";
    alias: "getSession";
    description: "Returns a session by its ID";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "put";
    path: "/session/:sessionId";
    alias: "updateSession";
    description: "Update session name, description, or status";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "delete";
    path: "/session/:sessionId";
    alias: "deleteSession";
    description: "Deletes a session by its ID";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodVoid;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "post";
    path: "/session/:sessionId/join";
    alias: "joinSession";
    description: "Join a session as a player";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            player: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            player: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            player: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}]>;
export declare function createApiClient(baseUrl: string, options?: ZodiosOptions): import("@zodios/core").ZodiosInstance<[{
    method: "get";
    path: "/health";
    alias: "getHealth";
    description: "Returns the health status of the API";
    requestFormat: "json";
    response: z.ZodObject<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        status: z.ZodEnum<["ok", "error"]>;
        timestamp: z.ZodString;
        uptime: z.ZodNumber;
        version: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/pokedex/pokemon";
    alias: "getPokedexPokemon";
    description: "Returns a list of Pokémon from the Pokédex with optional filters";
    requestFormat: "json";
    parameters: [{
        name: "id";
        type: "Query";
        schema: z.ZodOptional<z.ZodNumber>;
    }, {
        name: "name";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }];
    response: z.ZodObject<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodNumber;
            name: z.ZodObject<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                english: z.ZodString;
                japanese: z.ZodString;
                german: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            type: z.ZodArray<z.ZodString, "many">;
            base: z.ZodObject<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                HP: z.ZodNumber;
                Attack: z.ZodNumber;
                Defense: z.ZodNumber;
                "Sp. Attack": z.ZodNumber;
                "Sp. Defense": z.ZodNumber;
                Speed: z.ZodNumber;
            }, z.ZodTypeAny, "passthrough">>;
            species: z.ZodString;
            description: z.ZodString;
            evolution: z.ZodOptional<z.ZodObject<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                prev: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                next: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">>;
            }, z.ZodTypeAny, "passthrough">>>;
            profile: z.ZodObject<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                height: z.ZodString;
                weight: z.ZodString;
                egg: z.ZodArray<z.ZodString, "many">;
                ability: z.ZodArray<z.ZodArray<z.ZodString, "many">, "many">;
                gender: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
            image: z.ZodObject<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                sprite: z.ZodString;
                thumbnail: z.ZodOptional<z.ZodString>;
                hires: z.ZodOptional<z.ZodString>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "post";
    path: "/pokemon/:sessionId";
    alias: "addPokemon";
    description: "Add a Pokémon for a player in a session";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            playerId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            playerId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            playerId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/pokemon/:sessionId";
    alias: "listPokemon";
    description: "List or filter Pokémon for a session/player";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }, {
        name: "playerId";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }, {
        name: "routeName";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }, {
        name: "status";
        type: "Query";
        schema: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
    }];
    response: z.ZodObject<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        pokemon: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            playerId: z.ZodString;
            sessionId: z.ZodString;
            pokemonId: z.ZodNumber;
            status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
            routeName: z.ZodString;
            location: z.ZodEnum<["TEAM", "BOX"]>;
            position: z.ZodNumber;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "patch";
    path: "/pokemon/:sessionId/:id";
    alias: "updatePokemon";
    description: "Update a Pokémon’s status, location, or properties";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
            routeName: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
            position: z.ZodOptional<z.ZodNumber>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
            routeName: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
            position: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            status: z.ZodOptional<z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>>;
            routeName: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodEnum<["TEAM", "BOX"]>>;
            position: z.ZodOptional<z.ZodNumber>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }, {
        name: "id";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        playerId: z.ZodString;
        sessionId: z.ZodString;
        pokemonId: z.ZodNumber;
        status: z.ZodEnum<["CAUGHT", "NOT_CAUGHT", "DEAD"]>;
        routeName: z.ZodString;
        location: z.ZodEnum<["TEAM", "BOX"]>;
        position: z.ZodNumber;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/pokemon/:sessionId/routes";
    alias: "getPokemonRoutes";
    description: "Get unique routes for a session/player";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }, {
        name: "playerId";
        type: "Query";
        schema: z.ZodOptional<z.ZodString>;
    }];
    response: z.ZodObject<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        routes: z.ZodArray<z.ZodString, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/session";
    alias: "listSessions";
    description: "Returns a list of all sessions";
    requestFormat: "json";
    response: z.ZodObject<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        sessions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
            status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "post";
    path: "/session";
    alias: "createSession";
    description: "Creates a new session";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            name: z.ZodString;
            description: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            name: z.ZodString;
            description: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "get";
    path: "/session/:sessionId";
    alias: "getSession";
    description: "Returns a session by its ID";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "put";
    path: "/session/:sessionId";
    alias: "updateSession";
    description: "Update session name, description, or status";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "delete";
    path: "/session/:sessionId";
    alias: "deleteSession";
    description: "Deletes a session by its ID";
    requestFormat: "json";
    parameters: [{
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodVoid;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}, {
    method: "post";
    path: "/session/:sessionId/join";
    alias: "joinSession";
    description: "Join a session as a player";
    requestFormat: "json";
    parameters: [{
        name: "body";
        type: "Body";
        schema: z.ZodObject<{
            player: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            player: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            player: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                id: z.ZodString;
                name: z.ZodString;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        name: "sessionId";
        type: "Path";
        schema: z.ZodString;
    }];
    response: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        id: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
        status: z.ZodEnum<["WAITING", "STARTED", "FINISHED"]>;
        players: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>, "many">;
    }, z.ZodTypeAny, "passthrough">>;
    errors: [{
        status: 400;
        description: "Bad request";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 404;
        description: "Resource not found";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }, {
        status: 500;
        description: "Internal server error";
        schema: z.ZodObject<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            success: z.ZodLiteral<false>;
            error: z.ZodObject<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
                message: z.ZodString;
                code: z.ZodOptional<z.ZodString>;
                details: z.ZodOptional<z.ZodObject<{}, "passthrough", z.ZodTypeAny, z.objectOutputType<{}, z.ZodTypeAny, "passthrough">, z.objectInputType<{}, z.ZodTypeAny, "passthrough">>>;
            }, z.ZodTypeAny, "passthrough">>;
        }, z.ZodTypeAny, "passthrough">>;
    }];
}]>;
