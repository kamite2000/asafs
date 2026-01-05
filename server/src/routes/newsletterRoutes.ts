import { Router } from 'express';
import { subscribeNewsletter, unsubscribeNewsletter, getSubscriptions } from '../controllers/newsletterController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/subscribe', subscribeNewsletter);
router.post('/unsubscribe', unsubscribeNewsletter);

// Protected routes for admin
router.get('/', authenticateToken, getSubscriptions);

export default router;
