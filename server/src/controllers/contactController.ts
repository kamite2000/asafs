import { Request, Response, NextFunction } from 'express';
import { contactMessageService } from '../services/contactMessageService';
import { catchAsync } from '../utils/catchAsync';

export const submitContactForm = catchAsync(async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  const contactMessage = await contactMessageService.saveMessage({ name, email, subject, message });

  res.status(201).json({
    status: 'success',
    data: contactMessage
  });
});

export const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const messages = await contactMessageService.getMessages();
  res.status(200).json({ status: 'success', data: messages });
});

export const markRead = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await contactMessageService.markAsRead(id);
  res.status(200).json({ status: 'success' });
});

export const deleteMsg = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await contactMessageService.deleteMessage(id);
  res.status(204).json({ status: 'success', data: null });
});
