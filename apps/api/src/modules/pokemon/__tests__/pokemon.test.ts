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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
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
    it('should return 400 when trying to add Pokémon to a non-started session', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser3' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session (defaults to WAITING status)
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

      // Try to add a Pokémon while session is in WAITING status
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
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toContain(
        'Pokemon can only be added to sessions that are currently running'
      );
    });
    it('should allow adding Pokémon to a started session', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser4' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 4', description: 'Test Description 4' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Now try to add a Pokémon while session is in STARTED status
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
    it('should return 400 when trying to add Pokémon to a finished session', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser5' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 5', description: 'Test Description 5' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Finish the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'FINISHED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Try to add a Pokémon while session is in FINISHED status
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
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toContain(
        'Pokemon can only be added to sessions that are currently running'
      );
    });
    it('should return 400 when position is already taken', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser6' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 6', description: 'Test Description 6' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add a Pokémon to position 1
      const requestBody1: AddPokemonRequest = {
        userId: user.id,
        pokemonId: 25,
        status: 'CAUGHT',
        routeName: 'Route 1',
        location: 'BOX',
        position: 1,
      };

      await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send(requestBody1)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      // Try to add another Pokémon to the same position
      const requestBody2: AddPokemonRequest = {
        userId: user.id,
        pokemonId: 26,
        status: 'CAUGHT',
        routeName: 'Route 2',
        location: 'BOX',
        position: 1, // Same position as before
      };

      const response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send(requestBody2)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toContain(
        'Position is already taken'
      );
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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

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
      const validation = schemas.PokemonListResponse.strict().safeParse(
        response.body
      );
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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

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
    it('should return 400 for non-existent Pokémon', async () => {
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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Try to update a non-existent Pokémon
      await supertest(app)
        .patch(`/api/v1/pokemon/${sessionId}/999999`)
        .send({ status: 'DEAD' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
    it('should move pokemon to box when set status to DEAD', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUser9' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({ name: 'Test Session 8', description: 'Test Description 8' })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

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
          pokemonId: 25,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'TEAM',
          position: 1,
        })
        .expect(201);

      const pokemonId = addRes.body.id;

      // Update the Pokémon to DEAD status
      const updateData: UpdatePokemonRequest = {
        status: 'DEAD',
        routeName: 'Route 1',
        location: 'TEAM',
        position: 1,
      };

      const response = await supertest(app)
        .patch(`/api/v1/pokemon/${sessionId}/${pokemonId}`)
        .send(updateData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      //validate new location and position
      expect(response.body.location).toBe('BOX');
      expect(response.body.position).toBe(0);
      expect(response.body.status).toBe('DEAD');
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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

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
          position: 2,
        })
        .expect(201);

      const response = await supertest(app)
        .get(`/api/v1/pokemon/${sessionId}/routes`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.RouteListResponse.strict().safeParse(
        response.body
      );
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

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

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

  describe('POST /api/v1/pokemon/:sessionId/swap', () => {
    it('should successfully swap two Pokemon positions', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUserSwap1' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Test Swap Session',
          description: 'Test Swap Description',
        })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add two Pokemon to different positions
      const pokemon1Response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 1,
          status: 'CAUGHT',
          routeName: 'Route 1',
          location: 'TEAM',
          position: 0,
        })
        .expect(201);
      const pokemon1Id = pokemon1Response.body.id;

      const pokemon2Response = await supertest(app)
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
      const pokemon2Id = pokemon2Response.body.id;

      // Swap the Pokemon positions
      const swapResponse = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}/swap`)
        .send({
          pokemon1Id,
          pokemon2Id,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.SwapPokemonResponse.strict().safeParse(
        swapResponse.body
      );
      expect(validation.success).toBe(true);

      // Check that positions were swapped
      expect(swapResponse.body.pokemon1.id).toBe(pokemon1Id);
      expect(swapResponse.body.pokemon1.location).toBe('BOX'); // Swapped from TEAM
      expect(swapResponse.body.pokemon1.position).toBe(1); // Swapped from 0

      expect(swapResponse.body.pokemon2.id).toBe(pokemon2Id);
      expect(swapResponse.body.pokemon2.location).toBe('TEAM'); // Swapped from BOX
      expect(swapResponse.body.pokemon2.position).toBe(0); // Swapped from 1
    });

    it('should successfully swap two Pokemon between different locations', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUserSwap2' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Test Swap Session 2',
          description: 'Test Swap Description 2',
        })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add two Pokemon to different locations
      const pokemon1Response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 7,
          status: 'CAUGHT',
          routeName: 'Route 3',
          location: 'TEAM',
          position: 0,
        })
        .expect(201);
      const pokemon1Id = pokemon1Response.body.id;

      const pokemon2Response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 50,
          status: 'CAUGHT',
          routeName: 'Route 4',
          location: 'BOX',
          position: 1,
        })
        .expect(201);
      const pokemon2Id = pokemon2Response.body.id;

      // Swap the Pokemon positions
      const swapResponse = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}/swap`)
        .send({
          pokemon1Id,
          pokemon2Id,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Check that positions were swapped within the same location
      expect(swapResponse.body.pokemon1.id).toBe(pokemon1Id);
      expect(swapResponse.body.pokemon1.location).toBe('BOX'); // Swapped from TEAM to BOX
      expect(swapResponse.body.pokemon1.position).toBe(1); // Swapped from 0 to 1

      expect(swapResponse.body.pokemon2.id).toBe(pokemon2Id);
      expect(swapResponse.body.pokemon2.location).toBe('TEAM'); // Swapped from BOX to TEAM
      expect(swapResponse.body.pokemon2.position).toBe(0); // Swapped from 1 to 0
    });

    it('should return 404 when first Pokemon does not exist', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUserSwap3' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Test Swap Session 3',
          description: 'Test Swap Description 3',
        })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add only one Pokemon
      const pokemon2Response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 10,
          status: 'CAUGHT',
          routeName: 'Route 5',
          location: 'BOX',
          position: 0,
        })
        .expect(201);
      const pokemon2Id = pokemon2Response.body.id;

      // Try to swap with non-existent Pokemon
      const response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}/swap`)
        .send({
          pokemon1Id: 'non-existent-id',
          pokemon2Id,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('First Pokemon not found');
    });

    it('should return 404 when second Pokemon does not exist', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUserSwap4' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Test Swap Session 4',
          description: 'Test Swap Description 4',
        })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add only one Pokemon
      const pokemon1Response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 11,
          status: 'CAUGHT',
          routeName: 'Route 6',
          location: 'BOX',
          position: 0,
        })
        .expect(201);
      const pokemon1Id = pokemon1Response.body.id;

      // Try to swap with non-existent Pokemon
      const response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}/swap`)
        .send({
          pokemon1Id,
          pokemon2Id: 'non-existent-id',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Second Pokemon not found');
    });

    it('should return 409 when trying to swap Pokemon from different users', async () => {
      // Create two users
      const user1Response = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUserSwap5a' })
        .expect(201);
      const user1 = user1Response.body.user;

      const user2Response = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUserSwap5b' })
        .expect(201);
      const user2 = user2Response.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Test Swap Session 5',
          description: 'Test Swap Description 5',
        })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Both users join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user1.id })
        .expect(200);

      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user2.id })
        .expect(200);

      // Add Pokemon for both users
      const pokemon1Response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user1.id,
          pokemonId: 12,
          status: 'CAUGHT',
          routeName: 'Route 7',
          location: 'BOX',
          position: 0,
        })
        .expect(201);
      const pokemon1Id = pokemon1Response.body.id;

      const pokemon2Response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user2.id,
          pokemonId: 13,
          status: 'CAUGHT',
          routeName: 'Route 8',
          location: 'BOX',
          position: 0,
        })
        .expect(201);
      const pokemon2Id = pokemon2Response.body.id;

      // Try to swap Pokemon from different users
      const response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}/swap`)
        .send({
          pokemon1Id,
          pokemon2Id,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe(
        'Cannot swap Pokemon from different users'
      );
    });

    it('should return 409 when trying to swap Pokemon with itself', async () => {
      // Create a user first
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({ username: 'TestUserSwap6' })
        .expect(201);
      const user = userResponse.body.user;

      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Test Swap Session 6',
          description: 'Test Swap Description 6',
        })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Start the session
      await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({ status: 'STARTED' })
        .expect(200);

      // Join the session
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .expect(200);

      // Add one Pokemon
      const pokemonResponse = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}`)
        .send({
          userId: user.id,
          pokemonId: 14,
          status: 'CAUGHT',
          routeName: 'Route 9',
          location: 'BOX',
          position: 0,
        })
        .expect(201);
      const pokemonId = pokemonResponse.body.id;

      // Try to swap Pokemon with itself
      const response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}/swap`)
        .send({
          pokemon1Id: pokemonId,
          pokemon2Id: pokemonId,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(409);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe(
        'Cannot swap Pokemon with itself'
      );
    });

    it('should return 400 when request body is invalid', async () => {
      // Create a session
      const sessionResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Test Swap Session 7',
          description: 'Test Swap Description 7',
        })
        .expect(201);
      const sessionId = sessionResponse.body.id;

      // Try to swap with invalid request body (missing pokemon2Id)
      const response = await supertest(app)
        .post(`/api/v1/pokemon/${sessionId}/swap`)
        .send({
          pokemon1Id: 'some-id',
          // missing pokemon2Id
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 404 when session does not exist', async () => {
      // Try to swap Pokemon in non-existent session
      const response = await supertest(app)
        .post('/api/v1/pokemon/non-existent-session/swap')
        .send({
          pokemon1Id: 'some-id-1',
          pokemon2Id: 'some-id-2',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('First Pokemon not found');
    });
  });
});
