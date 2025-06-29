import { Card, Stack, Group, Image, Title, Text } from '@mantine/core';
import PokedexTypeBadge from './PokedexTypeBadge';
import PokedexStats from './PokedexStats';
import styles from './PokedexCard.module.css';
import type { PokedexPokemon } from '../../lib/api-client/generated.api';

const fallbackImg = 'https://placehold.co/120x120?text=?';


interface PokedexCardProps {
  pokemon: PokedexPokemon;
}

const PokedexCard = ({ pokemon }: PokedexCardProps) => (
  <Card withBorder p="md" className={styles.card} tabIndex={0}>
    <Stack gap="md" align="center">
      <Image
        src={pokemon.image.sprite}
        alt={`${pokemon.name.english} sprite`}
        width={120}
        height={120}
        fallbackSrc={fallbackImg}
        loading="lazy"
        fit="contain"
        className={styles.image}
      />
      <Stack gap="xs" align="center">
        <Title order={4} size="h5" ta="center">
          #{pokemon.id} {pokemon.name.english}
        </Title>
        <Group gap="xs" justify="center">
          {pokemon.type.map((type) => (
            <PokedexTypeBadge key={type} type={type} />
          ))}
        </Group>
        <Text size="sm" c="dimmed" ta="center">
          {pokemon.species}
        </Text>
        <Text size="xs" c="dimmed" ta="center" lineClamp={2}>
          {pokemon.description}
        </Text>
      </Stack>
      <PokedexStats base={pokemon.base} />
    </Stack>
  </Card>
);

export default PokedexCard; 