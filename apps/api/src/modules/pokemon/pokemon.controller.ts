import { schemas } from '@repo/api-spec/zod';
import { paths } from '@repo/api-spec/types';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pokemonService } from './pokemon.service';

// Types from OpenAPI spec
// GET /pokemon/{sessionId}
type ListPokemonParams =
  paths['/pokemon/{sessionId}']['get']['parameters']['path'];
type ListPokemonQuery =
  paths['/pokemon/{sessionId}']['get']['parameters']['query'];
type ListPokemonResponse =
  paths['/pokemon/{sessionId}']['get']['responses']['200']['content']['application/json'];

// POST /pokemon/{sessionId}
type AddPokemonParams =
  paths['/pokemon/{sessionId}']['post']['parameters']['path'];
type AddPokemonBody =
  paths['/pokemon/{sessionId}']['post']['requestBody']['content']['application/json'];
type AddPokemonResponse =
  paths['/pokemon/{sessionId}']['post']['responses']['201']['content']['application/json'];

// PATCH /pokemon/{sessionId}/{id}
type UpdatePokemonParams =
  paths['/pokemon/{sessionId}/{id}']['patch']['parameters']['path'];
type UpdatePokemonBody =
  paths['/pokemon/{sessionId}/{id}']['patch']['requestBody']['content']['application/json'];
type UpdatePokemonResponse =
  paths['/pokemon/{sessionId}/{id}']['patch']['responses']['200']['content']['application/json'];

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
    res.status(200).json({ pokemon });
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
    schemas.AddPokemonRequest.parse(req.body);
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
    next(error);
  }
};
