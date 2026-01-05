import { Request, Response, NextFunction } from 'express';
import { newsletterService } from '../services/newsletterService';
import { catchAsync } from '../utils/catchAsync';

export const subscribeNewsletter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const subscription = await newsletterService.subscribe(email);
  
  res.status(201).json({
    status: 'success',
    data: subscription
  });
});

export const unsubscribeNewsletter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  await newsletterService.unsubscribe(email);
  res.status(200).json({ status: 'success', message: 'Unsubscribed successfully' });
});

export const getSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const subs = await newsletterService.getSubscriptions();
  res.status(200).json({ status: 'success', data: subs });
});
