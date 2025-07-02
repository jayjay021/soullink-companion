import { TextInput, Select, NumberInput, Grid, Title, Text, ActionIcon } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import styles from './PokedexSearch.module.css';

interface PokedexSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  minId: number | '';
  setMinId: (value: number | '') => void;
  maxId: number | '';
  setMaxId: (value: number | '') => void;
  allTypes: string[];
  countSummary: string;
}

const PokedexSearch = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  minId,
  setMinId,
  maxId,
  setMaxId,
  allTypes,
  countSummary,
}: PokedexSearchProps) => {
  // Custom handler for Min ID
  const handleMinIdKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      if (minId === 1) {
        setMinId('');
        event.preventDefault();
      } else if (minId === '') {
        event.preventDefault();
      }
    }
  };
  // Custom handler for Max ID
  const handleMaxIdKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const min = minId === '' ? 1 : minId;
    if (event.key === 'ArrowDown') {
      if (maxId === min) {
        setMaxId('');
        event.preventDefault();
      } else if (maxId === '') {
        event.preventDefault();
      }
    }
  };

  return (
    <div className={styles.searchCard}>
      <Title order={3} size="h4">Search Pokemon</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            placeholder="Search by name..."
            leftSection={<IconSearch size={16} />}
            rightSection={
              searchTerm ? (
                <ActionIcon
                  variant="transparent"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm('')}
                  tabIndex={0}
                >
                  <IconX size={16} />
                </ActionIcon>
              ) : null
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search Pokemon by name"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Select
            placeholder="Filter by type"
            data={allTypes.map(type => ({ value: type, label: type }))}
            value={selectedType}
            onChange={(value) => setSelectedType(value || '')}
            clearable
            aria-label="Filter Pokemon by type"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <NumberInput
            placeholder="Min ID"
            value={minId}
            onChange={(value) => setMinId(typeof value === 'number' ? value : '')}
            min={1}
            max={maxId || 1000}
            aria-label="Minimum Pokemon ID"
            onKeyDown={handleMinIdKeyDown}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <NumberInput
            placeholder="Max ID"
            value={maxId}
            onChange={(value) => setMaxId(typeof value === 'number' ? value : '')}
            min={minId || 1}
            max={1000}
            aria-label="Maximum Pokemon ID"
            onKeyDown={handleMaxIdKeyDown}
          />
        </Grid.Col>
      </Grid>
      <Text size="sm" c="dimmed" mt="sm" role="status" aria-live="polite">
        {countSummary}
      </Text>
    </div>
  );
};

export default PokedexSearch; 