import React, { useEffect, useState } from 'react';
import {
  useCombobox,
  Combobox,
  TextInput,
  Group,
  Avatar,
  Text,
} from '@mantine/core';
import { useGetPokedexPokemonQuery } from '../../../lib/api-client/generated.api';
import type { PokedexPokemon } from '../../../lib/api-client/generated.api';
import { useDebouncedValue } from '@mantine/hooks';

interface PokemonAutocompleteProps {
  value: string;
  onChange: (pokemon: PokedexPokemon | null) => void;
  onNameChange?: (name: string) => void;
  error?: string | null;
}

export function PokemonAutocomplete({
  value,
  onChange,
  onNameChange,
  error,
}: PokemonAutocompleteProps) {
  const [search, setSearch] = useState(value);
  const [selectedPokemon, setSelectedPokemon] = useState<PokedexPokemon | null>(
    null
  );
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [debounced] = useDebouncedValue(search, 200);

  useEffect(() => {
    if (value !== search) {
      setSearch(value);
      // If value is empty or doesn't match selected Pokemon, clear selection
      if (
        !value ||
        (selectedPokemon && selectedPokemon.name.english !== value)
      ) {
        setSelectedPokemon(null);
      }
    }
  }, [value, search, selectedPokemon]);

  useEffect(() => {
    // Clear selected Pokemon if search doesn't match
    if (selectedPokemon && search !== selectedPokemon.name.english) {
      setSelectedPokemon(null);
    }
  }, [search, selectedPokemon]);

  const { data, isLoading: loading } = useGetPokedexPokemonQuery(
    { name: debounced },
    { skip: !debounced }
  );
  const options: PokedexPokemon[] = data?.pokemon || [];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setSearch(val);
    setSelectedPokemon(null);
    onChange(null);
    onNameChange?.(val);
    combobox.openDropdown();
  };

  const handleSelect = (option: PokedexPokemon) => {
    setSearch(option.name.english);
    setSelectedPokemon(option);
    onChange(option);
    onNameChange?.(option.name.english);
    combobox.closeDropdown();
  };

  return (
    <Combobox store={combobox} withinPortal>
      <Combobox.Target>
        <TextInput
          label='Pokémon Name'
          value={search}
          onChange={handleInput}
          rightSection={loading ? <span>⏳</span> : null}
          leftSection={
            selectedPokemon ? (
              <Avatar
                src={selectedPokemon.image.sprite}
                size='sm'
                radius='xl'
              />
            ) : null
          }
          placeholder='Start typing...'
          error={error}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        {options.length === 0 && !loading ? (
          <Combobox.Empty>No Pokémon found</Combobox.Empty>
        ) : (
          options.map((option) => (
            <Combobox.Option
              value={option.name.english}
              key={option.id}
              onClick={() => handleSelect(option)}
            >
              <Group gap='sm'>
                <Avatar src={option.image.sprite} size='sm' radius='xl' />
                <Text>{option.name.english}</Text>
              </Group>
            </Combobox.Option>
          ))
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
}
