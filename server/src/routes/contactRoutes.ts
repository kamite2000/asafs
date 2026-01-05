import { Router } from 'express';
import { submitContactForm, getAllMessages, markRead, deleteMsg } from '../controllers/contactController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/', submitContactForm);

// Protected routes for admin
router.get('/', authenticateToken, getAllMessages);
router.patch('/:id/read', authenticateToken, markRead);
router.delete('/:id', authenticateToken, deleteMsg);

export default router;
