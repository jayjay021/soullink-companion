import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

const userService = new UserService();

function validateUsername(username: unknown): string | null {
  if (typeof username !== 'string') return 'Username must be a string';
  if (username.trim().length < 2) return 'Username must be at least 2 characters';
  if (username.length > 50) return 'Username must be at most 50 characters';
  return null;
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.body;
    const validationError = validateUsername(username);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const result = await userService.createUser({ username });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    
    const result = await userService.getUserById(userId);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const { username } = req.body;
    
    const validationError = validateUsername(username);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }
    const result = await userService.updateUser(userId, { username });
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}; 