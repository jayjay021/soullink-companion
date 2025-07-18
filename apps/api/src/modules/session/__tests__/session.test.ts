import { beforeAll, describe, expect, it } from '@jest/globals';
import { schemas } from '@repo/api-spec/zod';
import supertest from 'supertest';
import { App } from 'supertest/types';
import { z } from 'zod';

type CreateSessionRequest = z.infer<typeof schemas.CreateSessionRequest>;
type UpdateSessionRequest = z.infer<typeof schemas.UpdateSessionRequest>;

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

      // Validate the response using Zod schema with strict validation
      const validation = schemas.Session.strict().safeParse(
        createResponse.body
      );
      expect(validation.success).toBe(true);

      // Now, get the list of sessions
      const listResponse = await supertest(app)
        .get('/api/v1/session')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(listResponse.body).toHaveProperty('sessions');
      expect(Array.isArray(listResponse.body.sessions)).toBe(true);
      expect(listResponse.body.sessions.length).toBeGreaterThan(0);

      const sessionListValidation = schemas.SessionsResponse.strict().safeParse(
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

      // Validate the response using Zod schema with strict validation
      const validation = schemas.Session.strict().safeParse(response.body);
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

      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;

      // Now, get the session by ID
      const response = await supertest(app)
        .get(`/api/v1/session/${sessionId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema with strict validation
      const validation = schemas.Session.strict().safeParse(response.body);
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

      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;

      // Now, update the session
      const updateRequestBody: UpdateSessionRequest = {
        name: 'Updated Session Name',
        description: 'This is an updated description',
      };

      const response = await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send(updateRequestBody)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema with strict validation
      const validation = schemas.Session.strict().safeParse(response.body);
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
      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;
      // Now, update the session to start it
      const response = await supertest(app)
        .put(`/api/v1/session/${sessionId}`)
        .send({
          name: 'Started Session',
          description: 'This session is now started',
          status: 'STARTED', // Using the new status enum instead of boolean
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      // Validate the response using Zod schema with strict validation
      const validation = schemas.Session.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
      // Check if the session was updated correctly
      expect(response.body.name).toBe('Started Session');
      expect(response.body.description).toBe('This session is now started');
      expect(response.body.status).toBe('STARTED'); // Check if the session status is STARTED
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

      const session = schemas.Session.strict().parse(createResponse.body);
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
    it('should allow joining a session with existing user and return 200 OK', async () => {
      // First, create a user
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({
          username: 'TestUser',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const user = userResponse.body.user;

      // Create a session
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Join Test',
          description: 'This session is created for testing JOIN by ID',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;

      // Now, join the session with the existing user
      const response = await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({
          userId: user.id,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Check basic response structure first
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('users');
      expect(Array.isArray(response.body.users)).toBe(true);

      // Validate the response using Zod schema with strict validation
      const validation = schemas.Session.strict().safeParse(response.body);
      expect(validation.success).toBe(true);

      // Check if the user was added to the session
      expect(response.body.users).toBeDefined();
      expect(
        response.body.users.some(
          (p: { id: string; username: string }) => p.id === user.id
        )
      ).toBe(true);
    });

    it('should return 400 Bad Request for invalid join data', async () => {
      // Create a session
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Invalid Join Test',
          description: 'This session is created for testing invalid JOIN',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;
      
      // Try to join the session with invalid data
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({
          userId: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return 400 Bad Request for already joined session', async () => {
      // First, create a user
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({
          username: 'TestUser',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const user = userResponse.body.user;

      // Create a session
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Already Joined Test',
          description: 'This session is created for testing already joined JOIN',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;
      
      // Join the session once
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Now, try to join the same session again
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return 200 OK for one user joining multiple sessions', async () => {
      // First, create a user
      const userResponse = await supertest(app)
        .post('/api/v1/users')
        .send({
          username: 'MultiSessionUser',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const user = userResponse.body.user;

      // Create first session
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Multiple Join Test',
          description: 'This session is created for testing multiple JOINs',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;

      // Join the first session with the user
      const joinResponse = await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({ userId: user.id })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      // Validate the response using Zod schema with strict validation
      const validation = schemas.Session.strict().safeParse(joinResponse.body);
      expect(validation.success).toBe(true);
      
      // Check if the user was added to the session
      expect(joinResponse.body.users).toBeDefined();
      expect(
        joinResponse.body.users.some(
          (p: { id: string; username: string }) => p.id === user.id
        )
      ).toBe(true);

      // Create second session
      const createResponse2 = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Second Session for Multiple Join Test',
          description: 'This is the second session for testing multiple JOINs',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session2 = schemas.Session.strict().parse(createResponse2.body);
      const sessionId2 = session2.id;
      
      // Join the second session with the same user
      const response2 = await supertest(app)
        .post(`/api/v1/session/${sessionId2}/join`)
        .send({ userId: user.id })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      
      // Validate the response using Zod schema with strict validation
      const validation2 = schemas.Session.strict().safeParse(response2.body);
      expect(validation2.success).toBe(true);
      
      // Check if the user was added to the second session
      expect(response2.body.users).toBeDefined();
      expect(
        response2.body.users.some(
          (p: { id: string; username: string }) => p.id === user.id
        )
      ).toBe(true);

      // Check that the user still exists in the first session
      const getResponse = await supertest(app)
        .get(`/api/v1/session/${sessionId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      expect(getResponse.body.users).toBeDefined();
      expect(
        getResponse.body.users.some(
          (p: { id: string; username: string }) => p.id === user.id
        )
      ).toBe(true);
      
      // Validate the response using Zod schema with strict validation
      const validation3 = schemas.Session.strict().safeParse(getResponse.body);
      expect(validation3.success).toBe(true);
    });

    it('should return 404 Not Found for invalid sessionId', async () => {
      await supertest(app)
        .post('/api/v1/session/invalid-session-id/join')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it('should return 400 Bad Request when trying to join with non-existent user', async () => {
      // Create a session
      const createResponse = await supertest(app)
        .post('/api/v1/session')
        .send({
          name: 'Session for Non-existent User Test',
          description: 'This session is created for testing non-existent user join',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      const session = schemas.Session.strict().parse(createResponse.body);
      const sessionId = session.id;
      
      // Try to join with a non-existent user
      await supertest(app)
        .post(`/api/v1/session/${sessionId}/join`)
        .send({
          userId: 'non-existent-user-id',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});
