import React, { useState } from 'react';
import { HoverCard, Tooltip } from '@mantine/core';
import styles from './pokemon-grid.module.css';
import { PokemonTooltip } from './pokemon-tooltip';
import { PokemonWrapper } from './pokemon-wrapper';
import { EnhancedPokemon } from './pokemon-utils';

interface SessionPlayer {
  id: string;
  username: string;
}

interface PokemonGridProps {
  pokemons: EnhancedPokemon[];
  isTeam?: boolean;
  onPokemonMove?: (
    pokemonId: string,
    newPosition: number,
    toTeam: boolean
  ) => void;
  onEmptySlotClick?: (isTeam: boolean, position: number) => void;
  sessionPlayers?: SessionPlayer[];
  allSessionPokemon?: EnhancedPokemon[];
  sessionId: string;
  canAddPokemon?: boolean;
}

const getBoxClass = (
  poke: EnhancedPokemon | null,
  isDragging: boolean,
  isDragOver: boolean
) => {
  let classes = styles.pokemonBox;

  if (!poke) {
    classes += ` ${styles.empty}`;
  } else {
    // Priority order for borders (highest to lowest):
    // 1. Dead (red)
    // 2. Invalid team link (orange)
    // 3. Not linked yet (yellow)
    // 4. Linked successfully (green)
    if (poke.isDead) {
      classes += ` ${styles.dead}`;
    } else if (poke.inTeam && !poke.validTeamLink && poke.linkGroup) {
      classes += ` ${styles.invalidTeamLink}`;
    } else if (!poke.isLinked) {
      classes += ` ${styles.mismatch}`;
    } else if (poke.linkGroup && poke.isLinked) {
      classes += ` ${styles.linked}`;
    }
  }

  if (isDragging) classes += ` ${styles.dragging}`;
  if (isDragOver) classes += ` ${styles.dragOver}`;

  return classes;
};

export function PokemonGrid({
  pokemons,
  isTeam = false,
  onPokemonMove,
  onEmptySlotClick,
  sessionPlayers,
  allSessionPokemon,
  sessionId,
  canAddPokemon = true,
}: PokemonGridProps) {
  const [draggedPokemon, setDraggedPokemon] = useState<string | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null);
  const [justFinishedDragging, setJustFinishedDragging] = useState<
    string | null
  >(null);

  // Create slots array for team (always 6 slots) or box (dynamic)
  const createSlots = () => {
    if (isTeam) {
      const slots = new Array(6).fill(null);
      pokemons.forEach((pokemon) => {
        if (pokemon.position >= 0 && pokemon.position < 6) {
          slots[pokemon.position] = pokemon;
        }
      });
      return slots;
    } else {
      // For box, show all Pokemon in their positions + one extra empty slot
      if (pokemons.length === 0) {
        // If no Pokemon, show just one empty slot
        return [null];
      }

      const maxPosition = Math.max(...pokemons.map((p) => p.position));
      const slots = new Array(maxPosition + 2).fill(null); // +2 to include the max position and one extra empty slot

      pokemons.forEach((pokemon) => {
        if (pokemon.position >= 0) {
          slots[pokemon.position] = pokemon;
        }
      });

      return slots;
    }
  };

  const slots = createSlots();

  const handleDragStart = (e: React.DragEvent, pokemon: EnhancedPokemon) => {
    setDraggedPokemon(pokemon.id);
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        pokemonId: pokemon.id,
        fromTeam: isTeam,
      })
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot(slotIndex);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = async (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    setDragOverSlot(null);
    setDraggedPokemon(null);

    try {
      const dataStr = e.dataTransfer.getData('text/plain');

      if (!dataStr) {
        console.error('No data transferred during drop');
        return;
      }

      const data = JSON.parse(dataStr);
      const { pokemonId, fromTeam } = data;

      // Prevent dropping Pokemon on its own slot
      const currentPokemon = slots[slotIndex];
      if (currentPokemon && currentPokemon.id === pokemonId) {
        return; // Don't make API call if dropping on same slot
      }

      // Check if this is the same container and same position
      if (
        fromTeam === isTeam &&
        currentPokemon &&
        currentPokemon.id === pokemonId
      ) {
        return; // Don't make API call if not actually moving
      }

      let targetPosition = slotIndex;

      // Special handling for box: if dropping to the last empty slot,
      // append to the end of existing Pokemon
      if (!isTeam && slotIndex >= pokemons.length) {
        // This is the extra empty slot in the box - append to the end
        targetPosition = pokemons.length;
      }

      if (onPokemonMove) {
        await onPokemonMove(pokemonId, targetPosition, isTeam);
      } else {
        console.warn('onPokemonMove callback is not defined');
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const handleDragEnd = () => {
    const draggedId = draggedPokemon;
    setDraggedPokemon(null);
    setDragOverSlot(null);

    // Temporarily disable hover card for the just-dragged Pokemon
    if (draggedId) {
      setJustFinishedDragging(draggedId);
      // Re-enable hover card after a short delay
      setTimeout(() => {
        setJustFinishedDragging(null);
      }, 300);
    }
  };

  return (
    <div className={isTeam ? styles.teamContainer : styles.boxContainer}>
      {slots.map((pokemon, index) => (
        <div
          key={`slot-${index}`}
          className={getBoxClass(
            pokemon,
            draggedPokemon === pokemon?.id,
            dragOverSlot === index
          )}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
        >
          {pokemon ? (
            <HoverCard
              withArrow
              position='top'
              shadow='md'
              openDelay={500}
              closeDelay={200}
              disabled={
                draggedPokemon === pokemon.id ||
                justFinishedDragging === pokemon.id
              }
            >
              <HoverCard.Target>
                <PokemonWrapper
                  pokemon={pokemon}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <PokemonTooltip
                  pokemon={pokemon}
                  sessionPlayers={sessionPlayers || []}
                  allSessionPokemon={allSessionPokemon || []}
                  sessionId={sessionId}
                />
              </HoverCard.Dropdown>
            </HoverCard>
          ) : (
            <Tooltip
              label={
                isTeam
                  ? `Team slot ${
                      index + 1
                    } - Drop here to add or swap Pokemon, or click to add new Pokemon`
                  : index >= pokemons.length
                    ? 'Drop Pokemon here to add to box, or click to add new Pokemon'
                    : `Box position ${index} - Drop here to swap Pokemon`
              }
              withArrow
              openDelay={1000}
              disabled={
                draggedPokemon === null && (!onEmptySlotClick || !canAddPokemon)
              }
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--mantine-color-gray-5)',
                  fontSize: isTeam ? '0.8rem' : '1.5rem',
                  cursor:
                    onEmptySlotClick && canAddPokemon ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (
                    onEmptySlotClick &&
                    canAddPokemon &&
                    draggedPokemon === null
                  ) {
                    onEmptySlotClick(isTeam, index);
                  }
                }}
              >
                {isTeam ? `${index + 1}` : '+'}
              </div>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
}
