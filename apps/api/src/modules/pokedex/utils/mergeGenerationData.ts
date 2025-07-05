import { RawPokemonData } from '../pokedex.types';

// Type definitions for the new migrated format
export interface MigratedPokemonData {
  id: number;
  name: {
    english: string;
    japanese: string;
    german: string;
  };
  species: string;
  baseData: {
    height: string;
    weight: string;
    eggGroups: string[];
    genderRatio: string;
    images: {
      sprite: string;
      thumbnail: string;
      hires: string;
    };
  };
  generationData: {
    [generation: string]: {
      types?: string[];
      baseStats?: {
        HP: number;
        Attack: number;
        Defense: number;
        'Sp. Attack': number;
        'Sp. Defense': number;
        Speed: number;
      };
      abilities?: string[][]; // Changed from [string, string][] to string[][]
      evolution?: {
        prev?: string[];
        next?: string[][];
      };
      description?: string;
      inheritsFrom?: string;
    };
  };
}

export interface MigratedDataStructure {
  pokemon: {
    [id: string]: MigratedPokemonData;
  };
  types?: {
    [id: string]: unknown; // Types might be added later
  };
}

interface GenerationDataResolved {
  types?: string[];
  baseStats?: {
    HP: number;
    Attack: number;
    Defense: number;
    'Sp. Attack': number;
    'Sp. Defense': number;
    Speed: number;
  };
  abilities?: string[][]; // Changed from [string, string][] to string[][]
  evolution?: {
    prev?: string[];
    next?: string[][];
  };
  description?: string;
}

/**
 * Merges generation-specific data into a flat Pokemon structure
 * compatible with the existing API schema
 */
export function mergeGenerationData(
  migratedData: MigratedDataStructure,
  generation: string = 'gen9'
): RawPokemonData[] {
  const { pokemon } = migratedData;
  const result: RawPokemonData[] = [];

  Object.values(pokemon).forEach((pokemonData) => {
    const mergedData = getMergedPokemonData(pokemonData, generation);
    if (mergedData) {
      result.push(mergedData);
    }
  });

  // Sort by ID to maintain consistent ordering
  return result.sort((a, b) => a.id - b.id);
}

/**
 * Gets merged data for a single Pokemon, resolving inheritance chains
 */
function getMergedPokemonData(
  pokemonData: MigratedPokemonData,
  targetGeneration: string
): RawPokemonData | null {
  const generationData = pokemonData.generationData[targetGeneration];
  if (!generationData) {
    return null;
  }

  // Resolve inheritance chain
  const resolvedData = resolveInheritance(pokemonData, targetGeneration);
  if (!resolvedData) {
    return null;
  }

  // Convert to the expected flat structure
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    type: resolvedData.types || [],
    base: resolvedData.baseStats || {
      HP: 0,
      Attack: 0,
      Defense: 0,
      'Sp. Attack': 0,
      'Sp. Defense': 0,
      Speed: 0,
    },
    species: pokemonData.species,
    description: resolvedData.description || '',
    evolution: resolvedData.evolution
      ? {
          ...(resolvedData.evolution.prev && {
            prev:
              Array.isArray(resolvedData.evolution.prev) &&
              resolvedData.evolution.prev.length >= 2
                ? ([
                    resolvedData.evolution.prev[0],
                    resolvedData.evolution.prev[1],
                  ] as [string, string])
                : undefined,
          }),
          ...(resolvedData.evolution.next && {
            next: resolvedData.evolution.next.map((evo) =>
              Array.isArray(evo) && evo.length >= 2
                ? ([evo[0], evo[1]] as [string, string])
                : (['Unknown', 'Unknown'] as [string, string])
            ),
          }),
        }
      : {},
    profile: {
      height: pokemonData.baseData.height,
      weight: pokemonData.baseData.weight,
      egg: pokemonData.baseData.eggGroups,
      ability: (resolvedData.abilities || []).map((ability) =>
        Array.isArray(ability) && ability.length >= 2
          ? ([ability[0], ability[1]] as [string, string])
          : (['Unknown', 'false'] as [string, string])
      ),
      gender: pokemonData.baseData.genderRatio,
    },
    image: {
      sprite: pokemonData.baseData.images.sprite,
      thumbnail: pokemonData.baseData.images.thumbnail,
      hires: pokemonData.baseData.images.hires,
    },
  };
}

/**
 * Resolves inheritance chain for a Pokemon's generation data
 */
function resolveInheritance(
  pokemonData: MigratedPokemonData,
  targetGeneration: string,
  visited: Set<string> = new Set()
): GenerationDataResolved | null {
  // Prevent infinite loops
  if (visited.has(targetGeneration)) {
    console.warn(
      `Circular inheritance detected for Pokemon ${pokemonData.id} in generation ${targetGeneration}`
    );
    return null;
  }
  visited.add(targetGeneration);

  const generationData = pokemonData.generationData[targetGeneration];
  if (!generationData) {
    return null;
  }

  // If this generation inherits from another, resolve that first
  if (generationData.inheritsFrom) {
    const baseData = resolveInheritance(
      pokemonData,
      generationData.inheritsFrom,
      visited
    );
    if (!baseData) {
      return generationData; // Fallback to current data if inheritance fails
    }

    // Merge the base data with current generation's overrides
    return {
      ...baseData,
      ...Object.fromEntries(
        Object.entries(generationData).filter(([key]) => key !== 'inheritsFrom')
      ),
    };
  }

  // This is a base generation (no inheritance)
  return generationData;
}

/**
 * Gets available generations from the migrated data
 */
export function getAvailableGenerations(
  migratedData: MigratedDataStructure
): string[] {
  const generations = new Set<string>();

  Object.values(migratedData.pokemon).forEach((pokemon) => {
    Object.keys(pokemon.generationData).forEach((gen) => {
      generations.add(gen);
    });
  });

  return Array.from(generations).sort();
}
