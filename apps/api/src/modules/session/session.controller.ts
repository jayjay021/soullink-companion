import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { sessionService } from './session.service';
import { schemas } from '@repo/api-spec/zod';

// Type definitions using Zod schema types
type GetSessionsResponse = z.infer<typeof schemas.SessionsResponse>;
type CreateSessionBody = z.infer<typeof schemas.CreateSessionRequest>;
type CreateSessionResponse = z.infer<typeof schemas.Session>;
type GetSessionResponse = z.infer<typeof schemas.Session>;
type GetSessionParams = { sessionId: string };
type PutSessionParams = { sessionId: string };
type UpdateSessionBody = z.infer<typeof schemas.UpdateSessionRequest>;
type UpdateSessionResponse = z.infer<typeof schemas.Session>;
type DeleteSessionParams = { sessionId: string };
type DeleteSessionResponse = void;
type JoinSessionBody = z.infer<typeof schemas.JoinSessionRequest>;
type JoinSessionResponse = z.infer<typeof schemas.Session>;
type JoinSessionParams = { sessionId: string };

// GET /session
export const listSessions = async (
  req: Request<object, GetSessionsResponse, object>,
  res: Response<GetSessionsResponse>,
  next: NextFunction
) => {
  try {
    const sessions = await sessionService.listSessions();
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

// POST /session
export const createSession = async (
  req: Request<object, CreateSessionResponse, CreateSessionBody>,
  res: Response<CreateSessionResponse>,
  next: NextFunction
) => {
  try {
    const createSessionRequest = req.body;

    // Validate the request body against the CreateSessionRequest schema
    schemas.CreateSessionRequest.parse(createSessionRequest);

    const session = await sessionService.createSession({
      name: createSessionRequest.name,
      description: createSessionRequest.description,
    });

    res.status(201).json(session);
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

// GET /session/:sessionId
export const getSession = async (
  req: Request<GetSessionParams, GetSessionResponse>,
  res: Response<GetSessionResponse>,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.sessionId;

    // Validate the sessionId against the GetSessionParams schema
    const sessionIdSchema = z.string().min(1);
    sessionIdSchema.parse(sessionId);

    const session = await sessionService.getSessionById(sessionId);

    if (!session) {
      return (res as Response<unknown>).status(404).json({
        success: false,
        error: {
          message: 'Session not found',
          code: 'NOT_FOUND',
        },
      });
    }

    res.status(200).json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'Invalid session ID',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }
    next(error);
  }
};

// PUT /session/:sessionId
export const updateSession = async (
  req: Request<PutSessionParams, UpdateSessionResponse, UpdateSessionBody>,
  res: Response<UpdateSessionResponse>,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.sessionId;
    const updateSessionRequest = req.body;

    // Validate the sessionId and request body
    const sessionIdSchema = z.string().min(1);
    sessionIdSchema.parse(sessionId);
    schemas.UpdateSessionRequest.parse(updateSessionRequest);

    const session = await sessionService.updateSession(
      sessionId,
      updateSessionRequest
    );

    if (!session) {
      return (res as Response<unknown>).status(404).json({
        success: false,
        error: {
          message: 'Session not found',
          code: 'NOT_FOUND',
        },
      });
    }

    res.status(200).json(session);
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

// DELETE /session/:sessionId
export const deleteSession = async (
  req: Request<DeleteSessionParams>,
  res: Response<DeleteSessionResponse>,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.sessionId;

    // Validate the sessionId against the DeleteSessionParams schema
    const sessionIdSchema = z.string().min(1);
    sessionIdSchema.parse(sessionId);

    const result = await sessionService.deleteSession(sessionId);

    if (!result) {
      return (res as Response<unknown>).status(404).json({
        success: false,
        error: {
          message: 'Session not found',
          code: 'NOT_FOUND',
        },
      });
    }

    res.status(204).send();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'Invalid session ID',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      });
    }
    next(error);
  }
};

// POST /session/:sessionId/join
export const joinSession = async (
  req: Request<JoinSessionParams, JoinSessionResponse, JoinSessionBody>,
  res: Response<JoinSessionResponse>,
  next: NextFunction
) => {
  try {
    const sessionId = req.params.sessionId;

    // First validate the sessionId
    const sessionIdSchema = z.string().min(1);
    sessionIdSchema.parse(sessionId);

    // Check if session exists before validating request body
    const existingSession = await sessionService.getSessionById(sessionId);
    if (!existingSession) {
      return (res as Response<unknown>).status(404).json({
        success: false,
        error: {
          message: 'Session not found',
          code: 'NOT_FOUND',
        },
      });
    }

    // Now validate the request body
    const joinSessionRequest = req.body;
    schemas.JoinSessionRequest.parse(joinSessionRequest);

    // Additional validation for userId
    if (!joinSessionRequest.userId?.trim()) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'User ID cannot be empty',
          code: 'VALIDATION_ERROR',
        },
      });
    }

    const session = await sessionService.joinSession(
      sessionId,
      joinSessionRequest.userId
    );

    if (!session) {
      return (res as Response<unknown>).status(404).json({
        success: false,
        error: {
          message: 'Session not found',
          code: 'NOT_FOUND',
        },
      });
    }

    res.status(200).json(session);
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
    if (
      error instanceof Error &&
      error.message === 'User already in session'
    ) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'User is already in this session',
          code: 'USER_ALREADY_JOINED',
        },
      });
    }
    if (
      error instanceof Error &&
      error.message === 'User does not exist'
    ) {
      return (res as Response<unknown>).status(400).json({
        success: false,
        error: {
          message: 'User does not exist',
          code: 'USER_NOT_FOUND',
        },
      });
    }
    next(error);
  }
};
