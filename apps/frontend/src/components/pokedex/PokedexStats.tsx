import { Grid, Group, Text, Stack, Card } from '@mantine/core';

interface PokedexStatsProps {
  base: Record<string, number>;
}

const PokedexStats = ({ base }: PokedexStatsProps) => (
  <Card withBorder p="xs" w="100%">
    <Stack gap="xs">
      <Text size="xs" fw={500}>Base Stats</Text>
      <Grid>
        {Object.entries(base).map(([stat, value]) => (
          <Grid.Col key={stat} span={6}>
            <Group gap="xs" justify="space-between">
              <Text size="xs">{stat}</Text>
              <Text size="xs" fw={500}>{value}</Text>
            </Group>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  </Card>
);

export default PokedexStats; 