import { Request, Response, NextFunction } from 'express';
import type { components } from '@repo/api-spec/types';
import { pokedexService } from '../services/pokedexService';

// Import the generated types
type PokedexPokemonResponse = components['schemas']['PokedexPokemonResponse'];

interface PokedexQueryParams {
  id?: number;
  name?: string;
}

export const pokedexController = {
  /**
   * GET /api/v1/pokedex/pokemon
   * Query Pokédex Pokémon with optional filters
   */
  getPokemon: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, name } = req.query as PokedexQueryParams;

      // Get Pokémon data from service
      const pokemon = pokedexService.getPokemon({ id, name });

      const response: PokedexPokemonResponse = {
        pokemon,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  },
};
