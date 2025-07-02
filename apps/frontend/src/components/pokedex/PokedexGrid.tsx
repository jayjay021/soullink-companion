import { Grid } from '@mantine/core';

import PokedexCard from './PokedexCard';
import { PokedexPokemon } from '../../lib/api-client/generated.api';



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