// Base interface for generation data structure
export interface GenerationalData<T = Record<string, unknown>> {
  generationData: {
    [generation: string]: T | GenerationEntry<T>;
  };
}

export interface GenerationEntry<T = Record<string, unknown>> {
  inheritsFrom?: string;
  changes?: Partial<T>;
}

// Pokemon-specific interfaces
export interface PokemonGenerationData {
  types: string[];
  baseStats: {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
  };
  abilities: string[][];
  evolution?: {
    prev?: [string, string];
    next?: [string, string][];
  };
  description: string;
}

export interface PokemonData extends GenerationalData<PokemonGenerationData> {
  id: number;
  name: {
    english: string;
    japanese?: string;
    german?: string;
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
}

// Type-specific interfaces (for reference)
export interface TypeGenerationData {
  effectiveness: Record<string, number>;
  color: string;
  category: "physical" | "special" | "status";
}

export interface TypeData extends GenerationalData<TypeGenerationData> {
  id: number;
  name: {
    english: string;
    japanese?: string;
    german?: string;
  };
}

// Generic utility function to resolve generation data
export function resolveGenerationData<T>(
  data: GenerationalData<T>,
  targetGeneration: string,
  generationOrder: string[] = ["gen1", "gen2", "gen3", "gen4", "gen5", "gen6", "gen7", "gen8", "gen9"]
): T {
  const genData = data.generationData[targetGeneration];
  
  if (!genData) {
    throw new Error(`Generation ${targetGeneration} not found`);
  }
  
  // Check if it has inheritance properties
  if (typeof genData === 'object' && genData !== null && 'inheritsFrom' in genData) {
    // Handle inheritance
    const inheritEntry = genData as GenerationEntry<T>;
    if (!inheritEntry.inheritsFrom) {
      return genData as T;
    }
    
    // Recursively resolve the inherited data
    const baseData = resolveGenerationData(data, inheritEntry.inheritsFrom, generationOrder);
    
    // Deep merge the changes
    return deepMerge(baseData as Record<string, unknown>, inheritEntry.changes || {}) as T;
  }
  
  // If it's a direct generation entry (no inheritance)
  return genData as T;
}

// Deep merge utility function
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] as Record<string, unknown> || {}, source[key] as Record<string, unknown>);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

// Example usage:
// const pokemon = pokemonData["1"];
// const gen3Data = resolveGenerationData(pokemon, "gen3");
// const typeData = resolveGenerationData(typeData["fire"], "gen4");
