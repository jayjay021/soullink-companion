import { prisma } from '../lib/prisma';
import { log } from '@repo/logger';
import { paths } from '@repo/api-spec/types';

type CreateSessionData =
  paths['/session']['post']['requestBody']['content']['application/json'];

type UpdateSessionData =
  paths['/session/{sessionId}']['put']['requestBody']['content']['application/json'];

type PlayerData = {
  id: string;
  name: string;
};

export class SessionService {
  async listSessions() {
    try {
      const sessions = await prisma.session.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          status: true,
          playerSessions: {
            select: {
              player: {
                select: { id: true, name: true },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return sessions.map((session) => ({
        ...session,
        createdAt: session.createdAt.toISOString(),
        players: session.playerSessions.map((ps) => ps.player),
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
      });
      return {
        ...session,
        createdAt: session.createdAt.toISOString(),
        players: [],
      };
    } catch (error) {
      log('Error creating session:', error);
      throw new Error('Failed to create session');
    }
  }

  async getSessionById(sessionId: string) {
    try {
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          status: true,
          playerSessions: {
            select: {
              player: {
                select: { id: true, name: true },
              },
            },
          },
        },
      });
      if (!session) return null;
      return {
        ...session,
        createdAt: session.createdAt.toISOString(),
        players: session.playerSessions.map((ps) => ps.player),
      };
    } catch (error) {
      log('Error getting session:', error);
      throw new Error('Failed to get session');
    }
  }

  async updateSession(sessionId: string, data: UpdateSessionData) {
    try {
      const existingSession = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      if (!existingSession) {
        return null;
      }
      const session = await prisma.session.update({
        where: { id: sessionId },
        data: {
          ...(data.name !== undefined && { name: data.name }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.status !== undefined && { status: data.status }),
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          status: true,
          playerSessions: {
            select: {
              player: {
                select: { id: true, name: true },
              },
            },
          },
        },
      });
      return {
        ...session,
        createdAt: session.createdAt.toISOString(),
        players: session.playerSessions.map((ps) => ps.player),
      };
    } catch (error) {
      log('Error updating session:', error);
      throw new Error('Failed to update session');
    }
  }

  async deleteSession(sessionId: string) {
    try {
      const existingSession = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      if (!existingSession) {
        return null;
      }
      await prisma.session.delete({
        where: { id: sessionId },
      });
      return true;
    } catch (error) {
      log('Error deleting session:', error);
      throw new Error('Failed to delete session');
    }
  }

  async joinSession(sessionId: string, playerData: PlayerData) {
    try {
      // Ensure session exists
      const session = await prisma.session.findUnique({ where: { id: sessionId } });
      if (!session) return null;
      // Upsert player
      await prisma.player.upsert({
        where: { id: playerData.id },
        update: { name: playerData.name },
        create: { id: playerData.id, name: playerData.name },
      });
      // Check if already joined
      const alreadyJoined = await prisma.playerSession.findUnique({
        where: { playerId_sessionId: { playerId: playerData.id, sessionId } },
      });
      if (alreadyJoined) throw new Error('Player already in session');
      // Add to session
      await prisma.playerSession.create({
        data: { playerId: playerData.id, sessionId },
      });
      return this.getSessionById(sessionId);
    } catch (error) {
      if (error instanceof Error && error.message === 'Player already in session') {
        throw error;
      }
      log('Error joining session:', error);
      throw new Error('Failed to join session');
    }
  }

  async removePlayerFromSession(sessionId: string, playerId: string) {
    try {
      await prisma.playerSession.delete({
        where: { playerId_sessionId: { playerId, sessionId } },
      });
      return this.getSessionById(sessionId);
    } catch (error) {
      log('Error removing player from session:', error);
      throw new Error('Failed to remove player from session');
    }
  }

  async getPlayersInSession(sessionId: string) {
    try {
      const playerSessions = await prisma.playerSession.findMany({
        where: { sessionId },
        include: { player: { select: { id: true, name: true } } },
        orderBy: { joinedAt: 'asc' },
      });
      return playerSessions.map((ps) => ps.player);
    } catch (error) {
      log('Error getting players in session:', error);
      throw new Error('Failed to get players in session');
    }
  }
}

export const sessionService = new SessionService();
