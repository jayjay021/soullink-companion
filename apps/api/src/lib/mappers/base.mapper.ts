import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';

// Import Prisma types
import type { User } from '@prisma/client';

// Zod schema types
export type UserDto = z.infer<typeof schemas.User>;
export type UserRefDto = z.infer<typeof schemas.UserRef>;
export type SessionDto = z.infer<typeof schemas.Session>;
export type SessionListItemDto = z.infer<typeof schemas.SessionListItem>;
export type SessionsResponseDto = z.infer<typeof schemas.SessionsResponse>;
export type PokemonDto = z.infer<typeof schemas.Pokemon>;
export type PokemonListResponseDto = z.infer<typeof schemas.PokemonListResponse>;

// Base mapper interface
export interface BaseMapper {
  // Common mapping utilities
  mapPrismaUserToUserDto(prismaUser: User): UserDto;
  mapPrismaUserToUserRefDto(prismaUser: User): UserRefDto;
}

// Base mapper class with common functionality
export abstract class BaseMapperClass implements BaseMapper {
  /**
   * Maps a Prisma User to a full User DTO (for user endpoints)
   */
  mapPrismaUserToUserDto(prismaUser: User): UserDto {
    return {
      id: prismaUser.id,
      username: prismaUser.username,
      createdAt: prismaUser.createdAt.toISOString(),
    };
  }

  /**
   * Maps a Prisma User to a minimal UserRef DTO (for other endpoints)
   */
  mapPrismaUserToUserRefDto(prismaUser: User): UserRefDto {
    return {
      id: prismaUser.id,
      username: prismaUser.username,
    };
  }

  /**
   * Maps a Prisma User to either full or minimal DTO based on context
   */
  mapPrismaUserToUserDtoByContext(
    prismaUser: User,
    context: 'full' | 'minimal'
  ): UserDto | UserRefDto {
    return context === 'full' 
      ? this.mapPrismaUserToUserDto(prismaUser)
      : this.mapPrismaUserToUserRefDto(prismaUser);
  }

  /**
   * Maps an array of Prisma Users to UserRef DTOs
   */
  mapPrismaUsersToUserRefDtos(prismaUsers: User[]): UserRefDto[] {
    return prismaUsers.map(user => this.mapPrismaUserToUserRefDto(user));
  }

  /**
   * Maps an array of Prisma Users to full User DTOs
   */
  mapPrismaUsersToUserDtos(prismaUsers: User[]): UserDto[] {
    return prismaUsers.map(user => this.mapPrismaUserToUserDto(user));
  }
}

// Helper function for consistent user mapping
export function mapPrismaUserToUserDto(prismaUser: User): UserDto {
  return {
    id: prismaUser.id,
    username: prismaUser.username,
    createdAt: prismaUser.createdAt.toISOString(),
  };
}

export function mapPrismaUserToUserRefDto(prismaUser: User): UserRefDto {
  return {
    id: prismaUser.id,
    username: prismaUser.username,
  };
}

export function mapPrismaUsersToUserRefDtos(prismaUsers: User[]): UserRefDto[] {
  return prismaUsers.map(mapPrismaUserToUserRefDto);
}

export function mapPrismaUsersToUserDtos(prismaUsers: User[]): UserDto[] {
  return prismaUsers.map(mapPrismaUserToUserDto);
} 