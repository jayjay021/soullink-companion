import { NextRequest, NextResponse } from 'next/server';
import { logger, logApiRequest, logApiError } from '@/lib/logger';
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
  const start = Date.now();
  const apiLogger = logger.child({
    component: 'api',
    endpoint: '/api/pokemon',
  });

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    apiLogger.info({ query }, 'Searching Pokemon');

    const pokemons: PokemonData[] = pokemonData;
    const filtered = query
      ? pokemons.filter(
          (pokemon) =>
            pokemon.names.de.toLowerCase().startsWith(query) ||
            pokemon.names.en.toLowerCase().startsWith(query)
        )
      : pokemons;

    // Limit to 30 results for performance
    const results = filtered.slice(0, 30);
    const duration = Date.now() - start;

    apiLogger.info(
      {
        query,
        resultCount: results.length,
        totalAvailable: filtered.length,
        duration: `${duration}ms`,
      },
      'Pokemon search completed'
    );

    logApiRequest('GET', '/api/pokemon', duration);

    return NextResponse.json(results);
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    logApiError('GET', '/api/pokemon', error, 500);
    apiLogger.error(
      {
        error: errorMessage,
        stack: errorStack,
        duration: `${duration}ms`,
      },
      'Pokemon search failed'
    );

    return NextResponse.json(
      { error: 'Failed to search Pokemon' },
      { status: 500 }
    );
  }
}
