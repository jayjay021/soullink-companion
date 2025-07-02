import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ApiError } from './errorHandler';

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Use strict validation for object schemas to disallow additional properties
      const strictSchema = schema instanceof z.ZodObject ? schema.strict() : schema;
      const result = strictSchema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Update request with parsed/transformed data
      req.body = result.body || req.body;
      req.query = result.query || req.query;
      req.params = result.params || req.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        throw new ApiError(
          `Validation failed: ${JSON.stringify(errorMessages)}`,
          400
        );
      }
      next(error);
    }
  };
};
