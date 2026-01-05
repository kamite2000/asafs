import { Request, Response, NextFunction } from 'express';
import { contentService } from '../services/contentService';
import { catchAsync } from '../utils/catchAsync';

export const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const posts = await contentService.getAllPosts(req.query);
    res.json(posts);
});

export const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const post = await contentService.createPost(req.body, req.file);
    res.status(201).json(post);
});

export const updatePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const post = await contentService.updatePost(req.params.id, req.body, req.file);
    res.json(post);
});

export const deletePost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await contentService.deletePost(req.params.id);
    res.json({ message: 'Post deleted' });
});
