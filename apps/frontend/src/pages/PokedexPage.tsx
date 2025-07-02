import { useState } from 'react';
import { Container, Title, Stack, Card, Text, Loader } from '@mantine/core';
import { useGetPokedexPokemonQuery } from '../lib/api-client/generated.api';
import PokedexSearch from '../components/pokedex/PokedexSearch';
import PokedexGrid from '../components/pokedex/PokedexGrid';
import PokedexPagination from '../components/pokedex/PokedexPagination';
import type { PokedexPokemon } from '../lib/api-client/generated.api';

export function PokedexPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [filters, setFilters] = useState({
    id: undefined as number | undefined,
    name: '',
    type: '',
    minId: '' as number | '',
    maxId: '' as number | '',
  });

  const { data: pokedexResponse, isLoading } = useGetPokedexPokemonQuery({
    id: filters.id,
    name: filters.name || undefined,
    type: filters.type || undefined,
    minId: filters.minId === '' ? undefined : Number(filters.minId),
    maxId: filters.maxId === '' ? undefined : Number(filters.maxId),
    limit,
    offset: (page - 1) * limit,
  });

  const pokedexPokemon = pokedexResponse?.pokemon || [];

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  // All types for filter dropdown (from current page data, ideally should be static or fetched separately)
  const allTypes = Array.from(
    new Set((pokedexResponse?.pokemon || []).flatMap((p: PokedexPokemon) => p.type))
  ).sort() as string[];

  // Count summary
  const countSummary = pokedexResponse
    ? `Showing ${pokedexResponse.pokemon.length} of ${pokedexResponse.pagination.total} Pokemon`
    : 'Loading...';

  return (
    <Container size="lg">
      <Stack gap="lg">
        <Title order={1}>Pokedex</Title>
        
        <PokedexSearch
          searchTerm={filters.name}
          setSearchTerm={(v: string) => handleFiltersChange({ ...filters, name: v })}
          selectedType={filters.type}
          setSelectedType={(v: string) => handleFiltersChange({ ...filters, type: v })}
          minId={filters.minId}
          setMinId={(v: number | '') => handleFiltersChange({ ...filters, minId: v })}
          maxId={filters.maxId}
          setMaxId={(v: number | '') => handleFiltersChange({ ...filters, maxId: v })}
          allTypes={allTypes}
          countSummary={countSummary}
        />

        <Card withBorder p="md">
          {isLoading ? (
            <Stack gap="md" align="center" py="xl">
              <Loader size="lg" />
              <Text>Loading Pokedex data...</Text>
            </Stack>
          ) : pokedexPokemon.length > 0 ? (
            <div style={{ width: '100%' }}>
              <PokedexGrid pokemon={pokedexPokemon} />
            </div>
          ) : (
            <Stack gap="md" align="center" py="xl">
              <Text>No Pokemon found matching your criteria.</Text>
            </Stack>
          )}
          {/* Pagination always visible */}
          {pokedexResponse && (
            <PokedexPagination
              total={pokedexResponse.pagination.total}
              limit={pokedexResponse.pagination.limit}
              offset={pokedexResponse.pagination.offset}
              onPageChange={setPage}
            />
          )}
        </Card>
      </Stack>
    </Container>
  );
} 