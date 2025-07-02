import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';
import { RawPokemonData } from './pokedex.types';

// Zod schema types for pokedex responses
export type PokedexPokemonDto = z.infer<typeof schemas.PokedexPokemon>;
export type PokedexPokemonResponseDto = z.infer<typeof schemas.PokedexPokemonResponse>;
export type PaginationInfoDto = z.infer<typeof schemas.PaginationInfo>;

export class PokedexMapper {
  /**
   * Maps raw Pokemon data to a PokedexPokemon DTO
   * Since RawPokemonData matches the schema exactly, we can return it directly
   */
  static mapPokemonDataToPokedexPokemonDto(pokemonData: RawPokemonData): PokedexPokemonDto {
    return pokemonData;
  }

  /**
   * Maps raw Pokemon data array to a PokedexPokemonResponse DTO
   */
  static mapPokemonDataToPokedexResponseDto(
    pokemonData: RawPokemonData[],
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasNext: boolean;
      hasPrevious: boolean;
    }
  ): PokedexPokemonResponseDto {
    return {
      pokemon: pokemonData.map(pokemon => this.mapPokemonDataToPokedexPokemonDto(pokemon)),
      pagination: {
        total: pagination.total,
        limit: pagination.limit,
        offset: pagination.offset,
        hasNext: pagination.hasNext,
        hasPrevious: pagination.hasPrevious,
      },
    };
  }

  /**
   * Maps raw Pokemon data array to PokedexPokemon DTOs
   */
  static mapPokemonDataArrayToPokedexPokemonDtos(pokemonData: RawPokemonData[]): PokedexPokemonDto[] {
    return pokemonData.map(pokemon => this.mapPokemonDataToPokedexPokemonDto(pokemon));
  }

  /**
   * Creates a PaginationInfo DTO
   */
  static createPaginationInfoDto(
    total: number,
    limit: number,
    offset: number
  ): PaginationInfoDto {
    return {
      total,
      limit,
      offset,
      hasNext: offset + limit < total,
      hasPrevious: offset > 0,
    };
  }
} 