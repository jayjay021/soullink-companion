import { Router } from 'express';
import { pokedexController } from './pokedex.controller';
import { validate } from '../../middleware/validation';
import { z } from 'zod';

const router: Router = Router();

// Request validation schema
const getPokedexPokemonSchema = z.object({
  query: z
    .object({
      id: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .refine((val) => val >= 1, {
          message: 'ID must be a positive number',
        })
        .optional(),
      name: z.string().min(1).optional(),
    })
    .optional(),
  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

/**
 * GET /pokedex/pokemon
 * Query Pokédex Pokémon with optional filters
 */
router.get(
  '/pokemon',
  validate(getPokedexPokemonSchema),
  pokedexController.getPokemon
);

export default router;
