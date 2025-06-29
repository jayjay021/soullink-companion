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
      type: z.string().min(1).optional(),
      minId: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .refine((val) => val >= 1, {
          message: 'Min ID must be a positive number',
        })
        .optional(),
      maxId: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .refine((val) => val >= 1, {
          message: 'Max ID must be a positive number',
        })
        .optional(),
      limit: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .refine((val) => val >= 1 && val <= 100, {
          message: 'Limit must be between 1 and 100',
        })
        .optional(),
      offset: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .refine((val) => val >= 0, {
          message: 'Offset must be a non-negative number',
        })
        .optional(),
    })
    .optional(),
  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

/**
 * GET /pokedex/pokemon
 * Query Pokédex Pokémon with optional filters and pagination
 */
router.get(
  '/pokemon',
  validate(getPokedexPokemonSchema),
  pokedexController.getPokemon
);

export default router;
