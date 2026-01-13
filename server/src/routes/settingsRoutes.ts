
import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Management of site settings (social media, etc.)
 */

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Retrieve site settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Site settings data
 */
router.get('/', getSettings);

/**
 * @swagger
 * /settings:
 *   put:
 *     summary: Update site settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               facebookUrl:
 *                 type: string
 *               twitterUrl:
 *                 type: string
 *               instagramUrl:
 *                 type: string
 *               linkedinUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated settings
 */
router.put('/', authenticateToken, updateSettings);

export default router;
