import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { config } from './config/env.js';
import { logger } from './utils/logger.js';
import { errorMiddleware } from './middleware/error.middleware.js';

import authRoutes from './modules/auth/auth.routes.js';
import projectRoutes from './modules/projects/projects.routes.js';
import productRoutes from './modules/products/products.routes.js';
import installerRoutes from './modules/installers/installers.routes.js';
import quoteRoutes from './modules/quotes/quotes.routes.js';

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Demasiadas peticiones, intenta más tarde' },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(logger);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/products', productRoutes);
app.use('/api/installers', installerRoutes);
app.use('/api/quotes', quoteRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Error handler
app.use(errorMiddleware);

export default app;
