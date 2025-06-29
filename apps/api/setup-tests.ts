
import { beforeAll, afterAll } from '@jest/globals';
import path from 'path';
import { execSync } from 'child_process';

// Get the directory of this file, then navigate to the API root
// In Jest, __dirname is available from Node.js CommonJS transformation
const apiRoot = path.resolve(__dirname, './');

// Set test environment and database BEFORE importing prisma
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = `file:${path.join(apiRoot, 'prisma/test.db')}`;

// Now import prisma after setting the environment
import { prisma } from './src/lib/prisma';

beforeAll(async () => {
  // Push the schema to test database (creates tables if they don't exist)
  execSync('npx prisma db push --force-reset', {
    stdio: 'ignore',
    cwd: apiRoot, // Ensure prisma runs from the API directory
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
  });
});

afterAll(async () => {
  // Cleanup and disconnect after all tests
  await prisma.$disconnect();
});
