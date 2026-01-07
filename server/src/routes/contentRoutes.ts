import { Router } from 'express';
import { getAllPosts, createPost, updatePost, deletePost } from '../controllers/contentController';
import { authenticateToken } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Management of content (Before, Programme, Event, Carousel)
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a list of posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [about, programme, evenement, carousel, partenaire, timeline]
 *         description: Filter by post type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: A list of posts
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [about, programme, evenement, carousel, partenaire, timeline]
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *               author:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: The created post
 */
router.post('/', authenticateToken, upload.single('image'), createPost); // Image key is 'image'

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update an existing post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               status:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: The updated post
 */
router.put('/:id', authenticateToken, upload.single('image'), updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete('/:id', authenticateToken, deletePost);

export default router;
