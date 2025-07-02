import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';

// Use generated types from API spec
export type Pokemon = z.infer<typeof schemas.Pokemon>;
export type PokemonStatus = z.infer<typeof schemas.PokemonStatus>;
export type PokemonLocation = z.infer<typeof schemas.PokemonLocation>;
export type PokemonData = z.infer<typeof schemas.PokedexPokemon>;



// Position management utilities
export class PokemonPositionManager {
  /**
   * Reorganizes box positions to remove gaps after a Pokemon is removed
   */
  static reorganizeBoxPositions(
    pokemon: Pokemon[],
    removedPokemonId?: string
  ): Pokemon[] {
    const boxPokemon = pokemon
      .filter((p) => p.location === 'BOX' && p.id !== removedPokemonId)
      .sort((a, b) => a.position - b.position);

    // Reassign positions to remove gaps (0-based indexing)
    return boxPokemon.map((p, index) => ({
      ...p,
      position: index,
    }));
  }

  /**
   * Validates and adjusts positions when moving a Pokemon
   */
  static validateMove(
    pokemon: Pokemon[],
    pokemonId: string,
    newLocation: PokemonLocation,
    newPosition: number
  ): { valid: boolean; adjustedPokemon: Pokemon[]; error?: string } {
    const targetPokemon = pokemon.find((p) => p.id === pokemonId);
    if (!targetPokemon) {
      return { valid: false, adjustedPokemon: [], error: 'Pokemon not found' };
    }

    // If no change, return early
    if (
      targetPokemon.location === newLocation &&
      targetPokemon.position === newPosition
    ) {
      return { valid: true, adjustedPokemon: [] };
    }

    // Validate team position (0-based indexing: 0-5)
    if (newLocation === 'TEAM') {
      if (newPosition < 0 || newPosition > 5) {
        return {
          valid: false,
          adjustedPokemon: [],
          error: 'Team position must be between 0 and 5',
        };
      }
      // Check if position is occupied
      const occupying = pokemon.find(
        (p) =>
          p.location === 'TEAM' &&
          p.position === newPosition &&
          p.id !== pokemonId
      );
      if (occupying) {
        return {
          valid: false,
          adjustedPokemon: [],
          error: `Team position ${newPosition} is already occupied`,
        };
      }
    }

    if (newLocation === 'BOX') {
      if (newPosition < 0) {
        return {
          valid: false,
          adjustedPokemon: [],
          error: 'Box position must be >= 0',
        };
      }
      // Check if position is occupied
      const occupying = pokemon.find(
        (p) =>
          p.location === 'BOX' &&
          p.position === newPosition &&
          p.id !== pokemonId
      );
      if (occupying) {
        return {
          valid: false,
          adjustedPokemon: [],
          error: `Box position ${newPosition} is already occupied`,
        };
      }
    }

    // Create new pokemon array with the move
    const updatedPokemon = pokemon.map((p) =>
      p.id === pokemonId
        ? { ...p, location: newLocation, position: newPosition }
        : p
    );

    // If moving to box, reorganize positions
    if (newLocation === 'BOX') {
      const boxPokemon = this.reorganizeBoxPositions(updatedPokemon);
      const otherPokemon = updatedPokemon.filter((p) => p.location === 'TEAM');
      return { valid: true, adjustedPokemon: [...otherPokemon, ...boxPokemon] };
    }

    return { valid: true, adjustedPokemon: updatedPokemon };
  }

  /**
   * Gets the next available team position (0-based indexing)
   */
  static getNextTeamPosition(
    pokemon: Pokemon[],
    userId: string
  ): number | null {
    const playerTeam = pokemon.filter(
      (p) => p.user.id === userId && p.location === 'TEAM'
    );
    const usedPositions = new Set(playerTeam.map((p) => p.position));

    for (let i = 0; i <= 5; i++) {
      if (!usedPositions.has(i)) {
        return i;
      }
    }
    return null; // Team is full
  }

  /**
   * Gets the next box position (always at the end, 0-based indexing)
   */
  static getNextBoxPosition(pokemon: Pokemon[], userId: string): number {
    const playerBox = pokemon.filter(
      (p) => p.user.id === userId && p.location === 'BOX'
    );
    return Math.max(-1, ...playerBox.map((p) => p.position)) + 1;
  }
}

// Evolution and validation utilities
export class PokemonValidationManager {
  /**
   * Gets all Pokemon IDs in the same evolution line
   */
  static getEvolutionLine(
    speciesId: number,
    pokemonData: PokemonData[]
  ): number[] {
    const species = pokemonData.find((p) => p.id === speciesId);
    if (!species) return [speciesId];

    const evolutionLine = new Set<number>([speciesId]);

    // Follow evolution chain backwards to find the base form
    let current: PokemonData | undefined = species;
    while (current?.evolution?.prev) {
      const prevId: number = parseInt(current.evolution.prev[0]);
      evolutionLine.add(prevId);
      current = pokemonData.find((p) => p.id === prevId);
      if (!current) break;
    }

    // Now start from the base form and follow all evolution chains forward
    const baseForm = current || species;
    const visited = new Set<number>();
    
    const traverseForward = (pokemon: PokemonData) => {
      if (visited.has(pokemon.id)) return;
      visited.add(pokemon.id);
      evolutionLine.add(pokemon.id);
      
      if (pokemon.evolution?.next) {
        for (const next of pokemon.evolution.next) {
          const nextId = parseInt(next[0]);
          const nextPokemon = pokemonData.find((p) => p.id === nextId);
          if (nextPokemon) {
            traverseForward(nextPokemon);
          }
        }
      }
    };

    traverseForward(baseForm);

    return Array.from(evolutionLine).sort((a, b) => a - b);
  }

  /**
   * Checks if a species can be caught (evolution line not already caught)
   */
  static canCatchSpecies(
    speciesId: number,
    userId: string,
    existingPokemon: Pokemon[],
    pokemonData: PokemonData[]
  ): { canCatch: boolean; reason?: string } {
    const evolutionLine = this.getEvolutionLine(speciesId, pokemonData);
    const userPokemon = existingPokemon.filter((p) => p.user.id === userId);

    // Check if any Pokemon in the evolution line is already caught
    const caughtInLine = userPokemon.some((p) =>
      evolutionLine.includes(p.pokemonId)
    );

    if (caughtInLine) {
      return {
        canCatch: false,
        reason: 'A Pokemon in this evolution line is already caught',
      };
    }

    return { canCatch: true };
  }

  /**
   * Validates if a Pokemon object is valid
   */
  static isPokemonValid(
    pokemon: Pokemon,
    allPokemon: Pokemon[],
    sessionuserIds: string[]
  ): boolean {
    // Check if user exists in session
    if (!sessionuserIds.includes(pokemon.user.id)) {
      return false;
    }

    // Check if position is valid for location
    if (pokemon.location === 'TEAM' && (pokemon.position < 0 || pokemon.position > 5)) {
      return false;
    }

    if (pokemon.location === 'BOX' && pokemon.position < 0) {
      return false;
    }

    // Check for duplicate positions in same location for same user
    const duplicatePosition = allPokemon.some(
      (p) =>
        p.id !== pokemon.id &&
        p.user.id === pokemon.user.id &&
        p.location === pokemon.location &&
        p.position === pokemon.position
    );

    return !duplicatePosition;
  }

  /**
   * Checks if a Pokemon can be moved to team
   */
  static canMoveToTeam(
    pokemonId: string,
    allPokemon: Pokemon[]
  ): { canMove: boolean; reason?: string } {
    const pokemon = allPokemon.find((p) => p.id === pokemonId);
    if (!pokemon) {
      return { canMove: false, reason: 'Pokemon not found' };
    }

    if (pokemon.location === 'TEAM') {
      return { canMove: false, reason: 'Pokemon is already in team' };
    }

    // Check if team is full
    const userTeam = allPokemon.filter(
      (p) => p.user.id === pokemon.user.id && p.location === 'TEAM'
    );

    if (userTeam.length >= 6) {
      return { canMove: false, reason: 'Team is full' };
    }

    return { canMove: true };
  }

  /**
   * Checks if a Pokemon is linked to a dead Pokemon
   */
  static isLinkedToDead(pokemon: Pokemon, allPokemon: Pokemon[]): boolean {
    const linkedPokemon = this.getLinkedPokemon(pokemon, allPokemon);
    return linkedPokemon.some((p) => p.status === 'DEAD');
  }

  /**
   * Gets all Pokemon linked to the given Pokemon (same species)
   */
  static getLinkedPokemon(pokemon: Pokemon, allPokemon: Pokemon[]): Pokemon[] {
    return allPokemon.filter(
      (p) => p.pokemonId === pokemon.pokemonId && p.id !== pokemon.id
    );
  }

  /**
   * Checks if a user's team is valid (no dead Pokemon)
   */
  static isTeamValid(userId: string, allPokemon: Pokemon[]): boolean {
    const userTeam = allPokemon.filter(
      (p) => p.user.id === userId && p.location === 'TEAM'
    );
    return !userTeam.some((p) => p.status === 'DEAD');
  }
}
