import { Router } from 'express';
import { getProjects, getProject, createProject, deleteProject } from './projects.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getProjects);
router.get('/:id', authMiddleware, getProject);
router.post('/', authMiddleware, createProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
