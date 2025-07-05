import { prisma } from '../../lib/prisma';
import { log } from '@repo/logger';
import { z } from 'zod';
import { schemas } from '@repo/api-spec/zod';
import { PokemonMapper } from './pokemon.mapper';
import {
  PokemonPositionManager,
  PokemonValidationManager,
} from '@repo/pokemon-utils';
import { PokemonStatus as PrismaPokemonStatus } from '@prisma/client';
import { pokedexService } from '../pokedex/pokedex.service';

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
      return PokemonMapper.mapPrismaToPokemonListResponseDtoEnriched(pokes);
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
      return poke ? PokemonMapper.mapPrismaToPokemonDtoEnriched(poke) : null;
    } catch (error) {
      log('Error getting pokemon:', error);
      throw new Error('Failed to get pokemon');
    }
  }

  async addPokemon(
    sessionId: string,
    data: CreatePokemonData
  ): Promise<PokemonDto> {
    // First check if session exists and is in STARTED status
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      select: { status: true },
    });

    if (!session) {
      throw new Error('Session not found');
    }

    if (session.status !== 'STARTED') {
      throw new Error(
        'Pokemon can only be added to sessions that are currently running (STARTED status)'
      );
    }

    // get all pokemon for the session with user data
    const allPokemon = await prisma.pokemon.findMany({
      where: { sessionId },
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
    const allPokemonMapped = allPokemon.map((poke) => ({
      ...poke,
      name: `Pokemon #${poke.pokemonId}`, // Fallback name
      image: '', // Fallback image
    }));

    // get pokedex data for ALL pokemon (not just the ones in the session)
    // canCatchSpecies needs the full pokedex data to check evolution lines
    const pokedexData = pokedexService.getPokemon();

    // check if user can catch pokemon
    const canCatch = PokemonValidationManager.canCatchSpecies(
      data.pokemonId,
      data.userId,
      allPokemonMapped,
      pokedexData.pokemon
    );
    if (!canCatch.canCatch)
      throw new Error(canCatch.reason || 'User cannot catch this pokemon');

    // Check if position is already taken for this user/session/location
    const existingPokemonAtPosition = allPokemon.find(
      (p) =>
        p.user.id === data.userId &&
        p.location === data.location &&
        p.position === data.position
    );
    if (existingPokemonAtPosition) {
      throw new Error('Position is already taken');
    }
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
      return PokemonMapper.mapPrismaToPokemonDtoEnriched(poke);
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
      // Check if Pokemon exists
      const existingPokemon = await prisma.pokemon.findFirst({
        where: { sessionId, id },
        select: {
          id: true,
          status: true,
          location: true,
          position: true,
          user: {
            select: { id: true, username: true },
          },
        },
      });

      if (!existingPokemon) {
        throw new Error('Pokemon not found');
      }

      // If status is being set to DEAD, automatically move to BOX
      if (data.status === 'DEAD' && existingPokemon.location === 'TEAM') {
        // Get all pokemon for position management
        const allPokemon = await prisma.pokemon.findMany({
          where: { sessionId },
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

        // Map to the structure for PokemonPositionManager
        const mappedPokemon = allPokemon.map((poke) => ({
          ...poke,
          name: `Pokemon #${poke.pokemonId}`, // Fallback name
          image: '', // Fallback image
        }));

        // Get next available box position
        const nextBoxPosition = PokemonPositionManager.getNextBoxPosition(
          mappedPokemon,
          existingPokemon.user.id
        );

        // Force move to BOX with status DEAD
        const updateData = {
          status: 'DEAD' as PrismaPokemonStatus,
          location: 'BOX' as const,
          position: nextBoxPosition,
          ...(data.routeName !== undefined && { routeName: data.routeName }),
        };

        const updated = await prisma.pokemon.update({
          where: { id },
          data: updateData,
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

        return PokemonMapper.mapPrismaToPokemonDtoEnriched(updated);
      }

      // Prevent dead Pokemon from being moved to TEAM
      if (data.location === 'TEAM' && existingPokemon.status === 'DEAD') {
        throw new Error('Dead Pokemon cannot be moved to team');
      }

      // If moving (location or position is present), use PokemonPositionManager
      if (data.location !== undefined || data.position !== undefined) {
        // Get all pokemon for the session
        const allPokemon = await prisma.pokemon.findMany({
          where: { sessionId },
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
        // Map to the new structure for PokemonPositionManager
        const mappedPokemon = allPokemon.map((poke) => ({
          ...poke,
          name: `Pokemon #${poke.pokemonId}`, // Fallback name
          image: '', // Fallback image
        }));
        // Find the current pokemon
        const current = mappedPokemon.find((p) => p.id === id);
        if (!current) throw new Error('Pokemon not found');

        const newLocation = data.location ?? current.location;
        const newPosition = data.position ?? current.position;

        // Prevent dead Pokemon from being moved to TEAM
        if (newLocation === 'TEAM' && current.status === 'DEAD') {
          throw new Error('Dead Pokemon cannot be moved to team');
        }

        const { valid, adjustedPokemon, error } =
          PokemonPositionManager.validateMove(
            mappedPokemon,
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
        return PokemonMapper.mapPrismaToPokemonDtoEnriched(updated);
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
        return PokemonMapper.mapPrismaToPokemonDtoEnriched(updated);
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
