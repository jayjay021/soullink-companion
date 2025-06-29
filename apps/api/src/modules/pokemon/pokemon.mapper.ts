import { Prisma } from '@prisma/client';
import { 
  PokemonDto, 
  PokemonListResponseDto,
  UserRefDto
} from '../../lib/mappers/base.mapper';

// Prisma types for pokemon with user data
export type PrismaPokemonWithUser = Prisma.PokemonGetPayload<{
  select: {
    id: true;
    sessionId: true;
    pokemonId: true;
    status: true;
    routeName: true;
    location: true;
    position: true;
    user: {
      select: { id: true; username: true };
    };
  };
}>;

// Legacy type for pokemon without user data (for transition)
export type PrismaPokemonLegacy = Prisma.PokemonGetPayload<{
  select: {
    id: true;
    userId: true;
    sessionId: true;
    pokemonId: true;
    status: true;
    routeName: true;
    location: true;
    position: true;
  };
}>;

export class PokemonMapper {
  /**
   * Maps a Prisma pokemon with user data to a Pokemon DTO
   */
  static mapPrismaToPokemonDto(pokemon: PrismaPokemonWithUser): PokemonDto {
    return {
      id: pokemon.id,
      user: {
        id: pokemon.user.id,
        username: pokemon.user.username,
      } as UserRefDto,
      sessionId: pokemon.sessionId,
      pokemonId: pokemon.pokemonId,
      status: pokemon.status,
      routeName: pokemon.routeName,
      location: pokemon.location,
      position: pokemon.position,
    };
  }

  /**
   * Maps a Prisma pokemon with user data to a PokemonListResponse DTO
   */
  static mapPrismaToPokemonListResponseDto(pokemons: PrismaPokemonWithUser[]): PokemonListResponseDto {
    return {
      pokemon: pokemons.map(pokemon => this.mapPrismaToPokemonDto(pokemon)),
    };
  }

  /**
   * Maps a single Prisma pokemon to a PokemonListResponse DTO (for consistency)
   */
  static mapPrismaToPokemonListResponseDtoSingle(pokemon: PrismaPokemonWithUser): PokemonListResponseDto {
    return {
      pokemon: [this.mapPrismaToPokemonDto(pokemon)],
    };
  }

  /**
   * Legacy mapper for pokemon without user data (for transition period)
   * This should be removed once all services are updated to include user data
   */
  static mapPrismaLegacyToPokemonDto(pokemon: PrismaPokemonLegacy): PokemonDto {
    return {
      id: pokemon.id,
      user: {
        id: pokemon.userId, // Using userId as user.id temporarily
        username: 'Unknown', // This will need to be fetched separately
      } as UserRefDto,
      sessionId: pokemon.sessionId,
      pokemonId: pokemon.pokemonId,
      status: pokemon.status,
      routeName: pokemon.routeName,
      location: pokemon.location,
      position: pokemon.position,
    };
  }

  /**
   * Legacy mapper for pokemon list without user data (for transition period)
   */
  static mapPrismaLegacyToPokemonListResponseDto(pokemons: PrismaPokemonLegacy[]): PokemonListResponseDto {
    return {
      pokemon: pokemons.map(pokemon => this.mapPrismaLegacyToPokemonDto(pokemon)),
    };
  }
} 