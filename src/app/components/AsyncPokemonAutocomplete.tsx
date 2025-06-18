'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useCombobox, Combobox, TextInput, Button, Group } from '@mantine/core';
import { PokemonData } from '@/app/api/pokemon/route';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';

interface AsyncPokemonAutocompleteProps {
  value: string;
  onChange: (pokemon: PokemonData | null) => void;
  onNameChange?: (name: string) => void;
}

const AsyncPokemonAutocomplete: React.FC<AsyncPokemonAutocompleteProps> = ({
  value,
  onChange,
  onNameChange,
}) => {
  const [search, setSearch] = useState(value);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [debounced] = useDebouncedValue(search, 200);

  // Sync search with value prop only when value changes externally
  useEffect(() => {
    if (value !== search) {
      setSearch(value);
    }
  }, [value]);

  const { data: options = [], isFetching: loading } = useQuery<PokemonData[]>({
    queryKey: ['pokemonAutocomplete', debounced],
    queryFn: async () => {
      if (!debounced) return [];
      const res = await fetch(
        `/api/pokemon?q=${encodeURIComponent(debounced)}`
      );
      const data: PokemonData[] = await res.json();
      return data;
    },
    enabled: !!debounced && debounced.length > 0,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setSearch(val);
    // Clear selection when typing and notify parent of name change
    onChange(null);
    onNameChange?.(val);
    combobox.openDropdown();
  };

  return (
    <Combobox store={combobox} withinPortal>
      <Combobox.Target>
        <TextInput
          label='Pokémon Name'
          value={search}
          onChange={handleInput}
          rightSection={loading ? <span>⏳</span> : null}
          placeholder='Start typing...'
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        {options.length === 0 && !loading ? (
          <Combobox.Empty>No Pokémon found</Combobox.Empty>
        ) : (
          options.map((option) => (
            <Combobox.Option
              value={`${option.names.de} (${option.names.en})`}
              key={option.id}
              onClick={() => {
                setSearch(option.names.en);
                onChange(option); // Pass the full pokemon data
                onNameChange?.(option.names.en);
                combobox.closeDropdown();
              }}
            >
              {`${option.names.de} (${option.names.en})`}
            </Combobox.Option>
          ))
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default AsyncPokemonAutocomplete;
