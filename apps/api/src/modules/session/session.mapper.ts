import { Prisma } from '@prisma/client';
import { 
  SessionDto, 
  SessionListItemDto, 
  SessionsResponseDto,
  UserRefDto
} from '../../lib/mappers/base.mapper';

// Prisma types for sessions with users
export type PrismaSessionWithUsers = Prisma.SessionGetPayload<{
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

export class SessionMapper {
  /**
   * Maps a Prisma session with users to a Session DTO
   */
  static mapPrismaToSessionDto(session: PrismaSessionWithUsers): SessionDto {
    return {
      id: session.id,
      name: session.name,
      description: session.description ?? '',
      createdAt: session.createdAt.toISOString(),
      status: session.status,
      users: session.playerSessions.map(ps => ({
        id: ps.user.id,
        username: ps.user.username,
      } as UserRefDto)),
    };
  }

  /**
   * Maps a Prisma session with users to a SessionListItem DTO
   */
  static mapPrismaToSessionListItemDto(session: PrismaSessionWithUsers): SessionListItemDto {
    return {
      id: session.id,
      name: session.name,
      description: session.description ?? '',
      createdAt: session.createdAt.toISOString(),
      status: session.status,
      users: session.playerSessions.map(ps => ({
        id: ps.user.id,
        username: ps.user.username,
      } as UserRefDto)),
    };
  }

  /**
   * Maps an array of Prisma sessions to a SessionsResponse DTO
   */
  static mapPrismaToSessionsResponseDto(sessions: PrismaSessionWithUsers[]): SessionsResponseDto {
    return {
      sessions: sessions.map(session => this.mapPrismaToSessionListItemDto(session)),
    };
  }

  /**
   * Maps a single Prisma session to a SessionsResponse DTO (for consistency)
   */
  static mapPrismaToSessionsResponseDtoSingle(session: PrismaSessionWithUsers): SessionsResponseDto {
    return {
      sessions: [this.mapPrismaToSessionListItemDto(session)],
    };
  }
} 