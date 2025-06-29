import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { errorHandler, notFound } from './middleware/errorHandler';
import { env } from './config/env';
// Import OpenAPI spec from the package
import swaggerDocument from '@repo/api-spec';
// Import API routes
import apiRoutes from './routes';

// Load environment variables
dotenv.config();

export const createServer = (): Express => {
  const app = express();


  // Middleware
  app
    .disable('x-powered-by')
    .use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
          },
        },
      })
    )
    .use(morgan('dev'))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(
      cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
      })
    );

  // Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'SoulLink Companion API Documentation',
    })
  );

  // Root redirect to API docs
  app.get('/', (_, res) => {
    res.redirect('/api-docs');
  });

  // API routes
  app.use('/api', apiRoutes);

  // Error handling middleware (must be last)
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
