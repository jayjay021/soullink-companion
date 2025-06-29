import { Grid } from '@mantine/core';
import type { components } from '@repo/api-spec/types';
import PokedexCard from './PokedexCard';

type PokedexPokemon = components['schemas']['PokedexPokemon'];

interface PokedexGridProps {
  pokemon: PokedexPokemon[];
}

const PokedexGrid = ({ pokemon }: PokedexGridProps) => (
  <Grid>
    {pokemon.map((p) => (
      <Grid.Col key={p.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
        <PokedexCard pokemon={p} />
      </Grid.Col>
    ))}
  </Grid>
);

export default PokedexGrid; 