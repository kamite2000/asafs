import { Router } from 'express';
import { initiatePayment, handleMaishaPayCallback, handleStripeWebhook } from '../controllers/paymentController';

const router = Router();

router.post('/initiate', initiatePayment);
router.post('/callback/maishapay', handleMaishaPayCallback);
router.post('/webhook/stripe', handleStripeWebhook);

export default router;
