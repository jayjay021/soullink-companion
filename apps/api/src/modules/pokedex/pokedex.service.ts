import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';
import { PokedexMapper } from './pokedex.mapper';
import { RawPokemonData } from './pokedex.types';
import pokemonData from './data/pokemon-data.json';

// Zod schema types for request/response
type PokedexPokemonResponseDto = z.infer<typeof schemas.PokedexPokemonResponse>;

interface PokedexQueryParams {
  id?: number;
  name?: string;
  type?: string;
  minId?: number;
  maxId?: number;
  limit?: number;
  offset?: number;
}

class PokedexService {
  private static instance: PokedexService;
  private pokemonData: RawPokemonData[] = [];
  private isLoaded = false;

  private constructor() {}

  public static getInstance(): PokedexService {
    if (!PokedexService.instance) {
      PokedexService.instance = new PokedexService();
    }
    return PokedexService.instance;
  }

  /**
   * Load Pokémon data from imported JSON on server startup
   */
  public async loadData(): Promise<void> {
    if (this.isLoaded) {
      console.log('Pokédex data already loaded');
      return;
    }

    try {
      this.pokemonData = pokemonData as RawPokemonData[];
      this.isLoaded = true;

      console.log(
        `✅ Loaded ${this.pokemonData.length} Pokémon from Pokédex data`
      );
    } catch (error) {
      console.error('❌ Failed to load Pokédex data:', error);
      throw new Error('Failed to initialize Pokédex service');
    }
  }

  /**
   * Get Pokémon data with optional filters and pagination
   */
  public getPokemon(
    params: PokedexQueryParams = {}
  ): PokedexPokemonResponseDto {
    if (!this.isLoaded) {
      throw new Error('Pokédex data not loaded. Call loadData() first.');
    }

    let filteredPokemon = [...this.pokemonData];

    // Filter by ID if provided
    if (params.id !== undefined) {
      filteredPokemon = filteredPokemon.filter(
        (pokemon) => pokemon.id === params.id
      );
    }

    // Filter by name if provided (case-insensitive partial match)
    if (params.name !== undefined) {
      const searchName = params.name.toLowerCase();
      filteredPokemon = filteredPokemon.filter(
        (pokemon) =>
          pokemon.name.english.toLowerCase().includes(searchName) ||
          pokemon.name.japanese.toLowerCase().includes(searchName) ||
          pokemon.name.german.toLowerCase().includes(searchName)
      );
    }

    // Filter by type if provided
    if (params.type !== undefined) {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.type.includes(params.type!)
      );
    }

    // Filter by ID range if provided
    if (params.minId !== undefined) {
      filteredPokemon = filteredPokemon.filter(
        (pokemon) => pokemon.id >= params.minId!
      );
    }

    if (params.maxId !== undefined) {
      filteredPokemon = filteredPokemon.filter(
        (pokemon) => pokemon.id <= params.maxId!
      );
    }

    // Get total count before pagination
    const total = filteredPokemon.length;

    // Apply pagination
    const limit = Math.min(params.limit || 20, 100); // Default 20, max 100
    const offset = params.offset || 0;

    const paginatedPokemon = filteredPokemon.slice(offset, offset + limit);

    // Calculate pagination info
    const hasNext = offset + limit < total;
    const hasPrevious = offset > 0;

    return PokedexMapper.mapPokemonDataToPokedexResponseDto(paginatedPokemon, {
      total,
      limit,
      offset,
      hasNext,
      hasPrevious,
    });
  }

  /**
   * Get a single Pokémon by ID
   */
  public getPokemonById(id: number): RawPokemonData | null {
    if (!this.isLoaded) {
      throw new Error('Pokédex data not loaded. Call loadData() first.');
    }

    const pokemon = this.pokemonData.find((p) => p.id === id);
    return pokemon || null;
  }

  /**
   * Get total count of loaded Pokémon
   */
  public getPokemonCount(): number {
    return this.pokemonData.length;
  }

  /**
   * Check if data is loaded
   */
  public isDataLoaded(): boolean {
    return this.isLoaded;
  }
}

// Export singleton instance
export const pokedexService = PokedexService.getInstance();
