import { beforeAll, describe, expect, it } from '@jest/globals';
import { paths } from '@repo/api-spec/types';
import { schemas } from '@repo/api-spec/zod';
import supertest from 'supertest';
import { App } from 'supertest/types';

type AddPokemonRequest =
  paths['/pokemon/{sessionId}']['post']['requestBody']['content']['application/json'];

describe('Pokemon API', () => {
  let app: App;

  beforeAll(async () => {
    const { createServer } = await import('../../../server');
    app = createServer();
  });

  describe('POST /api/v1/pokemon/:sessionId', () => {
    it('should add a new Pokémon and return 201', async () => {
      // Create a session and join with a player for this test
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Add Test ${Date.now()}`,
          description: 'Test session for add',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-add`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      const requestBody: AddPokemonRequest = {
        playerId: uniquePlayer,
        pokemonId: 25,
        status: 'CAUGHT',
        routeName: 'Route 1',
        location: 'BOX',
        position: 1,
      };
      const response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      expect(response.body).toBeDefined();
      const validation = schemas.Pokemon.safeParse(response.body);
      expect(validation.success).toBe(true);
    });
    it('should return 400 for invalid Pokémon data', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Invalid Add ${Date.now()}`,
          description: 'Test session for invalid add',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-invalid-add`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      const invalidBody = { playerId: '', pokemonId: 0 };
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send(invalidBody)
        .set('Accept', 'application/json')
        .expect(400);
    });
  });

  describe('GET /api/v1/pokemon/:sessionId', () => {
    it('should list Pokémon for a session', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon List Test ${Date.now()}`,
          description: 'Test session for list',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-list`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      // Add a Pokémon
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          playerId: uniquePlayer,
          pokemonId: 25,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);
      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toHaveProperty('pokemon');
      expect(Array.isArray(response.body.pokemon)).toBe(true);
      const validation = schemas.PokemonListResponse.safeParse(response.body);
      expect(validation.success).toBe(true);
    });
    it('should filter Pokémon by playerId', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Filter Test ${Date.now()}`,
          description: 'Test session for filter',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-filter`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          playerId: uniquePlayer,
          pokemonId: 25,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);
      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}?playerId=${uniquePlayer}`)
        .set('Accept', 'application/json')
        .expect(200);
      expect(response.body).toHaveProperty('pokemon');
      expect(Array.isArray(response.body.pokemon)).toBe(true);
    });
    it('should return 400 for invalid status filter', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Invalid Status ${Date.now()}`,
          description: 'Test session for invalid status',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}?status=INVALID_STATUS`)
        .set('Accept', 'application/json')
        .expect(400);
    });
  });

  describe('PATCH /api/v1/pokemon/:sessionId/:id', () => {
    it('should update a Pokémon and return 200', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Update Test ${Date.now()}`,
          description: 'Test session for update',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-update`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      // Add a Pokémon
      const addRes = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          playerId: uniquePlayer,
          pokemonId: 25,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);
      const pokemonId = addRes.body.id;
      const updateBody = { status: 'DEAD', location: 'BOX', position: 2 };
      const response = await supertest(app)
        .patch(`/api/v1/pokemon/${sessionId}/${pokemonId}`)
        .send(updateBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      const validation = schemas.Pokemon.safeParse(response.body);
      expect(validation.success).toBe(true);
      expect(response.body.status).toBe('DEAD');
    });
    it('should return 400 for invalid update data', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Invalid Update ${Date.now()}`,
          description: 'Test session for invalid update',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-invalid-update`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      const addRes = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          playerId: uniquePlayer,
          pokemonId: 25,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);
      const pokemonId = addRes.body.id;
      await supertest(app)
        .patch(`/api/v1/pokemon/${sessionId}/${pokemonId}`)
        .send({ status: 'INVALID_STATUS' })
        .set('Accept', 'application/json')
        .expect(400);
    });
  });

  describe('GET /api/v1/pokemon/:sessionId/routes', () => {
    it('should return unique routes for a session', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Routes Test ${Date.now()}`,
          description: 'Test session for routes',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-routes`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      // Add a Pokémon
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          playerId: uniquePlayer,
          pokemonId: 25,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);
      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}/routes`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toHaveProperty('routes');
      expect(Array.isArray(response.body.routes)).toBe(true);
      const validation = schemas.RouteListResponse.safeParse(response.body);
      expect(validation.success).toBe(true);
    });
    it('should filter routes by playerId', async () => {
      const sessionRes = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: `Pokemon Routes Player Test ${Date.now()}`,
          description: 'Test session for routes by player',
        })
        .expect(201);
      const sessionId = sessionRes.body.id;
      const uniquePlayer = `player-${Date.now()}-routes-player`;
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { id: uniquePlayer, name: uniquePlayer } })
        .expect(200);
      // Add a Pokémon
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          playerId: uniquePlayer,
          pokemonId: 25,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);
      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}/routes?playerId=${uniquePlayer}`)
        .set('Accept', 'application/json')
        .expect(200);
      expect(response.body).toHaveProperty('routes');
      expect(Array.isArray(response.body.routes)).toBe(true);
    });
  });
});
