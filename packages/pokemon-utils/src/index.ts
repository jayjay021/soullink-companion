// Types for Pokemon data
export interface Pokemon {
  id: string;
  playerId: string;
  sessionId: string;
  pokemonId: number;
  routeName: string;
  status: 'CAUGHT' | 'NOT_CAUGHT' | 'DEAD';
  location: 'TEAM' | 'BOX';
  position: number;
}

export interface PokemonData {
  id: number;
  name: string;
  evolution_next?: number;
  evolution_prev?: number;
  [key: string]: unknown;
}

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

    // Reassign positions to remove gaps
    return boxPokemon.map((p, index) => ({
      ...p,
      position: index + 1,
    }));
  }

  /**
   * Validates and adjusts positions when moving a Pokemon
   */
  static validateMove(
    pokemon: Pokemon[],
    pokemonId: string,
    newLocation: 'TEAM' | 'BOX',
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

    // Validate team position
    if (newLocation === 'TEAM') {
      if (newPosition < 1 || newPosition > 6) {
        return {
          valid: false,
          adjustedPokemon: [],
          error: 'Team position must be between 1 and 6',
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
      if (newPosition < 1) {
        return {
          valid: false,
          adjustedPokemon: [],
          error: 'Box position must be >= 1',
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
   * Gets the next available team position
   */
  static getNextTeamPosition(
    pokemon: Pokemon[],
    playerId: string
  ): number | null {
    const playerTeam = pokemon.filter(
      (p) => p.playerId === playerId && p.location === 'TEAM'
    );
    const usedPositions = new Set(playerTeam.map((p) => p.position));

    for (let i = 1; i <= 6; i++) {
      if (!usedPositions.has(i)) {
        return i;
      }
    }
    return null; // Team is full
  }

  /**
   * Gets the next box position (always at the end)
   */
  static getNextBoxPosition(pokemon: Pokemon[], playerId: string): number {
    const playerBox = pokemon.filter(
      (p) => p.playerId === playerId && p.location === 'BOX'
    );
    return Math.max(0, ...playerBox.map((p) => p.position)) + 1;
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

    // Follow evolution chain backwards
    let current: PokemonData | undefined = species;
    while (current?.evolution_prev) {
      const prevId: number = current.evolution_prev;
      evolutionLine.add(prevId);
      current = pokemonData.find((p) => p.id === prevId);
      if (!current) break;
    }

    // Follow evolution chain forwards
    current = species;
    while (current?.evolution_next) {
      const nextId: number = current.evolution_next;
      evolutionLine.add(nextId);
      current = pokemonData.find((p) => p.id === nextId);
      if (!current) break;
    }

    return Array.from(evolutionLine);
  }

  /**
   * Checks if a species can be caught (evolution line not already caught)
   */
  static canCatchSpecies(
    speciesId: number,
    playerId: string,
    sessionId: string,
    existingPokemon: Pokemon[],
    pokemonData: PokemonData[]
  ): { canCatch: boolean; reason?: string } {
    const evolutionLine = this.getEvolutionLine(speciesId, pokemonData);

    const alreadyCaught = existingPokemon.find(
      (p) =>
        p.playerId === playerId &&
        p.sessionId === sessionId &&
        evolutionLine.includes(p.pokemonId) &&
        (p.status === 'CAUGHT' || p.status === 'DEAD')
    );

    if (alreadyCaught) {
      const caughtSpecies = pokemonData.find(
        (p) => p.id === alreadyCaught.pokemonId
      );
      return {
        canCatch: false,
        reason: `Evolution line already caught: ${caughtSpecies?.name || 'Unknown'} on ${alreadyCaught.routeName}`,
      };
    }

    return { canCatch: true };
  }

  /**
   * Checks if a Pokemon is valid (has complete soul link and team coordination)
   */
  static isPokemonValid(
    pokemon: Pokemon,
    allPokemon: Pokemon[],
    sessionPlayerIds: string[]
  ): boolean {
    // Get all players who have a Pokemon on this route
    const playersWithRouteLink = new Set(
      allPokemon
        .filter(
          (p) =>
            p.sessionId === pokemon.sessionId &&
            p.routeName === pokemon.routeName
        )
        .map((p) => p.playerId)
    );

    // Check if ALL players in the session have a Pokemon on this route (complete soul link)
    if (playersWithRouteLink.size !== sessionPlayerIds.length) {
      return false;
    }

    // If this Pokemon is in a team, check if all linked Pokemon are also in their teams
    if (pokemon.location === 'TEAM') {
      const linkedPokemon = this.getLinkedPokemon(pokemon, allPokemon);
      return linkedPokemon.every((linked) => linked.location === 'TEAM');
    }

    return true;
  }

  /**
   * Checks if a Pokemon can be moved to team (not dead or linked to dead)
   */
  static canMoveToTeam(
    pokemonId: string,
    allPokemon: Pokemon[]
  ): { canMove: boolean; reason?: string } {
    const pokemon = allPokemon.find((p) => p.id === pokemonId);
    if (!pokemon) {
      return { canMove: false, reason: 'Pokemon not found' };
    }

    // Can't move dead Pokemon
    if (pokemon.status === 'DEAD') {
      return { canMove: false, reason: 'Dead Pokemon cannot be moved to team' };
    }

    // Check if linked to dead Pokemon
    if (this.isLinkedToDead(pokemon, allPokemon)) {
      return { canMove: false, reason: 'Pokemon is linked to a dead Pokemon' };
    }

    return { canMove: true };
  }

  /**
   * Checks if a Pokemon is linked to a dead Pokemon
   */
  static isLinkedToDead(pokemon: Pokemon, allPokemon: Pokemon[]): boolean {
    // Get all Pokemon on the same route in the same session (excluding self)
    const linkedPokemon = allPokemon.filter(
      (p) =>
        p.sessionId === pokemon.sessionId &&
        p.routeName === pokemon.routeName &&
        p.id !== pokemon.id
    );

    // Check if any linked Pokemon is dead
    return linkedPokemon.some((p) => p.status === 'DEAD');
  }

  /**
   * Gets all Pokemon linked to a given Pokemon (same route, same session)
   */
  static getLinkedPokemon(pokemon: Pokemon, allPokemon: Pokemon[]): Pokemon[] {
    return allPokemon.filter(
      (p) =>
        p.sessionId === pokemon.sessionId &&
        p.routeName === pokemon.routeName &&
        p.id !== pokemon.id
    );
  }

  /**
   * Checks if a player's team is valid (all team Pokemon have their linked Pokemon in teams too)
   */
  static isTeamValid(playerId: string, allPokemon: Pokemon[]): boolean {
    const playerTeam = allPokemon.filter(
      (p) => p.playerId === playerId && p.location === 'TEAM'
    );

    for (const teamPokemon of playerTeam) {
      const linkedPokemon = this.getLinkedPokemon(teamPokemon, allPokemon);

      // Check if all linked Pokemon are also in their respective teams
      for (const linked of linkedPokemon) {
        if (linked.location !== 'TEAM') {
          return false;
        }
      }
    }

    return true;
  }
}
