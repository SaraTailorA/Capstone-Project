import { Router } from 'express';
import { getProducts, getProduct } from './products.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

export default router;
