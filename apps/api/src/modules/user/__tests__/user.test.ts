import { beforeAll, beforeEach, afterAll, describe, expect, it } from '@jest/globals';
import { schemas } from '@repo/api-spec/zod';
import supertest from 'supertest';
import { App } from 'supertest/types';
import { prisma } from '../../../lib/prisma';
import { z } from 'zod';

type CreateUserRequest = z.infer<typeof schemas.CreateUserRequest>;

describe('User API', () => {
  let app: App;

  beforeAll(async () => {
    // Initialize the app before running tests
    const { createServer } = await import('../../../server');
    app = createServer();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await prisma.playerSession.deleteMany();
    await prisma.pokemon.deleteMany();
    await prisma.user.deleteMany();
    await prisma.session.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user successfully', async () => {
      const userData: CreateUserRequest = {
        username: 'TestUser',
      };

      const response = await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user).toHaveProperty('createdAt');

      // Validate the response using Zod schema
      const validation = schemas.CreateUserResponse.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
    });

    it('should return 400 for empty username', async () => {
      const userData = {
        username: '',
      };

      await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return 400 for username too short (< 2 chars)', async () => {
      const userData = {
        username: 'A',
      };

      await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should return 400 for username too long (> 50 chars)', async () => {
      const userData = {
        username: 'A'.repeat(51),
      };

      await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should allow duplicate usernames (no uniqueness constraint)', async () => {
      const userData: CreateUserRequest = {
        username: 'DuplicateUser',
      };

      // Create first user
      await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      // Create second user with same username
      const response = await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body.user.username).toBe(userData.username);
    });

    it('should return proper user object with ID, username, createdAt', async () => {
      const userData: CreateUserRequest = {
        username: 'ValidUser',
      };

      const response = await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      const user = response.body.user;
      expect(user).toHaveProperty('id');
      expect(typeof user.id).toBe('string');
      expect(user.id.length).toBeGreaterThan(0);
      expect(user.username).toBe(userData.username);
      expect(user).toHaveProperty('createdAt');
      expect(typeof user.createdAt).toBe('string');
    });
  });

  describe('GET /api/v1/users/:userId', () => {
    let testUserId: string;

    beforeEach(async () => {
      // Create a test user
      const userData: CreateUserRequest = {
        username: 'GetTestUser',
      };

      const response = await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      testUserId = response.body.user.id;
    });

    it('should return user by valid ID', async () => {
      const response = await supertest(app)
        .get(`/api/v1/users/${testUserId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user.id).toBe(testUserId);
      expect(response.body.user.username).toBe('GetTestUser');
      expect(response.body.user).toHaveProperty('createdAt');

      // Validate the response using Zod schema
      const validation = schemas.GetUserResponse.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
    });

    it('should return 404 for non-existent ID', async () => {
      const fakeId = 'cmchjbyr40007uldap86f37n7';

      await supertest(app)
        .get(`/api/v1/users/${fakeId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });
  });

  describe('PUT /api/v1/users/:userId', () => {
    let testUserId: string;

    beforeEach(async () => {
      // Create a test user
      const userData: CreateUserRequest = {
        username: 'UpdateTestUser',
      };

      const response = await supertest(app)
        .post('/api/v1/users')
        .send(userData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      testUserId = response.body.user.id;
    });

    it('should update username successfully', async () => {
      const updateData = {
        username: 'UpdatedUsername',
      };

      const response = await supertest(app)
        .put(`/api/v1/users/${testUserId}`)
        .send(updateData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.user.id).toBe(testUserId);
      expect(response.body.user.username).toBe(updateData.username);
      expect(response.body.user).toHaveProperty('createdAt');

      // Validate the response using Zod schema
      const validation = schemas.GetUserResponse.strict().safeParse(response.body);
      expect(validation.success).toBe(true);
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = 'cmchjbyr40007uldap86f37n7';
      const updateData = {
        username: 'NewUsername',
      };

      await supertest(app)
        .put(`/api/v1/users/${fakeId}`)
        .send(updateData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
    });

    it('should return 400 for invalid username', async () => {
      const invalidUpdate = {
        username: 'A', // Too short
      };

      await supertest(app)
        .put(`/api/v1/users/${testUserId}`)
        .send(invalidUpdate)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });

    it('should allow duplicate usernames after update', async () => {
      // Create another user
      const anotherUserData: CreateUserRequest = {
        username: 'AnotherUser',
      };

      await supertest(app)
        .post('/api/v1/users')
        .send(anotherUserData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);

      // Update our test user with the same username
      const updateData = {
        username: 'AnotherUser',
      };

      const response = await supertest(app)
        .put(`/api/v1/users/${testUserId}`)
        .send(updateData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.user.username).toBe(updateData.username);
    });
  });
}); 