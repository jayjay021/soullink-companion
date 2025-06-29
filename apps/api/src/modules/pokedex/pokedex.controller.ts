import { Request, Response, NextFunction } from 'express';
import type { components } from '@repo/api-spec/types';
import { pokedexService } from './pokedex.service';

// Import the generated types
type PokedexPokemonResponse = components['schemas']['PokedexPokemonResponse'];

interface PokedexQueryParams {
  id?: number;
  name?: string;
  type?: string;
  minId?: number;
  maxId?: number;
  limit?: number;
  offset?: number;
}

export const pokedexController = {
  /**
   * GET /api/v1/pokedex/pokemon
   * Query Pokédex Pokémon with optional filters and pagination
   */
  getPokemon: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { 
        id, 
        name, 
        type, 
        minId, 
        maxId, 
        limit, 
        offset 
      } = req.query as PokedexQueryParams;

      // Convert string parameters to numbers where needed
      const params = {
        id: id ? Number(id) : undefined,
        name,
        type,
        minId: minId ? Number(minId) : undefined,
        maxId: maxId ? Number(maxId) : undefined,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      };

      // Get Pokémon data from service
      const result = pokedexService.getPokemon(params);

      const response: PokedexPokemonResponse = {
        pokemon: result.pokemon,
        pagination: result.pagination,
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  },
};
