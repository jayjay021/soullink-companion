import { prisma } from '../lib/prisma';
import { log } from '@repo/logger';

export interface CreateSessionData {
  name: string;
  description: string;
}

export interface UpdateSessionData {
  name?: string;
  description?: string;
  started?: boolean;
}

export interface PlayerData {
  id: string;
  name: string;
}

export class SessionService {
  async listSessions() {
    try {
      const sessions = await prisma.session.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          creationDate: true,
          started: true,
        },
        orderBy: {
          creationDate: 'desc',
        },
      });

      // Transform Date objects to ISO strings to match API spec
      return sessions.map((session) => ({
        ...session,
        creationDate: session.creationDate.toISOString(),
      }));
    } catch (error) {
      log('Error listing sessions:', error);
      throw new Error('Failed to list sessions');
    }
  }

  async createSession(data: CreateSessionData) {
    try {
      const session = await prisma.session.create({
        data: {
          name: data.name,
          description: data.description,
        },
        include: {
          players: true,
        },
      });

      // Transform Date objects to ISO strings and player objects to match API spec
      return {
        ...session,
        creationDate: session.creationDate.toISOString(),
        players: session.players.map(
          (player: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
          }) => ({
            id: player.id,
            name: player.name,
          })
        ),
      };
    } catch (error) {
      log('Error creating session:', error);
      throw new Error('Failed to create session');
    }
  }

  async getSessionById(sessionId: string) {
    try {
      const session = await prisma.session.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          players: true,
        },
      });

      if (!session) return null;

      // Transform Date objects to ISO strings and player objects to match API spec
      return {
        ...session,
        creationDate: session.creationDate.toISOString(),
        players: session.players.map(
          (player: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
          }) => ({
            id: player.id,
            name: player.name,
          })
        ),
      };
    } catch (error) {
      log('Error getting session:', error);
      throw new Error('Failed to get session');
    }
  }

  async updateSession(sessionId: string, data: UpdateSessionData) {
    try {
      // First check if session exists
      const existingSession = await prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!existingSession) {
        return null; // Session not found
      }

      const session = await prisma.session.update({
        where: {
          id: sessionId,
        },
        data: {
          ...(data.name !== undefined && { name: data.name }),
          ...(data.description !== undefined && {
            description: data.description,
          }),
          ...(data.started !== undefined && { started: data.started }),
        },
        include: {
          players: true,
        },
      });

      // Transform Date objects to ISO strings and player objects to match API spec
      return {
        ...session,
        creationDate: session.creationDate.toISOString(),
        players: session.players.map(
          (player: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
          }) => ({
            id: player.id,
            name: player.name,
          })
        ),
      };
    } catch (error) {
      log('Error updating session:', error);
      throw new Error('Failed to update session');
    }
  }

  async deleteSession(sessionId: string) {
    try {
      // First check if session exists
      const existingSession = await prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!existingSession) {
        return null; // Session not found
      }

      await prisma.session.delete({
        where: {
          id: sessionId,
        },
      });

      return true;
    } catch (error) {
      log('Error deleting session:', error);
      throw new Error('Failed to delete session');
    }
  }

  async joinSession(sessionId: string, playerData: PlayerData) {
    try {
      // Check if session exists
      const existingSession = await prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!existingSession) {
        return null; // Session not found
      }

      // Check if player already exists in this session
      const existingSessionWithPlayer = await prisma.session.findFirst({
        where: {
          id: sessionId,
          players: {
            some: {
              id: playerData.id,
            },
          },
        },
      });

      if (existingSessionWithPlayer) {
        // Player already exists in this session, throw error
        throw new Error('Player already in session');
      }

      // Create or update player and connect to session
      await prisma.player.upsert({
        where: {
          id: playerData.id,
        },
        update: {
          name: playerData.name,
          sessions: {
            connect: {
              id: sessionId,
            },
          },
        },
        create: {
          id: playerData.id,
          name: playerData.name,
          sessions: {
            connect: {
              id: sessionId,
            },
          },
        },
      });

      // Return updated session with players
      return await this.getSessionById(sessionId);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Player already in session'
      ) {
        throw error;
      }
      log('Error joining session:', error);
      throw new Error('Failed to join session');
    }
  }

  async removePlayerFromSession(sessionId: string, playerId: string) {
    try {
      await prisma.session.update({
        where: {
          id: sessionId,
        },
        data: {
          players: {
            disconnect: {
              id: playerId,
            },
          },
        },
      });

      return await this.getSessionById(sessionId);
    } catch (error) {
      log('Error removing player from session:', error);
      throw new Error('Failed to remove player from session');
    }
  }

  async getPlayersInSession(sessionId: string) {
    try {
      const session = await prisma.session.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          players: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      });

      return session?.players || [];
    } catch (error) {
      log('Error getting players in session:', error);
      throw new Error('Failed to get players in session');
    }
  }
}

export const sessionService = new SessionService();
