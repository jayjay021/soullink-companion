# API Development Workflow Guide

This guide outlines the API-first, TDD approach for developing new endpoints in the SoulLink Companion API.

## Overview

Our development stack:
- **Monorepo**: Turborepo with pnpm workspaces
- **API Spec**: Shared `@repo/api-spec` package with OpenAPI definitions
- **Testing**: Jest with supertest for integration testing
- **Type Safety**: TypeScript with generated types from OpenAPI spec
- **Documentation**: Auto-generated Swagger UI from OpenAPI spec

## Development Flow

### 1. Design the API Contract (OpenAPI First)

Start by defining your endpoint in the OpenAPI specification before writing any code.

#### Steps:
1. **Open the OpenAPI spec file**:
   ```
   packages/api-spec/specs/openapi.yaml
   ```

2. **Define your new endpoint** following OpenAPI 3.0.3 specification:
   ```yaml
   paths:
     /users:
       get:
         summary: Get all users
         description: Retrieve a list of users with pagination
         operationId: getUsers
         tags:
           - Users
         parameters:
           - name: page
             in: query
             schema:
               type: integer
               minimum: 1
               default: 1
           - name: limit
             in: query
             schema:
               type: integer
               minimum: 1
               maximum: 100
               default: 10
         responses:
           '200':
             description: List of users
             content:
               application/json:
                 schema:
                   type: object
                   properties:
                     data:
                       type: array
                       items:
                         $ref: '#/components/schemas/User'
                     pagination:
                       $ref: '#/components/schemas/Pagination'
           '400':
             $ref: '#/components/responses/BadRequest'
           '500':
             $ref: '#/components/responses/InternalError'
       
       post:
         summary: Create a new user
         description: Create a new user account
         operationId: createUser
         tags:
           - Users
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 $ref: '#/components/schemas/CreateUserRequest'
         responses:
           '201':
             description: User created successfully
             content:
               application/json:
                 schema:
                   $ref: '#/components/schemas/UserResponse'
           '400':
             $ref: '#/components/responses/BadRequest'
           '409':
             description: User already exists
             content:
               application/json:
                 schema:
                   type: object
                   properties:
                     error:
                       type: string
                       example: "User with this email already exists"
           '500':
             $ref: '#/components/responses/InternalError'
     
     /users/{userId}:
       get:
         summary: Get user by ID
         description: Retrieve a specific user by their ID
         operationId: getUserById
         tags:
           - Users
         parameters:
           - name: userId
             in: path
             required: true
             schema:
               type: string
               format: uuid
         responses:
           '200':
             description: User details
             content:
               application/json:
                 schema:
                   $ref: '#/components/schemas/UserResponse'
           '404':
             $ref: '#/components/responses/NotFound'
           '500':
             $ref: '#/components/responses/InternalError'
       
       put:
         summary: Update user
         description: Update an existing user's information
         operationId: updateUser
         tags:
           - Users
         parameters:
           - name: userId
             in: path
             required: true
             schema:
               type: string
               format: uuid
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 $ref: '#/components/schemas/UpdateUserRequest'
         responses:
           '200':
             description: User updated successfully
             content:
               application/json:
                 schema:
                   $ref: '#/components/schemas/UserResponse'
           '400':
             $ref: '#/components/responses/BadRequest'
           '404':
             $ref: '#/components/responses/NotFound'
           '409':
             description: Email already in use
             content:
               application/json:
                 schema:
                   type: object
                   properties:
                     error:
                       type: string
                       example: "Email already in use by another user"
           '500':
             $ref: '#/components/responses/InternalError'
       
       delete:
         summary: Delete user
         description: Delete a user account
         operationId: deleteUser
         tags:
           - Users
         parameters:
           - name: userId
             in: path
             required: true
             schema:
               type: string
               format: uuid
         responses:
           '204':
             description: User deleted successfully
           '404':
             $ref: '#/components/responses/NotFound'
           '500':
             $ref: '#/components/responses/InternalError'
   ```

3. **Define schemas and components** if needed:
   ```yaml
   components:
     schemas:
       User:
         type: object
         required:
           - id
           - email
           - createdAt
         properties:
           id:
             type: string
             format: uuid
           email:
             type: string
             format: email
           name:
             type: string
           createdAt:
             type: string
             format: date-time
       
       CreateUserRequest:
         type: object
         required:
           - email
         properties:
           email:
             type: string
             format: email
             example: "user@example.com"
           name:
             type: string
             minLength: 2
             maxLength: 100
             example: "John Doe"
       
       UpdateUserRequest:
         type: object
         properties:
           email:
             type: string
             format: email
           name:
             type: string
             minLength: 2
             maxLength: 100
       
       UserResponse:
         allOf:
           - $ref: '#/components/schemas/User'
           - type: object
             properties:
               updatedAt:
                 type: string
                 format: date-time
     
     responses:
       BadRequest:
         description: Bad request
         content:
           application/json:
             schema:
               type: object
               properties:
                 error:
                   type: string
                 details:
                   type: array
                   items:
                     type: string
       
       NotFound:
         description: Resource not found
         content:
           application/json:
             schema:
               type: object
               properties:
                 error:
                   type: string
                   example: "User not found"
       
       InternalError:
         description: Internal server error
         content:
           application/json:
             schema:
               type: object
               properties:
                 error:
                   type: string
   ```

### 2. Write Tests First (TDD Approach)

Write comprehensive tests before implementing the actual endpoint logic.

#### Steps:
1. **Create test file** in the appropriate location:
   ```
   apps/api/src/__tests__/routes/v1/users.test.ts
   ```

2. **Write integration tests** using the generated types:
   ```typescript
   import supertest from 'supertest';
   import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
   import { createServer } from '../../../server';
   import type { paths } from '@repo/api-spec/types';
   
   type GetUsersResponse = paths['/users']['get']['responses']['200']['content']['application/json'];
   type CreateUserRequest = paths['/users']['post']['requestBody']['content']['application/json'];
   type CreateUserResponse = paths['/users']['post']['responses']['201']['content']['application/json'];
   type UpdateUserRequest = paths['/users/{userId}']['put']['requestBody']['content']['application/json'];
   type UpdateUserResponse = paths['/users/{userId}']['put']['responses']['200']['content']['application/json'];
   type GetUserResponse = paths['/users/{userId}']['get']['responses']['200']['content']['application/json'];
   
   describe('Users API', () => {
     let app: Express;
     let testUserId: string;
   
     beforeEach(() => {
       app = createServer();
     });
   
     describe('GET /api/v1/users', () => {
       it('should return users with default pagination', async () => {
         const response = await supertest(app)
           .get('/api/v1/users')
           .expect(200);
   
         const data: GetUsersResponse = response.body;
         expect(data).toHaveProperty('data');
         expect(data).toHaveProperty('pagination');
         expect(Array.isArray(data.data)).toBe(true);
       });
   
       it('should respect pagination parameters', async () => {
         await supertest(app)
           .get('/api/v1/users?page=2&limit=5')
           .expect(200);
       });
   
       it('should return 400 for invalid parameters', async () => {
         await supertest(app)
           .get('/api/v1/users?page=0')
           .expect(400);
       });
     });

     describe('POST /api/v1/users', () => {
       it('should create a new user successfully', async () => {
         const userData: CreateUserRequest = {
           email: 'test@example.com',
           name: 'Test User'
         };

         const response = await supertest(app)
           .post('/api/v1/users')
           .send(userData)
           .expect(201);

         const createdUser: CreateUserResponse = response.body;
         expect(createdUser).toHaveProperty('id');
         expect(createdUser.email).toBe(userData.email);
         expect(createdUser.name).toBe(userData.name);
         expect(createdUser).toHaveProperty('createdAt');
         
         // Store for cleanup/further tests
         testUserId = createdUser.id;
       });

       it('should return 400 for invalid email', async () => {
         const invalidUserData = {
           email: 'invalid-email',
           name: 'Test User'
         };

         const response = await supertest(app)
           .post('/api/v1/users')
           .send(invalidUserData)
           .expect(400);

         expect(response.body).toHaveProperty('error');
         expect(response.body).toHaveProperty('details');
       });

       it('should return 400 for missing required fields', async () => {
         const incompleteData = {
           name: 'Test User'
           // Missing email
         };

         await supertest(app)
           .post('/api/v1/users')
           .send(incompleteData)
           .expect(400);
       });

       it('should return 409 for duplicate email', async () => {
         const userData: CreateUserRequest = {
           email: 'duplicate@example.com',
           name: 'First User'
         };

         // Create first user
         await supertest(app)
           .post('/api/v1/users')
           .send(userData)
           .expect(201);

         // Try to create duplicate
         await supertest(app)
           .post('/api/v1/users')
           .send({
             email: userData.email,
             name: 'Second User'
           })
           .expect(409);
       });
     });

     describe('GET /api/v1/users/:userId', () => {
       beforeEach(async () => {
         // Create a test user
         const userData: CreateUserRequest = {
           email: 'gettest@example.com',
           name: 'Get Test User'
         };

         const response = await supertest(app)
           .post('/api/v1/users')
           .send(userData)
           .expect(201);

         testUserId = response.body.id;
       });

       it('should return user by ID', async () => {
         const response = await supertest(app)
           .get(`/api/v1/users/${testUserId}`)
           .expect(200);

         const user: GetUserResponse = response.body;
         expect(user.id).toBe(testUserId);
         expect(user).toHaveProperty('email');
         expect(user).toHaveProperty('createdAt');
       });

       it('should return 404 for non-existent user', async () => {
         const fakeId = '123e4567-e89b-12d3-a456-426614174000';
         
         await supertest(app)
           .get(`/api/v1/users/${fakeId}`)
           .expect(404);
       });

       it('should return 400 for invalid UUID format', async () => {
         await supertest(app)
           .get('/api/v1/users/invalid-id')
           .expect(400);
       });
     });

     describe('PUT /api/v1/users/:userId', () => {
       beforeEach(async () => {
         // Create a test user
         const userData: CreateUserRequest = {
           email: 'updatetest@example.com',
           name: 'Update Test User'
         };

         const response = await supertest(app)
           .post('/api/v1/users')
           .send(userData)
           .expect(201);

         testUserId = response.body.id;
       });

       it('should update user successfully', async () => {
         const updateData: UpdateUserRequest = {
           email: 'updated@example.com',
           name: 'Updated Name'
         };

         const response = await supertest(app)
           .put(`/api/v1/users/${testUserId}`)
           .send(updateData)
           .expect(200);

         const updatedUser: UpdateUserResponse = response.body;
         expect(updatedUser.id).toBe(testUserId);
         expect(updatedUser.email).toBe(updateData.email);
         expect(updatedUser.name).toBe(updateData.name);
         expect(updatedUser).toHaveProperty('updatedAt');
       });

       it('should update only provided fields', async () => {
         const partialUpdate: UpdateUserRequest = {
           name: 'Only Name Updated'
         };

         const response = await supertest(app)
           .put(`/api/v1/users/${testUserId}`)
           .send(partialUpdate)
           .expect(200);

         const updatedUser: UpdateUserResponse = response.body;
         expect(updatedUser.name).toBe(partialUpdate.name);
         expect(updatedUser.email).toBe('updatetest@example.com'); // Original email
       });

       it('should return 404 for non-existent user', async () => {
         const fakeId = '123e4567-e89b-12d3-a456-426614174000';
         const updateData: UpdateUserRequest = {
           name: 'New Name'
         };

         await supertest(app)
           .put(`/api/v1/users/${fakeId}`)
           .send(updateData)
           .expect(404);
       });

       it('should return 409 for duplicate email', async () => {
         // Create another user
         const anotherUser: CreateUserRequest = {
           email: 'another@example.com',
           name: 'Another User'
         };

         await supertest(app)
           .post('/api/v1/users')
           .send(anotherUser)
           .expect(201);

         // Try to update our test user with the existing email
         const updateData: UpdateUserRequest = {
           email: 'another@example.com'
         };

         await supertest(app)
           .put(`/api/v1/users/${testUserId}`)
           .send(updateData)
           .expect(409);
       });

       it('should return 400 for invalid data', async () => {
         const invalidUpdate = {
           email: 'invalid-email-format',
           name: 'A' // Too short based on schema
         };

         await supertest(app)
           .put(`/api/v1/users/${testUserId}`)
           .send(invalidUpdate)
           .expect(400);
       });
     });

     describe('DELETE /api/v1/users/:userId', () => {
       beforeEach(async () => {
         // Create a test user
         const userData: CreateUserRequest = {
           email: 'deletetest@example.com',
           name: 'Delete Test User'
         };

         const response = await supertest(app)
           .post('/api/v1/users')
           .send(userData)
           .expect(201);

         testUserId = response.body.id;
       });

       it('should delete user successfully', async () => {
         await supertest(app)
           .delete(`/api/v1/users/${testUserId}`)
           .expect(204);

         // Verify user is deleted
         await supertest(app)
           .get(`/api/v1/users/${testUserId}`)
           .expect(404);
       });

       it('should return 404 for non-existent user', async () => {
         const fakeId = '123e4567-e89b-12d3-a456-426614174000';
         
         await supertest(app)
           .delete(`/api/v1/users/${fakeId}`)
           .expect(404);
       });
     });
   });
   ```

3. **Run tests** to confirm they fail (Red phase of TDD):
   ```bash
   cd apps/api
   pnpm test -- users.test.ts
   ```

### 3. Implement Route Handler

Create the route handler and controller logic to make tests pass.

#### Steps:
1. **Create controller file**:
   ```
   apps/api/src/controllers/userController.ts
   ```

2. **Implement controller logic** using generated types:
   ```typescript
   import { Request, Response, NextFunction } from 'express';
   import type { paths } from '@repo/api-spec/types';
   import { 
     getUsersQuerySchema, 
     createUserRequestSchema, 
     updateUserRequestSchema 
   } from '@repo/api-spec/zod';
   import { userService } from '../services/userService';
   import { logger } from '@repo/logger';
   
   type GetUsersQuery = paths['/users']['get']['parameters']['query'];
   type GetUsersResponse = paths['/users']['get']['responses']['200']['content']['application/json'];
   type CreateUserRequest = paths['/users']['post']['requestBody']['content']['application/json'];
   type CreateUserResponse = paths['/users']['post']['responses']['201']['content']['application/json'];
   type UpdateUserRequest = paths['/users/{userId}']['put']['requestBody']['content']['application/json'];
   type UpdateUserResponse = paths['/users/{userId}']['put']['responses']['200']['content']['application/json'];
   type GetUserResponse = paths['/users/{userId}']['get']['responses']['200']['content']['application/json'];
   type UserIdParam = paths['/users/{userId}']['get']['parameters']['path'];
   
   // GET /users
   export const getUsers = async (
     req: Request<{}, GetUsersResponse, {}, GetUsersQuery>,
     res: Response<GetUsersResponse>,
     next: NextFunction
   ) => {
     try {
       // Validate query parameters
       const { page = 1, limit = 10 } = getUsersQuerySchema.parse(req.query);
       
       logger.info('Fetching users', { page, limit });
       
       // Business logic here
       const users = await userService.getUsers({ page, limit });
       
       res.json({
         data: users.data,
         pagination: {
           page,
           limit,
           total: users.total,
           totalPages: Math.ceil(users.total / limit)
         }
       });
     } catch (error) {
       logger.error('Error fetching users', { error });
       next(error);
     }
   };

   // POST /users
   export const createUser = async (
     req: Request<{}, CreateUserResponse, CreateUserRequest>,
     res: Response<CreateUserResponse>,
     next: NextFunction
   ) => {
     try {
       // Validate request body (middleware handles this, but explicit for clarity)
       const userData = createUserRequestSchema.parse(req.body);
       
       logger.info('Creating new user', { email: userData.email });
       
       // Check if user already exists
       const existingUser = await userService.getUserByEmail(userData.email);
       if (existingUser) {
         return res.status(409).json({
           error: 'User with this email already exists'
         });
       }
       
       // Create user
       const newUser = await userService.createUser(userData);
       
       logger.info('User created successfully', { userId: newUser.id });
       
       res.status(201).json(newUser);
     } catch (error) {
       logger.error('Error creating user', { error });
       next(error);
     }
   };

   // GET /users/:userId
   export const getUserById = async (
     req: Request<UserIdParam, GetUserResponse>,
     res: Response<GetUserResponse>,
     next: NextFunction
   ) => {
     try {
       const { userId } = req.params;
       
       logger.info('Fetching user by ID', { userId });
       
       const user = await userService.getUserById(userId);
       
       if (!user) {
         return res.status(404).json({
           error: 'User not found'
         });
       }
       
       res.json(user);
     } catch (error) {
       logger.error('Error fetching user by ID', { error, userId: req.params.userId });
       next(error);
     }
   };

   // PUT /users/:userId
   export const updateUser = async (
     req: Request<UserIdParam, UpdateUserResponse, UpdateUserRequest>,
     res: Response<UpdateUserResponse>,
     next: NextFunction
   ) => {
     try {
       const { userId } = req.params;
       const updateData = updateUserRequestSchema.parse(req.body);
       
       logger.info('Updating user', { userId, updates: Object.keys(updateData) });
       
       // Check if user exists
       const existingUser = await userService.getUserById(userId);
       if (!existingUser) {
         return res.status(404).json({
           error: 'User not found'
         });
       }
       
       // Check for email conflicts (if email is being updated)
       if (updateData.email && updateData.email !== existingUser.email) {
         const emailInUse = await userService.getUserByEmail(updateData.email);
         if (emailInUse && emailInUse.id !== userId) {
           return res.status(409).json({
             error: 'Email already in use by another user'
           });
         }
       }
       
       // Update user
       const updatedUser = await userService.updateUser(userId, updateData);
       
       logger.info('User updated successfully', { userId });
       
       res.json(updatedUser);
     } catch (error) {
       logger.error('Error updating user', { error, userId: req.params.userId });
       next(error);
     }
   };

   // DELETE /users/:userId
   export const deleteUser = async (
     req: Request<UserIdParam>,
     res: Response,
     next: NextFunction
   ) => {
     try {
       const { userId } = req.params;
       
       logger.info('Deleting user', { userId });
       
       // Check if user exists
       const existingUser = await userService.getUserById(userId);
       if (!existingUser) {
         return res.status(404).json({
           error: 'User not found'
         });
       }
       
       // Delete user
       await userService.deleteUser(userId);
       
       logger.info('User deleted successfully', { userId });
       
       res.status(204).send();
     } catch (error) {
       logger.error('Error deleting user', { error, userId: req.params.userId });
       next(error);
     }
   };
   ```

3. **Create route file**:
   ```
   apps/api/src/routes/v1/users.ts
   ```

   ```typescript
   import { Router } from 'express';
   import { 
     getUsers, 
     createUser, 
     getUserById, 
     updateUser, 
     deleteUser 
   } from '../../controllers/userController';
   import { validateRequest } from '../../middleware/validation';
   import { 
     getUsersQuerySchema, 
     createUserRequestSchema, 
     updateUserRequestSchema 
   } from '@repo/api-spec/zod';
   
   const router = Router();
   
   // GET /users - List users with pagination
   router.get(
     '/',
     validateRequest({ query: getUsersQuerySchema }),
     getUsers
   );
   
   // POST /users - Create new user
   router.post(
     '/',
     validateRequest({ body: createUserRequestSchema }),
     createUser
   );
   
   // GET /users/:userId - Get specific user
   router.get(
     '/:userId',
     validateRequest({ 
       params: z.object({ 
         userId: z.string().uuid('Invalid user ID format') 
       }) 
     }),
     getUserById
   );
   
   // PUT /users/:userId - Update user
   router.put(
     '/:userId',
     validateRequest({ 
       params: z.object({ 
         userId: z.string().uuid('Invalid user ID format') 
       }),
       body: updateUserRequestSchema 
     }),
     updateUser
   );
   
   // DELETE /users/:userId - Delete user
   router.delete(
     '/:userId',
     validateRequest({ 
       params: z.object({ 
         userId: z.string().uuid('Invalid user ID format') 
       }) 
     }),
     deleteUser
   );
   
   export default router;
   ```

4. **Mount routes** in the main v1 router:
   ```typescript
   // apps/api/src/routes/v1/index.ts
   import { Router } from 'express';
   import userRoutes from './users';
   
   const router = Router();
   
   // Mount resource routes
   router.use('/users', userRoutes);
   
   // ... existing code
   ```

### 4. Create Services (Business Logic)

Implement the business logic in service layers.

#### Steps:
1. **Create service file**:
   ```
   apps/api/src/services/userService.ts
   ```

2. **Implement service logic**:
   ```typescript
   import { prisma } from '../lib/prisma';
   import type { User } from '@prisma/client';
   import { logger } from '@repo/logger';
   
   interface GetUsersParams {
     page: number;
     limit: number;
   }
   
   interface GetUsersResult {
     data: User[];
     total: number;
   }
   
   interface CreateUserData {
     email: string;
     name?: string;
   }
   
   interface UpdateUserData {
     email?: string;
     name?: string;
   }
   
   export const userService = {
     // Get paginated users
     async getUsers({ page, limit }: GetUsersParams): Promise<GetUsersResult> {
       const skip = (page - 1) * limit;
       
       try {
         const [data, total] = await Promise.all([
           prisma.user.findMany({
             skip,
             take: limit,
             orderBy: { createdAt: 'desc' },
             select: {
               id: true,
               email: true,
               name: true,
               createdAt: true,
               updatedAt: true
             }
           }),
           prisma.user.count()
         ]);
         
         return { data, total };
       } catch (error) {
         logger.error('Database error in getUsers', { error, page, limit });
         throw new Error('Failed to fetch users');
       }
     },

     // Get user by ID
     async getUserById(id: string): Promise<User | null> {
       try {
         return await prisma.user.findUnique({
           where: { id },
           select: {
             id: true,
             email: true,
             name: true,
             createdAt: true,
             updatedAt: true
           }
         });
       } catch (error) {
         logger.error('Database error in getUserById', { error, userId: id });
         throw new Error('Failed to fetch user');
       }
     },

     // Get user by email
     async getUserByEmail(email: string): Promise<User | null> {
       try {
         return await prisma.user.findUnique({
           where: { email },
           select: {
             id: true,
             email: true,
             name: true,
             createdAt: true,
             updatedAt: true
           }
         });
       } catch (error) {
         logger.error('Database error in getUserByEmail', { error, email });
         throw new Error('Failed to fetch user by email');
       }
     },

     // Create new user
     async createUser(userData: CreateUserData): Promise<User> {
       try {
         return await prisma.user.create({
           data: {
             email: userData.email,
             name: userData.name || null,
           },
           select: {
             id: true,
             email: true,
             name: true,
             createdAt: true,
             updatedAt: true
           }
         });
       } catch (error) {
         logger.error('Database error in createUser', { error, userData });
         
         // Handle unique constraint violations
         if (error.code === 'P2002') {
           throw new Error('User with this email already exists');
         }
         
         throw new Error('Failed to create user');
       }
     },

     // Update user
     async updateUser(id: string, updateData: UpdateUserData): Promise<User> {
       try {
         return await prisma.user.update({
           where: { id },
           data: {
             ...updateData,
             updatedAt: new Date()
           },
           select: {
             id: true,
             email: true,
             name: true,
             createdAt: true,
             updatedAt: true
           }
         });
       } catch (error) {
         logger.error('Database error in updateUser', { error, userId: id, updateData });
         
         // Handle unique constraint violations
         if (error.code === 'P2002') {
           throw new Error('Email already in use by another user');
         }
         
         // Handle record not found
         if (error.code === 'P2025') {
           throw new Error('User not found');
         }
         
         throw new Error('Failed to update user');
       }
     },

     // Delete user
     async deleteUser(id: string): Promise<void> {
       try {
         await prisma.user.delete({
           where: { id }
         });
       } catch (error) {
         logger.error('Database error in deleteUser', { error, userId: id });
         
         // Handle record not found
         if (error.code === 'P2025') {
           throw new Error('User not found');
         }
         
         throw new Error('Failed to delete user');
       }
     }
   };
   ```

   **Additional Service Considerations:**
   
   ```typescript
   // Optional: Add transaction support for complex operations
   export const userServiceWithTransactions = {
     ...userService,
     
     // Example: Create user with profile
     async createUserWithProfile(userData: CreateUserData, profileData: any) {
       return await prisma.$transaction(async (tx) => {
         const user = await tx.user.create({
           data: userData
         });
         
         const profile = await tx.profile.create({
           data: {
             ...profileData,
             userId: user.id
           }
         });
         
         return { user, profile };
       });
     }
   };
   ```
### 5. Update Database Schema (if needed)

If your endpoint requires new database tables or fields:

1. **Update Prisma schema**:
   ```
   apps/api/prisma/schema.prisma
   ```

   ```prisma
   // Example User model for the endpoints above
   model User {
     id        String   @id @default(cuid())
     email     String   @unique
     name      String?
     createdAt DateTime @default(now()) @map("created_at")
     updatedAt DateTime @updatedAt @map("updated_at")
     
     // Add relationships as needed
     // posts     Post[]
     // profile   Profile?
     
     @@map("users")
   }
   
   // Example of related model
   // model Profile {
   //   id     String @id @default(cuid())
   //   bio    String?
   //   avatar String?
   //   userId String @unique @map("user_id")
   //   user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
   //   
   //   @@map("profiles")
   // }
   ```

2. **Create and run migration**:
   ```bash
   cd apps/api
   pnpm db:migrate
   ```

### 6. Run Tests and Iterate

#### Steps:
1. **Run specific tests**:
   ```bash
   pnpm test -- users.test.ts
   ```

2. **Run all tests**:
   ```bash
   pnpm test
   ```

3. **Fix any failing tests** and iterate until all pass (Green phase of TDD)

4. **Refactor code** while keeping tests green (Refactor phase of TDD)

### 7. Test the API Documentation

#### Steps:
1. **Start the development server**:
   ```bash
   cd apps/api
   pnpm dev
   ```

2. **Visit Swagger UI**:
   Open http://localhost:5001/api-docs in your browser

3. **Test the endpoint** using the interactive documentation

4. **Verify the generated types** are working correctly

### 8. Final Validation

#### Checklist:
- [ ] OpenAPI spec is valid and complete
- [ ] Generated types are accurate
- [ ] All tests pass
- [ ] Swagger UI displays correctly
- [ ] Endpoint follows REST conventions
- [ ] Error handling is implemented
- [ ] Input validation is in place
- [ ] Database operations are optimized
- [ ] Code follows project conventions

## Best Practices

### API Design
- Use RESTful conventions
- Include proper HTTP status codes
- Implement consistent error responses
- Use meaningful operation IDs
- Add comprehensive descriptions

### Testing
- Test happy path scenarios
- Test edge cases and error conditions
- Use generated types in tests
- Mock external dependencies
- Test validation logic

### Code Organization
- Keep controllers thin (orchestration only)
- Put business logic in services
- Use middleware for cross-cutting concerns
- Follow the established file structure

### Type Safety
- Always use generated types from OpenAPI spec
- Validate input using generated Zod schemas
- Type your Express handlers properly
- Use strict TypeScript configuration

### HTTP Status Codes Guide
- **200 OK**: Successful GET, PUT operations
- **201 Created**: Successful POST operations
- **204 No Content**: Successful DELETE operations
- **400 Bad Request**: Invalid input data, validation errors
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource already exists, constraint violations
- **422 Unprocessable Entity**: Valid syntax but semantic errors
- **500 Internal Server Error**: Unexpected server errors

### Error Handling Best Practices
- Use consistent error response format
- Include helpful error messages
- Log errors with sufficient context
- Don't expose sensitive information
- Handle database constraint violations properly
- Use appropriate HTTP status codes

### Validation Strategy
- Validate at API boundary (middleware)
- Use generated Zod schemas for consistency
- Provide clear validation error messages
- Validate both request and response data
- Handle edge cases (empty strings, null values)

### Security Considerations
- Validate all input data
- Use parameterized queries (Prisma handles this)
- Implement rate limiting
- Sanitize output data
- Follow principle of least privilege
- Use HTTPS in production

## Common Commands

```bash
# Generate API spec types and schemas
cd packages/api-spec && pnpm run generate

# Run API tests
cd apps/api && pnpm test

# Run specific test file
cd apps/api && pnpm test -- users.test.ts

# Start development server
cd apps/api && pnpm dev

# Check types
cd apps/api && pnpm run check-types

# Lint code
cd apps/api && pnpm run lint

# Database operations
cd apps/api && pnpm db:generate  # Generate Prisma client
cd apps/api && pnpm db:push     # Push schema changes
cd apps/api && pnpm db:migrate  # Create and run migration
```

## File Structure for New Endpoints

```
apps/api/src/
├── __tests__/
│   └── routes/
│       └── v1/
│           └── [resource].test.ts
├── controllers/
│   └── [resource]Controller.ts
├── services/
│   └── [resource]Service.ts
├── routes/
│   └── v1/
│       └── [resource].ts
└── middleware/
    └── [custom-middleware].ts

packages/api-spec/
└── specs/
    └── openapi.yaml  # Define all endpoints here
```

This workflow ensures type safety, comprehensive testing, and maintainable code while following API-first development principles.
