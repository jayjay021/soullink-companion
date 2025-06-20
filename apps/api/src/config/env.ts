import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.string().transform(Number).default('5001'),
  DATABASE_URL: z.string().optional().transform((val) => {
    if (val) return val;
    // Default SQLite database location in development
    const defaultDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    return `file:${defaultDbPath}`;
  }),
  CORS_ORIGIN: z.string().default('*'),
});

export const env = envSchema.parse(process.env);
