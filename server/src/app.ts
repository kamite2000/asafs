import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { errorHandler } from './middleware/error';
import { AppError } from './utils/AppError';
import authRoutes from './routes/authRoutes';
import contentRoutes from './routes/contentRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import contactRoutes from './routes/contactRoutes';

import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';

const app = express();

// Middleware
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: false, // Allow loading images from uploads
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Uploads static serve
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', contentRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// Base route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to ASAF API" });
});

// 404 handler
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

export default app;
