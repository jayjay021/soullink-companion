import { NextRequest, NextResponse } from 'next/server';
import pokemonData from './pokemon.json';

export type PokemonData = {
  names: {
    de: string;
    en: string;
  };
  image: string;
  id: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const pokemons: PokemonData[] = pokemonData;
  const filtered = query
    ? pokemons.filter(
        (pokemon) =>
          pokemon.names.de.toLowerCase().startsWith(query) ||
          pokemon.names.en.toLowerCase().startsWith(query)
      )
    : pokemons;
  // Limit to 30 results for performance
  return NextResponse.json(filtered.slice(0, 30));
}
