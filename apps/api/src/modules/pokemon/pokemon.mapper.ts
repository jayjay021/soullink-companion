import { Prisma } from '@prisma/client';
import { 
  PokemonDto, 
  PokemonListResponseDto,
  UserRefDto
} from '../../lib/mappers/base.mapper';
import { pokedexService } from '../pokedex/pokedex.service';

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
    const pokedexData = pokedexService.getPokemonById(pokemon.pokemonId);
    
    return {
      id: pokemon.id,
      user: {
        id: pokemon.user.id,
        username: pokemon.user.username,
      } as UserRefDto,
      sessionId: pokemon.sessionId,
      pokemonId: pokemon.pokemonId,
      name: pokedexData?.name.english || `Pokemon #${pokemon.pokemonId}`,
      image: pokedexData?.image.thumbnail || '',
      status: pokemon.status,
      routeName: pokemon.routeName,
      location: pokemon.location,
      position: pokemon.position,
    };
  }

  /**
   * Maps a Prisma pokemon with user data to a Pokemon DTO, enriched with Pokedex data
   */
  static mapPrismaToPokemonDtoEnriched(pokemon: PrismaPokemonWithUser): PokemonDto {
    const pokedexData = pokedexService.getPokemonById(pokemon.pokemonId);
    
    return {
      id: pokemon.id,
      user: {
        id: pokemon.user.id,
        username: pokemon.user.username,
      } as UserRefDto,
      sessionId: pokemon.sessionId,
      pokemonId: pokemon.pokemonId,
      name: pokedexData?.name.english || `Pokemon #${pokemon.pokemonId}`,
      image: pokedexData?.image.thumbnail || '',
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
   * Maps a Prisma pokemon with user data to a PokemonListResponse DTO, enriched with Pokedex data
   */
  static mapPrismaToPokemonListResponseDtoEnriched(pokemons: PrismaPokemonWithUser[]): PokemonListResponseDto {
    return {
      pokemon: pokemons.map(pokemon => this.mapPrismaToPokemonDtoEnriched(pokemon)),
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
   * Maps a single Prisma pokemon to a PokemonListResponse DTO, enriched with Pokedex data
   */
  static mapPrismaToPokemonListResponseDtoSingleEnriched(pokemon: PrismaPokemonWithUser): PokemonListResponseDto {
    return {
      pokemon: [this.mapPrismaToPokemonDtoEnriched(pokemon)],
    };
  }

} 