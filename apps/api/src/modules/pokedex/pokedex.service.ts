import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';
import { PokedexMapper } from './pokedex.mapper';
import { RawPokemonData } from './pokedex.types';
import {
  mergeGenerationData,
  getAvailableGenerations,
  type MigratedDataStructure,
  type MigratedPokemonData,
} from './utils/mergeGenerationData';
import migratedPokemonData from './data/pokemon-migrated.json';

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
  generation?: string;
}

class PokedexService {
  private static instance: PokedexService;
  private migratedData: MigratedDataStructure | null = null;
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
      // Store the raw migrated data structure
      this.migratedData =
        migratedPokemonData as unknown as MigratedDataStructure;
      this.isLoaded = true;

      // Get count from the pokemon object
      const pokemonCount = Object.keys(this.migratedData.pokemon).length;
      console.log(
        `✅ Loaded ${pokemonCount} Pokémon from migrated Pokédex data`
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
    if (!this.isLoaded || !this.migratedData) {
      throw new Error('Pokédex data not loaded. Call loadData() first.');
    }

    // Convert migrated data to array for filtering (using base data for filtering)
    let filteredPokemon = Object.values(this.migratedData.pokemon);

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

    // Handle type filtering before pagination (since type is generation-specific)
    const generation = params.generation || 'gen9';
    let finalFilteredPokemon = filteredPokemon;

    if (params.type !== undefined) {
      // Merge generational data for all filtered pokemon to check types
      const allMerged = this.mergeGenerationDataForPokemon(
        filteredPokemon,
        generation
      );
      const typeFiltered = allMerged.filter((pokemon) =>
        pokemon.type.includes(params.type!)
      );
      // Get back the original pokemon data that matched the type filter
      const typeFilteredIds = new Set(typeFiltered.map((p) => p.id));
      finalFilteredPokemon = filteredPokemon.filter((pokemon) =>
        typeFilteredIds.has(pokemon.id)
      );
    }

    // Get total count after all filtering
    const total = finalFilteredPokemon.length;

    // Apply pagination
    const limit = Math.min(params.limit || 20, 100); // Default 20, max 100
    const offset = params.offset || 0;

    const paginatedPokemon = finalFilteredPokemon.slice(offset, offset + limit);

    // Now merge generational data for the final paginated results
    const mergedPokemon = this.mergeGenerationDataForPokemon(
      paginatedPokemon,
      generation
    );

    // Calculate pagination info
    const hasNext = offset + limit < total;
    const hasPrevious = offset > 0;

    return PokedexMapper.mapPokemonDataToPokedexResponseDto(mergedPokemon, {
      total,
      limit,
      offset,
      hasNext,
      hasPrevious,
    });
  }

  /**
   * Merge generation data for a list of Pokemon
   */
  private mergeGenerationDataForPokemon(
    pokemonList: MigratedPokemonData[],
    generation: string
  ): RawPokemonData[] {
    if (!this.migratedData) {
      throw new Error('Migrated data not loaded');
    }

    // Create a temporary structure to use with mergeGenerationData
    const tempData: MigratedDataStructure = {
      pokemon: {},
    };

    // Add only the pokemon we need to the temp structure
    pokemonList.forEach((pokemon) => {
      tempData.pokemon[pokemon.id.toString()] = pokemon;
    });

    return mergeGenerationData(tempData, generation);
  }

  /**
   * Get a single Pokémon by ID
   */
  public getPokemonById(
    id: number,
    generation: string = 'gen9'
  ): RawPokemonData | null {
    if (!this.isLoaded || !this.migratedData) {
      throw new Error('Pokédex data not loaded. Call loadData() first.');
    }

    const pokemon = this.migratedData.pokemon[id.toString()];
    if (!pokemon) {
      return null;
    }

    // Merge generation data for this single pokemon
    const merged = this.mergeGenerationDataForPokemon([pokemon], generation);
    return merged[0] || null;
  }

  /**
   * Get total count of loaded Pokémon
   */
  public getPokemonCount(): number {
    if (!this.migratedData) {
      return 0;
    }
    return Object.keys(this.migratedData.pokemon).length;
  }

  /**
   * Check if data is loaded
   */
  public isDataLoaded(): boolean {
    return this.isLoaded;
  }

  /**
   * Get available generations
   */
  public getAvailableGenerations(): string[] {
    if (!this.migratedData) {
      return ['gen9']; // Fallback
    }
    try {
      return getAvailableGenerations(this.migratedData);
    } catch (error) {
      console.error('Failed to get available generations:', error);
      return ['gen9']; // Fallback
    }
  }
}

// Export singleton instance
export const pokedexService = PokedexService.getInstance();
