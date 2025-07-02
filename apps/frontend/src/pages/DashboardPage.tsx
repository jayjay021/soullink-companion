import { Container, Title, Text, Card, Stack, Grid, Badge, Loader } from '@mantine/core';
import { useListSessionsQuery } from '../lib/api-client/generated.api';
import { useGetHealthQuery } from '../lib/api-client/health.api';

export function DashboardPage() {
  const { data: sessionsResponse, isLoading: sessionsLoading, error: sessionsError } = useListSessionsQuery();
  const { data: health, isLoading: healthLoading, error: healthError } = useGetHealthQuery();

  const isLoading = sessionsLoading || healthLoading;
  const error = sessionsError || healthError;

  // Compute dashboard stats from the data
  const stats = sessionsResponse ? {
    totalSessions: sessionsResponse.sessions.length,
    activeSessions: sessionsResponse.sessions.filter((s) => s.status === 'STARTED').length,
    waitingSessions: sessionsResponse.sessions.filter((s) => s.status === 'WAITING').length,
    finishedSessions: sessionsResponse.sessions.filter((s) => s.status === 'FINISHED').length,
    apiStatus: health?.status || 'unknown',
    uptime: health?.uptime || 0,
  } : undefined;

  if (isLoading) {
    return (
      <Container size="lg">
        <Stack gap="lg" align="center" py="xl">
          <Loader size="lg" />
          <Text>Loading dashboard data...</Text>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="lg">
        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={1} c="red">Error Loading Dashboard</Title>
            <Text>
              Failed to load dashboard data. Please check your API connection.
            </Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="lg">
      <Stack gap="lg">
        <Title order={1}>Dashboard</Title>
        
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder p="xl">
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Total Sessions</Text>
                <Title order={2}>{stats?.totalSessions || 0}</Title>
                <Badge color="blue" variant="light">All time</Badge>
              </Stack>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder p="xl">
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Active Sessions</Text>
                <Title order={2}>{stats?.activeSessions || 0}</Title>
                <Badge color="green" variant="light">Currently running</Badge>
              </Stack>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder p="xl">
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Waiting Sessions</Text>
                <Title order={2}>{stats?.waitingSessions || 0}</Title>
                <Badge color="yellow" variant="light">Ready to start</Badge>
              </Stack>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
            <Card withBorder p="xl">
              <Stack gap="xs">
                <Text size="sm" c="dimmed">API Status</Text>
                <Title order={2} c={health?.status?.toLowerCase() === 'ok' ? 'green' : 'red'}>
                  {health?.status || 'unknown'}
                </Title>
                <Badge color={health?.status?.toLowerCase() === 'ok' ? 'green' : 'red'} variant="light">
                  {health?.uptime ? `${Math.round(health.uptime)}s uptime` : 'Unknown'}
                </Badge>
              </Stack>
            </Card>
          </Grid.Col>
          
          
        </Grid>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">System Information</Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="xs">
                  <Text size="sm" fw={500}>API Version</Text>
                  <Text c="dimmed">{health?.version || 'Unknown'}</Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Stack gap="xs">
                  <Text size="sm" fw={500}>Last Updated</Text>
                  <Text c="dimmed">
                    {health?.timestamp 
                      ? new Date(health.timestamp).toLocaleString()
                      : 'Unknown'
                    }
                  </Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">Recent Activity</Title>
            <Text c="dimmed">
              {stats 
                ? `Dashboard showing real-time data from your SoulLink Companion API. 
                   ${stats.totalSessions} total sessions managed.`
                : "No data available. Connect to your API to see real-time statistics."
              }
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 