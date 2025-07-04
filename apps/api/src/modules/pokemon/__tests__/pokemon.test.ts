import { beforeAll, describe, expect, it } from '@jest/globals';
import { schemas } from '@repo/api-spec/zod';
import supertest from 'supertest';
import { App } from 'supertest/types';
import { z } from 'zod';

type AddPokemonRequest = z.infer<typeof schemas.CreatePokemonRequest>;
type UpdatePokemonRequest = z.infer<typeof schemas.UpdatePokemonRequest>;

describe('Pokemon API', () => {
  let app: App;

  beforeAll(async () => {
    // Initialize the app before running tests
    const { createServer } = await import('../../../server');
    app = createServer();
  });

  describe('POST /api/v1/pokemon/:sessionId', () => {
    it('should add a new Pokémon and return 201', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session', description: 'Test Description' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      const requestBody: AddPokemonRequest = {
        userId: user.id,
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

      // Validate the response using Zod schema
      const validation = schemas.Pokemon.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
      expect(response.body.user.id).toBe(user.id);
      expect(response.body.pokemonId).toBe(25);
    });
    it('should return 400 for invalid Pokémon data', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser2' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 2', description: 'Test Description 2' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      const invalidBody = { userId: '', pokemonId: 0 };
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send(invalidBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe('GET /api/v1/pokemon/:sessionId', () => {
    it('should list Pokémon for a session', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser3' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 3', description: 'Test Description 3' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add a Pokémon
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 1,
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

      // Validate the response using Zod schema
      const validation = schemas.PokemonListResponse.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
      expect(response.body.pokemon).toHaveLength(1);
      expect(response.body.pokemon[0].user.id).toBe(user.id);
    });
    it('should filter Pokémon by userId', async () => {
      // Create two users
      const user1Response = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser4' })
        .expect(201);
      const user1 = user1Response.body.user;

      const user2Response = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser5' })
        .expect(201);
      const user2 = user2Response.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 4', description: 'Test Description 4' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Both users join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user1.id })
        .expect(200);

      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user2.id })
        .expect(200);

      // Add Pokémon for both users
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user1.id,
          pokemonId: 1,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user2.id,
          pokemonId: 4,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      // Filter by user1
      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}?userId=${user1.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.pokemon).toHaveLength(1);
      expect(response.body.pokemon[0].user.id).toBe(user1.id);
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
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser6' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 5', description: 'Test Description 5' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add a Pokémon
      const addRes = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 7,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      const pokemonId = addRes.body.id;

      // Update the Pokémon
      const updateData: UpdatePokemonRequest = {
        status: 'DEAD',
        routeName: 'Route 1',
        location: 'TEAM',
        position: 2,
      };

      const response = await supertest(app)
        .patch(`/api/v1/pokemon/${sessionId}/${pokemonId}`)
        .send(updateData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.Pokemon.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
      expect(response.body.status).toBe('DEAD');
      expect(response.body.location).toBe('TEAM');
      expect(response.body.position).toBe(2);
    });
    it('should return 400 for invalid update data', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser7' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 6', description: 'Test Description 6' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add a Pokémon
      const addRes = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 10,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      const pokemonId = addRes.body.id;

      // Try to update with invalid data
      await supertest(app)
        .patch(`/api/v1/pokemon/${sessionId}/${pokemonId}`)
        .send({ status: 'INVALID_STATUS' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });

  describe('GET /api/v1/pokemon/:sessionId/routes', () => {
    it('should return unique routes for a session', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser8' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 7', description: 'Test Description 7' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add Pokémon on different routes
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 1,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 4,
          status: 'CAUGHT',
          routeName: 'Route 2',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}/routes`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.RouteListResponse.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
      expect(response.body.routes).toContain('Route 1');
      expect(response.body.routes).toContain('Route 2');
      expect(response.body.routes).toHaveLength(2);
    });
    it('should filter routes by userId', async () => {
      // Create two users
      const user1Response = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser9' })
        .expect(201);
      const user1 = user1Response.body.user;

      const user2Response = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser10' })
        .expect(201);
      const user2 = user2Response.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 8', description: 'Test Description 8' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Both users join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user1.id })
        .expect(200);

      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user2.id })
        .expect(200);

      // Add Pokémon for both users on different routes
      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user1.id,
          pokemonId: 1,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user2.id,
          pokemonId: 4,
          status: 'CAUGHT',
          routeName: 'Route 2',
          location: 'BOX',
          position: 1,
        })
        .expect(201);

      // Filter routes by user1
      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}/routes?userId=${user1.id}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.routes).toContain('Route 1');
      expect(response.body.routes).not.toContain('Route 2');
      expect(response.body.routes).toHaveLength(1);
    });
  });
});
