import { Pokemon } from '../../../lib/api-client/generated.api';

export interface EnhancedPokemon extends Pokemon {
  // Derived properties for UI
  isDead: boolean;
  isLinked: boolean;
  inBox: boolean;
  inTeam: boolean;
  validTeamLink: boolean;
  linkGroup: string | null;
}

/**
 * Computes derived properties for a Pokémon based on the current session state
 */
export function enhancePokemon(
  pokemon: Pokemon,
  allSessionPokemon: Pokemon[]
): EnhancedPokemon {
  // Basic derived properties
  const isDead = pokemon.status === 'DEAD';
  const inBox = pokemon.location === 'BOX';
  const inTeam = pokemon.location === 'TEAM';

  // Link group is based on route name (Pokémon on the same route are linked)
  const linkGroup = pokemon.routeName;

  // Get linked Pokémon (same route, different players)
  const linkedPokemon = allSessionPokemon.filter(
    (p) => p.routeName === pokemon.routeName && p.user.id !== pokemon.user.id
  );

  // Check if this Pokémon is linked (has other players on the same route)
  const isLinked = linkedPokemon.length > 0;

  // Check if team link is valid (all linked Pokémon are also in teams)
  const validTeamLink = inTeam && isLinked 
    ? linkedPokemon.every((p) => p.location === 'TEAM')
    : true;

  return {
    ...pokemon,
    isDead,
    isLinked,
    inBox,
    inTeam,
    validTeamLink,
    linkGroup,
  };
}

/**
 * Computes derived properties for all Pokémon in a session
 */
export function enhanceAllPokemon(
  allSessionPokemon: Pokemon[]
): EnhancedPokemon[] {
  return allSessionPokemon.map((pokemon) =>
    enhancePokemon(pokemon, allSessionPokemon)
  );
}

/**
 * Gets the CSS class for a Pokémon box based on its state
 */
export function getPokemonBoxClass(pokemon: EnhancedPokemon | null): string {
  if (!pokemon) return 'empty';

  if (pokemon.isDead) return 'dead';
  if (pokemon.inTeam && !pokemon.validTeamLink && pokemon.linkGroup) return 'invalidTeamLink';
  if (!pokemon.isLinked) return 'mismatch';
  if (pokemon.linkGroup && pokemon.isLinked) return 'linked';

  return '';
}

/**
 * Validates if a Pokémon can be moved to team
 */
export function canMoveToTeam(
  pokemon: EnhancedPokemon,
  allSessionPokemon: Pokemon[]
): { canMove: boolean; reason?: string } {
  if (pokemon.isDead) {
    return { canMove: false, reason: 'Dead Pokémon cannot be moved to team' };
  }

  if (pokemon.inTeam) {
    return { canMove: false, reason: 'Pokémon is already in team' };
  }

  // Check if linked to dead Pokémon
  const linkedPokemon = allSessionPokemon.filter(
    (p) => p.routeName === pokemon.routeName && p.user.id !== pokemon.user.id
  );
  const linkedToDead = linkedPokemon.some((p) => p.status === 'DEAD');
  if (linkedToDead) {
    return { canMove: false, reason: 'Pokémon is linked to a dead Pokémon' };
  }

  // Check if team is full
  const userTeam = allSessionPokemon.filter(
    (p) => p.user.id === pokemon.user.id && p.location === 'TEAM'
  );
  if (userTeam.length >= 6) {
    return { canMove: false, reason: 'Team is full' };
  }

  return { canMove: true };
} 