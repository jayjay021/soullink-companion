import type { components } from '@repo/api-spec/types';
import pokemonData from './pokemon-data.json';

type PokedexPokemon = components['schemas']['PokedexPokemon'];

interface PokedexQueryParams {
  id?: number;
  name?: string;
}

class PokedexService {
  private static instance: PokedexService;
  private pokemonData: PokedexPokemon[] = [];
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
      this.pokemonData = pokemonData as PokedexPokemon[];
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
   * Get Pokémon data with optional filters
   */
  public getPokemon(params: PokedexQueryParams = {}): PokedexPokemon[] {
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

    return filteredPokemon;
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
