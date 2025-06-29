import { prisma } from '../../lib/prisma';
import { log } from '@repo/logger';
import { paths, components } from '@repo/api-spec/types';
import { PokemonPositionManager } from '@repo/pokemon-utils';
import {
  PokemonStatus as PrismaPokemonStatus,
  Pokemon as PrismaPokemon,
} from '@prisma/client';

// Types from OpenAPI spec
// Use paths for request bodies, components for objects

type AddPokemonData =
  paths['/pokemon/{sessionId}']['post']['requestBody']['content']['application/json'];
type UpdatePokemonData =
  paths['/pokemon/{sessionId}/{id}']['patch']['requestBody']['content']['application/json'];
type Pokemon = components['schemas']['Pokemon'];
type PokemonLocation = components['schemas']['PokemonLocation'];
type PokemonStatus = components['schemas']['PokemonStatus'];

function toApiPokemon(p: PrismaPokemon): Pokemon {
  return {
    id: p.id,
    playerId: p.playerId,
    sessionId: p.sessionId,
    pokemonId: p.pokemonId,
    status: p.status as PokemonStatus,
    routeName: p.routeName,
    location: p.location as PokemonLocation,
    position: p.position,
  };
}

export class PokemonService {
  async listPokemon(
    sessionId: string,
    playerId?: string,
    routeName?: string,
    status?: PokemonStatus
  ): Promise<Pokemon[]> {
    try {
      const where: {
        sessionId: string;
        playerId?: string;
        routeName?: string;
        status?: PrismaPokemonStatus;
      } = { sessionId };
      if (playerId) where.playerId = playerId;
      if (routeName) where.routeName = routeName;
      if (status) where.status = status as PrismaPokemonStatus;
      const pokes = await prisma.pokemon.findMany({
        where,
        orderBy: { position: 'asc' },
        select: {
          id: true,
          playerId: true,
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
      return pokes.map(toApiPokemon);
    } catch (error) {
      log('Error listing pokemon:', error);
      throw new Error('Failed to list pokemon');
    }
  }

  async getPokemon(sessionId: string, id: string): Promise<Pokemon | null> {
    try {
      const poke = await prisma.pokemon.findFirst({
        where: { sessionId, id },
        select: {
          id: true,
          playerId: true,
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
      return poke ? toApiPokemon(poke) : null;
    } catch (error) {
      log('Error getting pokemon:', error);
      throw new Error('Failed to get pokemon');
    }
  }

  async addPokemon(sessionId: string, data: AddPokemonData): Promise<Pokemon> {
    try {
      const poke = await prisma.pokemon.create({
        data: {
          playerId: data.playerId,
          sessionId,
          pokemonId: data.pokemonId,
          status: data.status,
          routeName: data.routeName,
          location: data.location,
          position: data.position,
        },
        select: {
          id: true,
          playerId: true,
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
      return toApiPokemon(poke);
    } catch (error) {
      log('Error adding pokemon:', error);
      throw new Error('Failed to add pokemon');
    }
  }

  async updatePokemon(
    sessionId: string,
    id: string,
    data: UpdatePokemonData
  ): Promise<Pokemon> {
    try {
      // If moving (location or position is present), use PokemonPositionManager
      if (data.location !== undefined || data.position !== undefined) {
        // Get all pokemon for the session
        const allPokemon = await prisma.pokemon.findMany({
          where: { sessionId },
          orderBy: { position: 'asc' },
          select: {
            id: true,
            playerId: true,
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
            playerId: true,
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
        if (!updated) throw new Error('Pokemon not found after move');
        return toApiPokemon(updated);
      } else {
        // Regular update
        const updateData: Record<string, unknown> = {};
        if (data.status !== undefined) updateData.status = data.status;
        if (data.routeName !== undefined) updateData.routeName = data.routeName;
        const poke = await prisma.pokemon.update({
          where: { id },
          data: updateData,
          select: {
            id: true,
            playerId: true,
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
        return toApiPokemon(poke);
      }
    } catch (error) {
      log('Error updating pokemon:', error);
      throw new Error('Failed to update pokemon');
    }
  }

  async getRoutes(sessionId: string, playerId?: string): Promise<string[]> {
    try {
      const where: { sessionId: string; playerId?: string } = { sessionId };
      if (playerId) where.playerId = playerId;
      const pokes = await prisma.pokemon.findMany({
        where,
        select: { routeName: true },
      });
      // Get unique route names
      const uniqueRoutes = Array.from(new Set(pokes.map((p) => p.routeName)));
      return uniqueRoutes;
    } catch (error) {
      log('Error getting unique routes:', error);
      throw new Error('Failed to get unique routes');
    }
  }
}

export const pokemonService = new PokemonService();
