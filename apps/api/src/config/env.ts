import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number).default('5001'),
  DATABASE_URL: z.string().optional(),
  CORS_ORIGIN: z.string().default('*'),
});

const parsedEnv = envSchema.parse(process.env);

// Auto-configure DATABASE_URL based on environment if not provided
let databaseUrl = parsedEnv.DATABASE_URL;

if (!databaseUrl) {
  const dbPath = path.resolve(process.cwd(), 'prisma');

  switch (parsedEnv.NODE_ENV) {
    case 'test':
      // Use separate test database
      databaseUrl = `file:${dbPath}/test.db`;
      break;
    case 'development':
    default:
      databaseUrl = `file:${dbPath}/dev.db`;
      break;
  }
}

export const env = {
  ...parsedEnv,
  DATABASE_URL: databaseUrl,
};
