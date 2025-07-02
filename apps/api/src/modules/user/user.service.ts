import { prisma } from '../../lib/prisma';
import { log } from '@repo/logger';
import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';
import { UserMapper } from './user.mapper';

// Zod schema types for request/response
type CreateUserData = z.infer<typeof schemas.CreateUserRequest>;
type UpdateUserData = z.infer<typeof schemas.UpdateUserRequest>;
type CreateUserResponseDto = z.infer<typeof schemas.CreateUserResponse>;
type GetUserResponseDto = z.infer<typeof schemas.GetUserResponse>;

export class UserService {
  async createUser(data: CreateUserData): Promise<CreateUserResponseDto> {
    try {
      const user = await prisma.user.create({
        data: {
          username: data.username,
          ...(data.email && { email: data.email }),
          ...(data.password && { passwordHash: data.password }), // Note: should hash password in real implementation
        },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      });
      return UserMapper.mapPrismaToCreateUserResponseDto(user);
    } catch (error) {
      log('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async getUserById(userId: string): Promise<GetUserResponseDto | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      });
      if (!user) return null;
      return UserMapper.mapPrismaToGetUserResponseDto(user);
    } catch (error) {
      log('Error getting user:', error);
      throw new Error('Failed to get user');
    }
  }

  async updateUser(userId: string, data: UpdateUserData): Promise<GetUserResponseDto | null> {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!existingUser) {
        return null;
      }
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(data.username !== undefined && { username: data.username }),
          ...(data.email !== undefined && { email: data.email }),
        },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      });
      return UserMapper.mapPrismaToGetUserResponseDto(user);
    } catch (error) {
      log('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }
}

export const userService = new UserService(); 