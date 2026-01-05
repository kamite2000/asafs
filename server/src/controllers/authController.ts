import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { catchAsync } from '../utils/catchAsync';

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // Basic validation, should be replaced by Zod middleware
    return next(new Error('Please provide email and password')); 
  }

  const { user, token } = await authService.login(email, password);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { user, token } = await authService.register(req.body);

  res.status(201).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
