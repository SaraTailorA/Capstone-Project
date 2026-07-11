import { Router } from 'express';
import { createQuote, getQuotes } from './quotes.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getQuotes);
router.post('/', authMiddleware, createQuote);

export default router;
