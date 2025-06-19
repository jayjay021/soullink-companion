// Utility function to emit real-time events to session participants
// This avoids the need for internal HTTP calls between API routes

interface ConnectionWrapper {
  enqueue: (data: Uint8Array) => void;
  close: () => void;
}

// Simple in-memory store for active SSE connections (shared across API routes)
const sessionConnections = new Map<string, Set<ConnectionWrapper>>();

export function getSessionConnections() {
  return sessionConnections;
}

export function addConnection(
  sessionId: string,
  connection: ConnectionWrapper
) {
  if (!sessionConnections.has(sessionId)) {
    sessionConnections.set(sessionId, new Set());
  }
  sessionConnections.get(sessionId)!.add(connection);
}

export function removeConnection(
  sessionId: string,
  connection: ConnectionWrapper
) {
  const connections = sessionConnections.get(sessionId);
  if (connections) {
    connections.delete(connection);
    if (connections.size === 0) {
      sessionConnections.delete(sessionId);
    }
  }
}

export function emitToSession(sessionId: string, eventData: unknown) {
  const connections = sessionConnections.get(sessionId);

  if (connections && connections.size > 0) {
    const encoder = new TextEncoder();
    const eventMessage = `data: ${JSON.stringify(eventData)}\n\n`;

    // Send event to all connected clients in this session
    const deadConnections = new Set<ConnectionWrapper>();

    for (const connection of connections) {
      try {
        connection.enqueue(encoder.encode(eventMessage));
      } catch {
        deadConnections.add(connection);
      }
    }

    // Remove dead connections
    deadConnections.forEach((conn) => connections.delete(conn));

    return connections.size;
  }

  return 0;
}
