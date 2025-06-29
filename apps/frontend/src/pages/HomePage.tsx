import { Container, Title, Text, Card, Stack, Grid, Button, Group, Badge } from '@mantine/core';
import { IconUsers, IconPokeball, IconBook, IconDashboard, IconSettings } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  const features = [
    {
      icon: <IconUsers size={24} />,
      title: 'Session Management',
      description: 'Create and manage SoulLink game sessions with multiple players.',
      path: '/sessions',
      color: 'blue',
    },
    {
      icon: <IconPokeball size={24} />,
      title: 'Pokemon Tracking',
      description: 'Track Pokemon encounters, catches, and team management for each player.',
      path: '/pokemon',
      color: 'green',
    },
    {
      icon: <IconBook size={24} />,
      title: 'Pokedex Browser',
      description: 'Browse complete Pokemon data with stats, types, and evolution information.',
      path: '/pokedex',
      color: 'orange',
    },
    {
      icon: <IconDashboard size={24} />,
      title: 'Dashboard',
      description: 'Monitor session statistics, API health, and system status.',
      path: '/dashboard',
      color: 'purple',
    },
    {
      icon: <IconSettings size={24} />,
      title: 'Settings',
      description: 'Configure application preferences and API connection settings.',
      path: '/settings',
      color: 'gray',
    },
  ];

  return (
    <Container size="lg">
      <Stack gap="lg">
        <Stack gap="md" align="center" py="xl">
          <Title order={1} size="h1" ta="center">
            SoulLink Companion
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            A comprehensive management tool for SoulLink Pokemon challenges. 
            Track sessions, manage Pokemon encounters, and coordinate with your team.
          </Text>
        </Stack>

        <Card withBorder p="xl">
          <Stack gap="lg">
            <Title order={2} size="h3" ta="center">Features</Title>
            
            <Grid>
              {features.map((feature) => (
                <Grid.Col key={feature.path} span={{ base: 12, md: 6, lg: 4 }}>
                  <Card withBorder p="lg" h="100%">
                    <Stack gap="md" h="100%">
                      <Group>
                        <Badge color={feature.color} variant="light" size="lg">
                          {feature.icon}
                        </Badge>
                        <Title order={3} size="h4">
                          {feature.title}
                        </Title>
                      </Group>
                      
                      <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                        {feature.description}
                      </Text>
                      
                      <Button 
                        component={Link} 
                        to={feature.path}
                        variant="light"
                        fullWidth
                      >
                        Open {feature.title}
                      </Button>
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </Stack>
        </Card>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">Getting Started</Title>
            
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Text fw={500}>1. Create a Session</Text>
                  <Text size="sm" c="dimmed">
                    Start by creating a new SoulLink session. Set the session name and description 
                    to help identify your challenge.
                  </Text>
                </Stack>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Text fw={500}>2. Add Players</Text>
                  <Text size="sm" c="dimmed">
                    Join players to your session. Each player will have their own Pokemon tracking 
                    and team management.
                  </Text>
                </Stack>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Text fw={500}>3. Track Pokemon</Text>
                  <Text size="sm" c="dimmed">
                    Use the Pokemon management page to track encounters, catches, and team changes 
                    for each player.
                  </Text>
                </Stack>
              </Grid.Col>
              
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="sm">
                  <Text fw={500}>4. Monitor Progress</Text>
                  <Text size="sm" c="dimmed">
                    Check the dashboard to monitor session statistics, API health, and overall progress.
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">About SoulLink</Title>
            <Text>
              SoulLink is a Pokemon challenge where multiple players coordinate their gameplay. 
              When one player catches a Pokemon, all players must catch the same Pokemon in the same location. 
              This creates a synchronized experience where players work together to complete the game.
            </Text>
            <Text>
              This companion app helps manage the complexity of tracking multiple players, 
              their Pokemon encounters, and ensuring everyone stays synchronized throughout the challenge.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 