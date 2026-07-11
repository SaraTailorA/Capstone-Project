import { Router } from 'express';
import { getInstallers, getInstaller } from './installers.controller.js';

const router = Router();

router.get('/', getInstallers);
router.get('/:id', getInstaller);

export default router;
