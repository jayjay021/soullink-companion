'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Container,
  Group,
  Text,
  Paper,
  Stack,
  TextInput,
} from '@mantine/core';

export default function TestSSEPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<
    Array<{ timestamp: string; data: unknown }>
  >([]);
  const [sessionId, setSessionId] = useState('test-session');
  const [testData, setTestData] = useState(
    '{"type": "test", "message": "Hello World"}'
  );
  const eventSourceRef = useRef<EventSource | null>(null);

  const connectToSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    console.log(`Connecting to SSE for session: ${sessionId}`);
    const eventSource = new EventSource(`/api/session/${sessionId}/events`);

    eventSource.onopen = () => {
      console.log('SSE connection opened');
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      console.log('Received SSE event:', event.data);
      try {
        const data = JSON.parse(event.data);
        setEvents((prev) => [
          ...prev,
          { timestamp: new Date().toISOString(), data },
        ]);
      } catch {
        setEvents((prev) => [
          ...prev,
          { timestamp: new Date().toISOString(), data: event.data },
        ]);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      setIsConnected(false);
    };

    eventSourceRef.current = eventSource;
  };

  const disconnectFromSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
      console.log('SSE connection closed');
    }
  };

  const sendTestEvent = async () => {
    try {
      const response = await fetch(`/api/session/${sessionId}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: testData,
      });

      const result = await response.json();
      console.log('Test event sent:', result);
    } catch (error) {
      console.error('Failed to send test event:', error);
    }
  };

  const clearEvents = () => {
    setEvents([]);
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return (
    <Container size="md" py="xl">
      <Stack>
        <Text size="xl" fw={700}>
          SSE Test Page
        </Text>

        <Paper p="md" withBorder>
          <Stack>
            <TextInput
              label="Session ID"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
            />

            <Group>
              <Button onClick={connectToSSE} disabled={isConnected}>
                Connect to SSE
              </Button>
              <Button
                onClick={disconnectFromSSE}
                disabled={!isConnected}
                color="red"
              >
                Disconnect
              </Button>
              <Text>
                Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
              </Text>
            </Group>
          </Stack>
        </Paper>

        <Paper p="md" withBorder>
          <Stack>
            <TextInput
              label="Test Event Data (JSON)"
              value={testData}
              onChange={(e) => setTestData(e.target.value)}
            />
            <Group>
              <Button onClick={sendTestEvent}>Send Test Event</Button>
              <Button onClick={clearEvents} variant="outline">
                Clear Events
              </Button>
            </Group>
          </Stack>
        </Paper>

        <Paper p="md" withBorder>
          <Text fw={600} mb="sm">
            Received Events ({events.length})
          </Text>
          <Stack style={{ maxHeight: '400px', overflow: 'auto' }}>
            {events.length === 0 ? (
              <Text c="dimmed">No events received yet</Text>
            ) : (
              events.map((event, index) => (
                <Paper key={index} p="xs" withBorder bg="gray.0">
                  <Text size="xs" c="dimmed">
                    {event.timestamp}
                  </Text>
                  <Text size="sm" style={{ fontFamily: 'monospace' }}>
                    {typeof event.data === 'string'
                      ? event.data
                      : JSON.stringify(event.data, null, 2)}
                  </Text>
                </Paper>
              ))
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
