import { prisma } from '../../lib/prisma';
import { log } from '@repo/logger';
import { paths } from '@repo/api-spec/types';
import { Prisma } from '@prisma/client';

type CreateUserData = paths['/users']['post']['requestBody']['content']['application/json'];
type UpdateUserData = paths['/users/{userId}']['put']['requestBody']['content']['application/json'];
type User = paths['/users/{userId}']['get']['responses']['200']['content']['application/json']['user'];

type PrismaUser = Prisma.UserGetPayload<{
  select: {
    id: true;
    username: true;
    createdAt: true;
  };
}>;

function toUserApi(user: PrismaUser): User {
  return {
    id: user.id,
    username: user.username,
    createdAt: user.createdAt.toISOString(),
  };
}

export class UserService {
  async createUser(data: CreateUserData) {
    try {
      const user = await prisma.user.create({
        data: {
          username: data.username,
        },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      });
      return { user: toUserApi(user) };
    } catch (error) {
      log('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async getUserById(userId: string) {
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
      return { user: toUserApi(user) };
    } catch (error) {
      log('Error getting user:', error);
      throw new Error('Failed to get user');
    }
  }

  async updateUser(userId: string, data: UpdateUserData) {
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
          username: data.username,
        },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      });
      return { user: toUserApi(user) };
    } catch (error) {
      log('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }
} 