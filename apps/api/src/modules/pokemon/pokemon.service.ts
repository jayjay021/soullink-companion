import { prisma } from '../../lib/prisma';
import { log } from '@repo/logger';
import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';
import { PokemonMapper } from './pokemon.mapper';
import { PokemonPositionManager } from '@repo/pokemon-utils';
import {
  PokemonStatus as PrismaPokemonStatus,
} from '@prisma/client';

// Zod schema types for request/response
type CreatePokemonData = z.infer<typeof schemas.CreatePokemonRequest>;
type UpdatePokemonData = z.infer<typeof schemas.UpdatePokemonRequest>;
type PokemonDto = z.infer<typeof schemas.Pokemon>;
type PokemonListResponseDto = z.infer<typeof schemas.PokemonListResponse>;
type PokemonStatus = z.infer<typeof schemas.PokemonStatus>;

export class PokemonService {
  async listPokemon(
    sessionId: string,
    userId?: string,
    routeName?: string,
    status?: PokemonStatus
  ): Promise<PokemonListResponseDto> {
    try {
      const where: {
        sessionId: string;
        userId?: string;
        routeName?: string;
        status?: PrismaPokemonStatus;
      } = { sessionId };
      if (userId) where.userId = userId;
      if (routeName) where.routeName = routeName;
      if (status) where.status = status as PrismaPokemonStatus;
      
      const pokes = await prisma.pokemon.findMany({
        where,
        orderBy: { position: 'asc' },
        select: {
          id: true,
          sessionId: true,
          pokemonId: true,
          status: true,
          routeName: true,
          location: true,
          position: true,
          user: {
            select: { id: true, username: true },
          },
        },
      });
      return PokemonMapper.mapPrismaToPokemonListResponseDto(pokes);
    } catch (error) {
      log('Error listing pokemon:', error);
      throw new Error('Failed to list pokemon');
    }
  }

  async getPokemon(sessionId: string, id: string): Promise<PokemonDto | null> {
    try {
      const poke = await prisma.pokemon.findFirst({
        where: { sessionId, id },
        select: {
          id: true,
          sessionId: true,
          pokemonId: true,
          status: true,
          routeName: true,
          location: true,
          position: true,
          user: {
            select: { id: true, username: true },
          },
        },
      });
      return poke ? PokemonMapper.mapPrismaToPokemonDto(poke) : null;
    } catch (error) {
      log('Error getting pokemon:', error);
      throw new Error('Failed to get pokemon');
    }
  }

  async addPokemon(sessionId: string, data: CreatePokemonData): Promise<PokemonDto> {
    try {
      const poke = await prisma.pokemon.create({
        data: {
          userId: data.userId,
          sessionId,
          pokemonId: data.pokemonId,
          status: data.status,
          routeName: data.routeName,
          location: data.location,
          position: data.position,
        },
        select: {
          id: true,
          sessionId: true,
          pokemonId: true,
          status: true,
          routeName: true,
          location: true,
          position: true,
          user: {
            select: { id: true, username: true },
          },
        },
      });
      return PokemonMapper.mapPrismaToPokemonDto(poke);
    } catch (error) {
      log('Error adding pokemon:', error);
      throw new Error('Failed to add pokemon');
    }
  }

  async updatePokemon(
    sessionId: string,
    id: string,
    data: UpdatePokemonData
  ): Promise<PokemonDto> {
    try {
      // If moving (location or position is present), use PokemonPositionManager
      if (data.location !== undefined || data.position !== undefined) {
        // Get all pokemon for the session
        const allPokemon = await prisma.pokemon.findMany({
          where: { sessionId },
          orderBy: { position: 'asc' },
          select: {
            id: true,
            userId: true,
            sessionId: true,
            pokemonId: true,
            status: true,
            routeName: true,
            location: true,
            position: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        // Find the current pokemon
        const current = allPokemon.find((p) => p.id === id);
        if (!current) throw new Error('Pokemon not found');
        const newLocation = data.location ?? current.location;
        const newPosition = data.position ?? current.position;
        const { valid, adjustedPokemon, error } =
          PokemonPositionManager.validateMove(
            allPokemon,
            id,
            newLocation,
            newPosition
          );
        if (!valid) throw new Error(error);
        await Promise.all(
          adjustedPokemon.map((poke) =>
            prisma.pokemon.update({
              where: { id: poke.id },
              data: { location: poke.location, position: poke.position },
            })
          )
        );
        // After move, update other fields if present
        const updateData: Record<string, unknown> = {};
        if (data.status !== undefined) updateData.status = data.status;
        if (data.routeName !== undefined) updateData.routeName = data.routeName;
        if (Object.keys(updateData).length > 0) {
          await prisma.pokemon.update({
            where: { id },
            data: updateData,
          });
        }
        const updated = await prisma.pokemon.findUnique({
          where: { id },
          select: {
            id: true,
            sessionId: true,
            pokemonId: true,
            status: true,
            routeName: true,
            location: true,
            position: true,
            user: {
              select: { id: true, username: true },
            },
          },
        });
        if (!updated) throw new Error('Pokemon not found after update');
        return PokemonMapper.mapPrismaToPokemonDto(updated);
      } else {
        // Simple update without position management
        const updated = await prisma.pokemon.update({
          where: { id },
          data: {
            ...(data.status !== undefined && { status: data.status }),
            ...(data.routeName !== undefined && { routeName: data.routeName }),
            ...(data.location !== undefined && { location: data.location }),
            ...(data.position !== undefined && { position: data.position }),
          },
          select: {
            id: true,
            sessionId: true,
            pokemonId: true,
            status: true,
            routeName: true,
            location: true,
            position: true,
            user: {
              select: { id: true, username: true },
            },
          },
        });
        return PokemonMapper.mapPrismaToPokemonDto(updated);
      }
    } catch (error) {
      log('Error updating pokemon:', error);
      throw new Error('Failed to update pokemon');
    }
  }

  async deletePokemon(sessionId: string, id: string): Promise<boolean> {
    try {
      const pokemon = await prisma.pokemon.findFirst({
        where: { sessionId, id },
      });
      if (!pokemon) return false;
      await prisma.pokemon.delete({ where: { id } });
      return true;
    } catch (error) {
      log('Error deleting pokemon:', error);
      throw new Error('Failed to delete pokemon');
    }
  }

  async getRoutes(sessionId: string, userId?: string): Promise<string[]> {
    try {
      const where: { sessionId: string; userId?: string } = { sessionId };
      if (userId) where.userId = userId;
      const routes = await prisma.pokemon.findMany({
        where,
        select: { routeName: true },
        distinct: ['routeName'],
        orderBy: { routeName: 'asc' },
      });
      return routes.map((r) => r.routeName);
    } catch (error) {
      log('Error getting routes:', error);
      throw new Error('Failed to get routes');
    }
  }
}

export const pokemonService = new PokemonService();
