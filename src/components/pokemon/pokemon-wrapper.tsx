import React, { forwardRef } from 'react';
import { Image } from '@mantine/core';
import type { Pokemon } from './pokemon-tooltip';

interface PokemonWrapperProps
  extends Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'onDragStart' | 'onDragEnd'
  > {
  pokemon: Pokemon;
  onDragStart: (e: React.DragEvent, pokemon: Pokemon) => void;
  onDragEnd: () => void;
}

// Wrapper component for Pokemon with forwardRef for proper tooltip positioning
export const PokemonWrapper = forwardRef<HTMLDivElement, PokemonWrapperProps>(
  ({ pokemon, onDragStart, onDragEnd, ...props }, ref) => (
    <div
      ref={ref}
      draggable
      onDragStart={(e) => onDragStart(e, pokemon)}
      onDragEnd={onDragEnd}
      style={{ cursor: 'pointer' }}
      {...props}
    >
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width={64}
        height={64}
        fit="contain"
      />
    </div>
  )
);

PokemonWrapper.displayName = 'PokemonWrapper';
