import { Badge } from '@mantine/core';

const typeColors: Record<string, string> = {
  Normal: 'gray',
  Fire: 'red',
  Water: 'blue',
  Electric: 'yellow',
  Grass: 'green',
  Ice: 'cyan',
  Fighting: 'orange',
  Poison: 'violet',
  Ground: 'yellow',
  Flying: 'indigo',
  Psychic: 'pink',
  Bug: 'lime',
  Rock: 'orange',
  Ghost: 'violet',
  Dragon: 'purple',
  Dark: 'gray',
  Steel: 'gray',
  Fairy: 'pink',
};

interface PokedexTypeBadgeProps {
  type: string;
}

const PokedexTypeBadge = ({ type }: PokedexTypeBadgeProps) => (
  <Badge color={typeColors[type] || 'blue'} variant="light" size="sm">
    {type}
  </Badge>
);

export default PokedexTypeBadge; 