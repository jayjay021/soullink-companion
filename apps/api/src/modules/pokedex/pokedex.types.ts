import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';

// Raw Pokemon data interface (from JSON) - matches OpenAPI schema exactly
export type RawPokemonData = z.infer<typeof schemas.PokedexPokemon>; 