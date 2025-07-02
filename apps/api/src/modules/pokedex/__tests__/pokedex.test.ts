import { beforeAll, describe, expect, it } from '@jest/globals';
import { schemas } from '@repo/api-spec/zod';
import supertest from 'supertest';
import { createServer } from '../../../server';
import { pokedexService } from '../pokedex.service';
import type { components } from '@repo/api-spec/types';

describe('Pokédex API', () => {
  const app = createServer();
  const request = supertest(app);

  beforeAll(async () => {
    // Load Pokédex data before running tests
    await pokedexService.loadData();
  });

  describe('GET /api/v1/pokedex/pokemon', () => {
    it('should return 200 OK with all Pokémon data', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('pokemon');
      expect(Array.isArray(response.body.pokemon)).toBe(true);
      expect(response.body.pokemon.length).toBeGreaterThan(0);

      // Validate the response structure
      const validationResult = schemas.PokedexPokemonResponse.safeParse(
        response.body
      );
      if (!validationResult.success) {
        console.log('Validation errors:', validationResult.error.errors);
        console.log(
          'First Pokemon sample:',
          JSON.stringify(response.body.pokemon[0], null, 2)
        );
      }
      expect(validationResult.success).toBe(true);
    });

    it('should filter by ID correctly', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?id=1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(1);
      expect(response.body.pokemon[0]).toMatchObject({
        id: 1,
        name: {
          english: 'Bulbasaur',
        },
      });
    });

    it('should filter by name correctly (case-insensitive)', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?name=bulbasaur')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(1);
      expect(response.body.pokemon[0]).toMatchObject({
        id: 1,
        name: {
          english: 'Bulbasaur',
        },
      });
    });

    it('should filter by partial name correctly', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?name=bulba')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(1);
      expect(response.body.pokemon[0].name.english).toBe('Bulbasaur');
    });

    it('should return multiple results for common name parts', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?name=chu')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon.length).toBeGreaterThan(1);
      // Should include Pikachu, Raichu, etc.
      const names = response.body.pokemon.map(
        (p: { name: { english: string } }) => p.name.english
      );
      expect(names.some((name: string) => name.includes('chu'))).toBe(true);
    });

    it('should return empty array for non-existent ID', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?id=9999')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(0);
    });

    it('should return empty array for non-existent name', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?name=nonexistentpokemon')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(0);
    });

    it('should validate ID parameter range', async () => {
      // Test with ID too high - should return empty array since Pokemon don't exist beyond 898
      const response1 = await request
        .get('/api/v1/pokedex/pokemon?id=10000')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response1.body.pokemon).toHaveLength(0);

      // Test with ID too low
      await request
        .get('/api/v1/pokedex/pokemon?id=0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should validate ID parameter as number', async () => {
      await request
        .get('/api/v1/pokedex/pokemon?id=invalid')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should validate name parameter minimum length', async () => {
      await request
        .get('/api/v1/pokedex/pokemon?name=')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return correct Pokémon data structure', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?id=25') // Pikachu
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(1);
      const pokemon = response.body.pokemon[0];

      // Check all required properties
      expect(pokemon).toHaveProperty('id');
      expect(pokemon).toHaveProperty('name');
      expect(pokemon).toHaveProperty('type');
      expect(pokemon).toHaveProperty('base');
      expect(pokemon).toHaveProperty('species');
      expect(pokemon).toHaveProperty('description');
      expect(pokemon).toHaveProperty('profile');
      expect(pokemon).toHaveProperty('image');

      // Check nested structures
      expect(pokemon.name).toHaveProperty('english');
      expect(pokemon.name).toHaveProperty('japanese');
      expect(pokemon.name).toHaveProperty('german');

      expect(pokemon.base).toHaveProperty('HP');
      expect(pokemon.base).toHaveProperty('Attack');
      expect(pokemon.base).toHaveProperty('Defense');

      expect(pokemon.image).toHaveProperty('sprite');
      expect(pokemon.image).toHaveProperty('thumbnail');
      expect(pokemon.image).toHaveProperty('hires');
    });

    it('should work with both ID and name filters simultaneously', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?id=1&name=bulbasaur')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(1);
      expect(response.body.pokemon[0]).toMatchObject({
        id: 1,
        name: {
          english: 'Bulbasaur',
        },
      });
    });

    it('should support pagination with limit and offset', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?limit=5&offset=0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pokemon).toHaveLength(5);
      expect(response.body.pagination).toMatchObject({
        total: expect.any(Number),
        limit: 5,
        offset: 0,
        hasNext: true,
        hasPrevious: false,
      });

      // Test second page
      const response2 = await request
        .get('/api/v1/pokedex/pokemon?limit=5&offset=5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response2.body.pokemon).toHaveLength(5);
      expect(response2.body.pagination).toMatchObject({
        limit: 5,
        offset: 5,
        hasNext: true,
        hasPrevious: true,
      });

      // Verify different Pokemon on different pages
      expect(response.body.pokemon[0].id).not.toBe(response2.body.pokemon[0].id);
    });

    it('should filter by type correctly', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?type=Fire')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon.length).toBeGreaterThan(0);
      response.body.pokemon.forEach((pokemon: components['schemas']['PokedexPokemon']) => {
        expect(pokemon.type).toContain('Fire');
      });
    });

    it('should filter by ID range correctly', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?minId=1&maxId=10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon.length).toBeGreaterThan(0);
      response.body.pokemon.forEach((pokemon: components['schemas']['PokedexPokemon']) => {
        expect(pokemon.id).toBeGreaterThanOrEqual(1);
        expect(pokemon.id).toBeLessThanOrEqual(10);
      });
    });

    it('should combine filters with pagination', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?type=Water&limit=3&offset=0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(3);
      expect(response.body.pagination.hasNext).toBe(true);
      response.body.pokemon.forEach((pokemon: components['schemas']['PokedexPokemon']) => {
        expect(pokemon.type).toContain('Water');
      });
    });

    it('should validate pagination parameters', async () => {
      // Test invalid limit
      await request
        .get('/api/v1/pokedex/pokemon?limit=0')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      await request
        .get('/api/v1/pokedex/pokemon?limit=101')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      // Test invalid offset
      await request
        .get('/api/v1/pokedex/pokemon?offset=-1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return correct pagination info for last page', async () => {
      const response = await request
        .get('/api/v1/pokedex/pokemon?limit=10&offset=890')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pagination.hasNext).toBe(false);
      expect(response.body.pagination.hasPrevious).toBe(true);
    });
  });
});
