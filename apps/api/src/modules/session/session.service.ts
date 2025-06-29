import { prisma } from '../../lib/prisma';
import { log } from '@repo/logger';
import { paths } from '@repo/api-spec/types';
import { Prisma } from '@prisma/client';

type CreateSessionData =
  paths['/session']['post']['requestBody']['content']['application/json'];

type UpdateSessionData =
  paths['/session/{sessionId}']['put']['requestBody']['content']['application/json'];

type Session =
  paths['/session/{sessionId}']['get']['responses']['200']['content']['application/json'];

type PrismaSessionWithUsers = Prisma.SessionGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    createdAt: true;
    status: true;
    playerSessions: {
      select: {
        user: {
          select: { id: true; username: true; createdAt: true };
        };
      };
    };
  };
}>;

function toSessionApi(session: PrismaSessionWithUsers): Session {
  return {
    id: session.id,
    name: session.name,
    description: session.description ?? '',
    createdAt: session.createdAt.toISOString(),
    status: session.status,
    users: session.playerSessions.map((ps) => ({
      id: ps.user.id,
      username: ps.user.username,
      createdAt: ps.user.createdAt.toISOString(),
    })),
  };
}

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
              user: {
                select: { id: true, username: true, createdAt: true },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return sessions.map(toSessionApi);
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
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          status: true,
          playerSessions: {
            select: {
              user: {
                select: { id: true, username: true, createdAt: true },
              },
            },
          },
        },
      });
      return toSessionApi(session);
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
              user: {
                select: { id: true, username: true, createdAt: true },
              },
            },
          },
        },
      });
      if (!session) return null;
      return toSessionApi(session);
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
          ...(data.description !== undefined && {
            description: data.description,
          }),
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
              user: {
                select: { id: true, username: true, createdAt: true },
              },
            },
          },
        },
      });
      return toSessionApi(session);
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

  async joinSession(sessionId: string, userId: string) {
    try {
      // Ensure session exists
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });
      if (!session) return null;
      // Ensure user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User does not exist');
      // Check if already joined
      const alreadyJoined = await prisma.playerSession.findUnique({
        where: { playerId_sessionId: { playerId: userId, sessionId } },
      });
      if (alreadyJoined) throw new Error('User already in session');
      // Add to session
      await prisma.playerSession.create({
        data: { playerId: userId, sessionId },
      });
      // Return updated session with users
      return this.getSessionById(sessionId);
    } catch (error) {
      log('Error joining session:', error);
      throw error;
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
        include: { user: { select: { id: true, username: true, createdAt: true } } },
        orderBy: { joinedAt: 'asc' },
      });
      return playerSessions.map((ps) => ({
        id: ps.user.id,
        username: ps.user.username,
        createdAt: ps.user.createdAt.toISOString(),
      }));
    } catch (error) {
      log('Error getting players in session:', error);
      throw new Error('Failed to get players in session');
    }
  }
}

export const sessionService = new SessionService();
