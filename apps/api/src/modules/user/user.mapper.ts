import { Prisma } from '@prisma/client';
import { 
  UserDto, 
  UserRefDto
} from '../../lib/mappers/base.mapper';
import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';

// Zod schema types for user responses
export type CreateUserResponseDto = z.infer<typeof schemas.CreateUserResponse>;
export type GetUserResponseDto = z.infer<typeof schemas.GetUserResponse>;

// Prisma types for users
export type PrismaUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    createdAt: true;
  };
}>;

export class UserMapper {
  /**
   * Maps a Prisma user to a full User DTO (for user endpoints)
   */
  static mapPrismaToUserDto(prismaUser: PrismaUser): UserDto {
    return {
      id: prismaUser.id,
      username: prismaUser.username,
      createdAt: prismaUser.createdAt.toISOString(),
    };
  }

  /**
   * Maps a Prisma user to a minimal UserRef DTO (for other endpoints)
   */
  static mapPrismaToUserRefDto(prismaUser: PrismaUser): UserRefDto {
    return {
      id: prismaUser.id,
      username: prismaUser.username,
    };
  }

  /**
   * Maps a Prisma user to a CreateUserResponse DTO
   */
  static mapPrismaToCreateUserResponseDto(prismaUser: PrismaUser): CreateUserResponseDto {
    return {
      user: this.mapPrismaToUserDto(prismaUser),
    };
  }

  /**
   * Maps a Prisma user to a GetUserResponse DTO
   */
  static mapPrismaToGetUserResponseDto(prismaUser: PrismaUser): GetUserResponseDto {
    return {
      user: this.mapPrismaToUserDto(prismaUser),
    };
  }

  /**
   * Maps an array of Prisma users to UserRef DTOs
   */
  static mapPrismaUsersToUserRefDtos(prismaUsers: PrismaUser[]): UserRefDto[] {
    return prismaUsers.map(user => this.mapPrismaToUserRefDto(user));
  }

  /**
   * Maps an array of Prisma users to full User DTOs
   */
  static mapPrismaUsersToUserDtos(prismaUsers: PrismaUser[]): UserDto[] {
    return prismaUsers.map(user => this.mapPrismaToUserDto(user));
  }
} 