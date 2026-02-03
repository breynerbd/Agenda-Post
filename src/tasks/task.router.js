import { Router } from 'express';
import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} from './task.controller.js';
import {
    validateCreateTask,
    validateUpdateTaskRequest,
    validateGetTaskById,
} from '../../middlewares/task-validators.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', validateGetTaskById, getTaskById);

router.post(
    '/',
    validateCreateTask,
    createTask
);

router.put(
    '/:id',
    validateUpdateTaskRequest,
    updateTask
);

router.delete('/:id', validateGetTaskById, deleteTask);

export default router;
