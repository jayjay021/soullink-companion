import { beforeAll, describe, expect, it } from '@jest/globals';
import { paths } from '@repo/api-spec/types';
import { schemas } from '@repo/api-spec/zod';
import supertest from 'supertest';
import { App } from 'supertest/types';

type CreateSessionRequest =
  paths['/session']['post']['requestBody']['content']['application/json'];

// Supertest - Test suite for session API endpoints
describe('Session API ', () => {
  let app: App;

  beforeAll(async () => {
    // Initialize the app before running tests
    const { createServer } = await import('../../../server');
    app = createServer();
  });

  describe('GET api/v1/session', () => {
    it('should return 200 OK with session data', async () => {
      const response = await supertest(app)
        .get('/api/v1/session')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('sessions');
      expect(response.body.sessions).toBeDefined();
    });

    it('should return empty array when no sessions exist', async () => {
      const response = await supertest(app)
        .get('/api/v1/session')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('sessions');
      expect(Array.isArray(response.body.sessions)).toBe(true);
      expect(response.body.sessions.length).toBe(0);
    });

    it('should return list of sessions after creating a session', async () => {
      const requestBody: CreateSessionRequest = {
        name: 'Test Session',
        description: 'This is a test session',
      };

      // First, create a session
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      //check if session was created successfully and response body matches Session schema
      expect(createResponse.status).toBe(201);

      // Validate the response using Zod schema
      const createSessionValidation = schemas.Session.safeParse(
        createResponse.body
      );
      expect(createSessionValidation.success).toBe(true);

      // Now, get the list of sessions
      const listResponse = await supertest(app)
        .get('/api/v1/session')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(listResponse.body).toHaveProperty('sessions');
      expect(Array.isArray(listResponse.body.sessions)).toBe(true);
      expect(listResponse.body.sessions.length).toBeGreaterThan(0);

      const sessionListValidation = schemas.SessionsResponse.safeParse(
        listResponse.body
      );
      expect(sessionListValidation.success).toBe(true);
    });
  });
  describe('POST api/v1/session', () => {
    it('should create a new session and return 201 Created', async () => {
      const requestBody: CreateSessionRequest = {
        name: 'New Session',
        description: 'This is a new session',
      };

      const response = await supertest(app)
        .post('/api/v1/session')
        .send(requestBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toBeDefined();

      // Validate the response using Zod schema
      const validation = schemas.Session.safeParse(response.body);
      expect(validation.success).toBe(true);
    });

    it('should return 400 Bad Request for invalid session data', async () => {
      const invalidRequestBody = {
        name: '', // Invalid name
      };

      await supertest(app)
        .post('/api/v1/session')
        .send(invalidRequestBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
  describe('GET api/v1/session/:sessionId', () => {
    it('should return 200 OK with session data for valid sessionId', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Get Test',
          description: 'This session is created for testing GET by ID',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;

      // Now, get the session by ID
      const response = await supertest(app)
        .get(`/api/v1/session/${sessionId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.Session.safeParse(response.body);
      expect(validation.success).toBe(true);
    });

    it('should return 404 Not Found for invalid sessionId', async () => {
      await supertest(app)
        .get('/api/v1/session/invalid-session-id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
  describe('PUT api/v1/session/:sessionId', () => {
    it('should update an existing session and return 200 OK', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Update Test',
          description: 'This session is created for testing PUT by ID',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;

      // Now, update the session
      const updateRequestBody: CreateSessionRequest = {
        name: 'Updated Session Name',
        description: 'This is an updated description',
      };

      const response = await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send(updateRequestBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.Session.safeParse(response.body);
      expect(validation.success).toBe(true);

      // Check if the session was updated correctly
      expect(response.body.name).toBe(updateRequestBody.name);
      expect(response.body.description).toBe(updateRequestBody.description);
    });

    it('should return 200 OK for starting a session', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Start Test',
          description: 'This session is created for testing starting a session',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;
      // Now, update the session to start it
      const response = await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({
          name: 'Started Session',
          description: 'This session is now started',
          started: true, // Assuming 'started' is a boolean field to indicate session start
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      // Validate the response using Zod schema
      const validation = schemas.Session.safeParse(response.body);
      expect(validation.success).toBe(true);
      // Check if the session was updated correctly
      expect(response.body.name).toBe('Started Session');
      expect(response.body.description).toBe('This session is now started');
      expect(response.body.started).toBe(true); // Check if the session is marked as started
    });

    it('should return 404 Not Found for invalid sessionId', async () => {
      await supertest(app)
        .put('/api/v1/session/invalid-session-id')
        .send({
          name: 'Invalid Session Update',
          description: 'This should not work',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
  describe('DELETE api/v1/session/:sessionId', () => {
    it('should delete an existing session and return 204 No Content', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Delete Test',
          description: 'This session is created for testing DELETE by ID',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;

      // Now, delete the session
      await supertest(app)
        .delete(`/api/v1/session/${sessionId}`)
        .set('Accept', 'application/json')
        .expect(204);

      // Verify that the session was deleted
      await supertest(app)
        .get(`/api/v1/session/${sessionId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it('should return 404 Not Found for invalid sessionId', async () => {
      await supertest(app)
        .delete('/api/v1/session/invalid-session-id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
  describe('POST api/v1/session/:sessionId/join', () => {
    it('should allow joining a session and return 200 OK', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Join Test',
          description: 'This session is created for testing JOIN by ID',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;

      // Now, join the session
      const response = await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({
          player: {
            name: 'Test Player',
            id: 'test-player-id',
          },
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.Session.safeParse(response.body);
      expect(validation.success).toBe(true);

      // Check if the player was added to the session
      expect(response.body.players).toBeDefined();
      expect(
        response.body.players.some(
          (p: { id: string; name: string }) => p.id === 'test-player-id'
        )
      ).toBe(true);
    });

    it('should return 400 Bad Request for invalid join data', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Invalid Join Test',
          description: 'This session is created for testing invalid JOIN',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;
      // Now, try to join the session with invalid data
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({
          player: {
            // Missing required fields
            name: '',
            id: '',
          },
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return 400 Bad Request for already joined session', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Already Joined Test',
          description:
            'This session is created for testing already joined JOIN',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;
      // Join the session once
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { name: 'Test Player', id: 'test-player-id' } })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      // Now, try to join the same session again
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: { name: 'Test Player', id: 'test-player-id' } })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
    it('should return 200 OK for one player joining multiple sessions', async () => {
      // First, create a session to get a valid sessionId
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Multiple Join Test',
          description: 'This session is created for testing multiple JOINs',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.parse(createResponse.body);
      const sessionId = session.id;

      // Join the first session with a player
      const player1 = { name: 'Player One', id: 'player-one-id' };
      const joinResponse = await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ player: player1 })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema
      const validation = schemas.Session.safeParse(joinResponse.body);
      expect(validation.success).toBe(true);
      // Check if the player was added to the session
      expect(joinResponse.body.players).toBeDefined();
      expect(
        joinResponse.body.players.some(
          (p: { id: string; name: string }) => p.id === player1.id
        )
      ).toBe(true);

      // Now, create another session to get a different sessionId
      const createResponse2 = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Second Session for Multiple Join Test',
          description: 'This is the second session for testing multiple JOINs',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session2 = schemas.Session.parse(createResponse2.body);
      const sessionId2 = session2.id;
      // Join the second session with the same player
      const response2 = await supertest(app)
        .post(`/api/v1/session/${sessionId2}/join`)
        .send({ player: player1 })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      // Validate the response using Zod schema
      const validation2 = schemas.Session.safeParse(response2.body);
      expect(validation2.success).toBe(true);
      // Check if the player was added to the second session
      expect(response2.body.players).toBeDefined();
      expect(
        response2.body.players.some(
          (p: { id: string; name: string }) => p.id === player1.id
        )
      ).toBe(true);

      // Check that the player still exists in the first session
      const getResponse = await supertest(app)
        .get(`/api/v1/session/${sessionId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(getResponse.body.players).toBeDefined();
      expect(
        getResponse.body.players.some(
          (p: { id: string; name: string }) => p.id === player1.id
        )
      ).toBe(true);
    });

    it('should return 404 Not Found for invalid sessionId', async () => {
      await supertest(app)
        .post('/api/v1/session/invalid-session-id/join')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });
});
