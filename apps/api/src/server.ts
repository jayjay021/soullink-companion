import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorHandler';
import { env } from './config/env';

// Load environment variables
dotenv.config();

export const createServer = (): Express => {
  const app = express();

  // Middleware
  app
    .disable('x-powered-by')
    .use(helmet())
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(
      cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
      })
    );

  // Health check endpoint
  app.get('/health', (_, res) => {
    return res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Error handling middleware (must be last)
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
