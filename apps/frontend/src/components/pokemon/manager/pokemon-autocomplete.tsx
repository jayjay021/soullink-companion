import React, { useEffect, useState } from 'react';
import { useCombobox, Combobox, TextInput } from '@mantine/core';
import { useGetPokedexPokemonQuery } from '../../../lib/api-client/generated.api';
import type { PokedexPokemon } from '../../../lib/api-client/generated.api';
import { useDebouncedValue } from '@mantine/hooks';

interface PokemonAutocompleteProps {
  value: string;
  onChange: (pokemon: PokedexPokemon | null) => void;
  onNameChange?: (name: string) => void;
}

export function PokemonAutocomplete({
  value,
  onChange,
  onNameChange,
}: PokemonAutocompleteProps) {
  const [search, setSearch] = useState(value);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [debounced] = useDebouncedValue(search, 200);

  useEffect(() => {
    if (value !== search) {
      setSearch(value);
    }
  }, [value, search]);

  const { data, isLoading: loading } = useGetPokedexPokemonQuery({ name: debounced }, { skip: !debounced });
  const options: PokedexPokemon[] = data?.pokemon || [];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    setSearch(val);
    onChange(null);
    onNameChange?.(val);
    combobox.openDropdown();
  };

  return (
    <Combobox store={combobox} withinPortal>
      <Combobox.Target>
        <TextInput
          label="Pokémon Name"
          value={search}
          onChange={handleInput}
          rightSection={loading ? <span>⏳</span> : null}
          placeholder="Start typing..."
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
              onClick={() => {
                setSearch(option.name.english);
                onChange(option);
                onNameChange?.(option.name.english);
                combobox.closeDropdown();
              }}
            >
              {option.name.english}
            </Combobox.Option>
          ))
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
} 