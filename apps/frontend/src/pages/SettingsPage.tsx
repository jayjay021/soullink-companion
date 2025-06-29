import { Container, Title, Stack, Card, Switch, TextInput, Button, Group } from '@mantine/core';

export function SettingsPage() {
  return (
    <Container size="lg">
      <Stack gap="lg">
        <Title order={1}>Settings</Title>
        
        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">Application Settings</Title>
            
            <Stack gap="md">
              <Switch
                label="Enable Notifications"
                description="Receive notifications for important events"
                defaultChecked
              />
              
              <Switch
                label="Dark Mode"
                description="Use dark theme for the application"
              />
              
              <Switch
                label="Auto Save"
                description="Automatically save changes"
                defaultChecked
              />
            </Stack>
          </Stack>
        </Card>

        <Card withBorder p="xl">
          <Stack gap="md">
            <Title order={2} size="h3">API Configuration</Title>
            
            <TextInput
              label="API Base URL"
              description="The base URL for your Express API"
              placeholder="http://localhost:3000"
              defaultValue="http://localhost:3000"
            />
            
            <TextInput
              label="API Key"
              description="Your API authentication key"
              placeholder="Enter your API key"
              type="password"
            />
            
            <Group>
              <Button>Save Settings</Button>
              <Button variant="light">Test Connection</Button>
            </Group>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 