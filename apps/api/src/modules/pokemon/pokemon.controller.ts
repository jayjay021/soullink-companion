import { schemas } from '@repo/api-spec/zod';
import { paths } from '@repo/api-spec/types';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pokemonService } from './pokemon.service';
import { ApiError } from '../../middleware/errorHandler';

// Types from OpenAPI spec
// GET /pokemon/{sessionId}
type ListPokemonParams =
  paths['/pokemon/{sessionId}']['get']['parameters']['path'];
type ListPokemonQuery =
  paths['/pokemon/{sessionId}']['get']['parameters']['query'];
type ListPokemonResponse = z.infer<typeof schemas.PokemonListResponse>;

// POST /pokemon/{sessionId}
type AddPokemonParams =
  paths['/pokemon/{sessionId}']['post']['parameters']['path'];
type AddPokemonBody = z.infer<typeof schemas.CreatePokemonRequest>;
type AddPokemonResponse = z.infer<typeof schemas.Pokemon>;

// PATCH /pokemon/{sessionId}/{id}
type UpdatePokemonParams =
  paths['/pokemon/{sessionId}/{id}']['patch']['parameters']['path'];
type UpdatePokemonBody = z.infer<typeof schemas.UpdatePokemonRequest>;
type UpdatePokemonResponse = z.infer<typeof schemas.Pokemon>;

// POST /pokemon/{sessionId}/swap
type SwapPokemonParams =
  paths['/pokemon/{sessionId}/swap']['post']['parameters']['path'];
type SwapPokemonBody = z.infer<typeof schemas.SwapPokemonRequest>;
type SwapPokemonResponse = z.infer<typeof schemas.SwapPokemonResponse>;

// GET /pokemon/{sessionId}
export const listPokemon = async (
  req: Request<
    ListPokemonParams,
    ListPokemonResponse,
    object,
    ListPokemonQuery
  >,
  res: Response<ListPokemonResponse>,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    const { userId, routeName, status } = req.query || {};
    z.string().min(1).parse(sessionId);
    if (userId !== undefined) z.string().min(1).parse(userId);
    if (routeName !== undefined) z.string().min(1).parse(routeName);
    let statusEnum: 'CAUGHT' | 'NOT_CAUGHT' | 'DEAD' | undefined = undefined;
    if (status !== undefined) {
      if (['CAUGHT', 'NOT_CAUGHT', 'DEAD'].includes(status as string)) {
        statusEnum = status as 'CAUGHT' | 'NOT_CAUGHT' | 'DEAD';
      } else {
        return (res as Response<unknown>).status(400).json({
          success: false,
          error: {
            message: 'Invalid status value',
            code: 'VALIDATION_ERROR',
            details: [{ path: ['status'], message: 'Invalid enum value' }],
          },
        });
      }
    }
    const pokemon = await pokemonService.listPokemon(
      sessionId,
      userId as string | undefined,
      routeName as string | undefined,
      statusEnum
    );
    res.status(200).json(pokemon);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'Invalid request data',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }
    if (error instanceof ApiError) {
      return (res as Response<unknown>).status(error.statusCode).json({
        success: false,
        error: {
          message: error.message,
          code: error.statusCode === 404 ? 'NOT_FOUND' : 'VALIDATION_ERROR',
        },
      });
    }
    next(error);
  }
};

// POST /pokemon/{sessionId}
export const addPokemon = async (
  req: Request<AddPokemonParams, AddPokemonResponse, AddPokemonBody>,
  res: Response<AddPokemonResponse>,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    z.string().min(1).parse(sessionId);
    schemas.CreatePokemonRequest.parse(req.body);
    const pokemon = await pokemonService.addPokemon(sessionId, req.body);
    res.status(201).json(pokemon);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'Invalid request data',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }
    if (error instanceof ApiError) {
      return (res as Response<unknown>).status(error.statusCode).json({
        success: false,
        error: {
          message: error.message,
          code: error.statusCode === 404 ? 'NOT_FOUND' : 'VALIDATION_ERROR',
        },
      });
    }
    if (error instanceof Error) {
      // Handle specific business logic errors that might still be plain Error objects
      if (error.message.includes('Session not found')) {
        return (res as Response<unknown>).status(404).json({
          success: false,
          error: {
            message: error.message,
            code: 'NOT_FOUND',
          },
        });
      }
      if (
        error.message.includes('Pokemon can only be added') ||
        error.message.includes('User cannot catch') ||
        error.message.includes('Position is already taken') ||
        error.message.includes(
          'A Pokemon in this evolution line is already caught'
        ) ||
        error.message.includes('evolution line') ||
        error.message.includes('already caught') ||
        error.message.includes('already used') ||
        error.message.includes('Route') ||
        error.message.includes('duplicate') ||
        error.message.includes('validation') ||
        error.message.includes('invalid')
      ) {
        return (res as Response<unknown>).status(400).json({
          success: false,
          error: {
            message: error.message,
            code: 'VALIDATION_ERROR',
          },
        });
      }
    }
    next(error);
  }
};

// PATCH /pokemon/{sessionId}/{id}
export const updatePokemon = async (
  req: Request<UpdatePokemonParams, UpdatePokemonResponse, UpdatePokemonBody>,
  res: Response<UpdatePokemonResponse>,
  next: NextFunction
) => {
  try {
    const { sessionId, id } = req.params;
    z.string().min(1).parse(sessionId);
    z.string().min(1).parse(id);
    schemas.UpdatePokemonRequest.parse(req.body);
    const pokemon = await pokemonService.updatePokemon(sessionId, id, req.body);
    res.status(200).json(pokemon);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'Invalid request data',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }
    if (error instanceof ApiError) {
      return (res as Response<unknown>).status(error.statusCode).json({
        success: false,
        error: {
          message: error.message,
          code: error.statusCode === 404 ? 'NOT_FOUND' : 'VALIDATION_ERROR',
        },
      });
    }
    next(error);
  }
};

// POST /pokemon/{sessionId}/swap
export const swapPokemon = async (
  req: Request<SwapPokemonParams, SwapPokemonResponse, SwapPokemonBody>,
  res: Response<SwapPokemonResponse>,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    z.string().min(1).parse(sessionId);
    schemas.SwapPokemonRequest.parse(req.body);

    const result = await pokemonService.swapPokemon(sessionId, req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'Invalid request data',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }
    if (error instanceof ApiError) {
      return (res as Response<unknown>).status(error.statusCode).json({
        success: false,
        error: {
          message: error.message,
          code:
            error.statusCode === 404
              ? 'NOT_FOUND'
              : error.statusCode === 409
                ? 'CONFLICT'
                : 'VALIDATION_ERROR',
        },
      });
    }
    if (error instanceof Error) {
      // Handle specific business logic errors
      if (error.message.includes('not found')) {
        return (res as Response<unknown>).status(404).json({
          success: false,
          error: {
            message: error.message,
            code: 'NOT_FOUND',
          },
        });
      }
      if (
        error.message.includes('different users') ||
        error.message.includes('same Pokemon') ||
        error.message.includes('Cannot swap')
      ) {
        return (res as Response<unknown>).status(409).json({
          success: false,
          error: {
            message: error.message,
            code: 'CONFLICT',
          },
        });
      }
    }
    next(error);
  }
};

// GET /pokemon/{sessionId}/routes
export const getRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    const { userId } = req.query || {};
    z.string().min(1).parse(sessionId);
    if (userId !== undefined)
      z.string()
        .min(1)
        .parse(userId as string);
    const routes = await pokemonService.getRoutes(
      sessionId,
      userId as string | undefined
    );
    res.status(200).json({ routes });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'Invalid request data',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }
    if (error instanceof ApiError) {
      return (res as Response<unknown>).status(error.statusCode).json({
        success: false,
        error: {
          message: error.message,
          code: error.statusCode === 404 ? 'NOT_FOUND' : 'VALIDATION_ERROR',
        },
      });
    }
    next(error);
  }
};
