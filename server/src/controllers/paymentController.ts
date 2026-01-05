import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { paymentService } from '../services/paymentService';

export const initiatePayment = catchAsync(async (req: Request, res: Response) => {
  const { amount, method, currency = 'USD', phone, personalInfo } = req.body;

  if (!amount || !method) {
    return res.status(400).json({ message: 'Amount and method are required' });
  }

  let result;

  if (method === 'stripe') {
    result = await paymentService.createStripeSession(amount, currency, personalInfo);
    return res.status(200).json({ status: 'success', url: result.url });
  } else if (method === 'maishapay') {
    result = await paymentService.processMaishaPay(amount, currency, phone, personalInfo);
    return res.status(200).json({ status: 'success', data: result });
  } else if (['mpesa', 'orange', 'airtel'].includes(method)) {
     // If you want to use a specific MM API or Maisha Pay as aggregator
     result = await paymentService.processMaishaPay(amount, currency, phone, personalInfo);
     return res.status(200).json({ status: 'success', data: result });
  }

  res.status(400).json({ message: 'Unsupported payment method' });
});

export const handleMaishaPayCallback = catchAsync(async (req: Request, res: Response) => {
  // Handle webhook from Maisha Pay
  console.log('Maisha Pay Webhook:', req.body);
  res.status(200).send('OK');
});

export const handleStripeWebhook = catchAsync(async (req: Request, res: Response) => {
  // Handle Stripe Webhook
  console.log('Stripe Webhook received');
  res.status(200).json({ received: true });
});
