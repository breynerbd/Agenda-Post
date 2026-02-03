import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateTask = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título es obligatorio')
        .isLength({ min: 2, max: 150 })
        .withMessage('El título debe tener entre 2 y 150 caracteres'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres'),
    body('status')
        .optional()
        .isIn(['PENDIENTE', 'ENTREGADO'])
        .withMessage('Estado no válido'),
    body('expireDate')
        .notEmpty()
        .withMessage('La fecha de vencimiento es obligatoria')
        .isISO8601()
        .withMessage('La fecha debe tener un formato válido'),
    checkValidators,
];

export const validateUpdateTaskRequest = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 2, max: 150 })
        .withMessage('El título debe tener entre 2 y 150 caracteres'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres'),
    body('status')
        .optional()
        .isIn(['PENDIENTE', 'ENTREGADO'])
        .withMessage('Estado no válido'),
    body('expireDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha debe tener un formato válido'),
    checkValidators,
];

export const validateTaskStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

export const validateGetTaskById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
