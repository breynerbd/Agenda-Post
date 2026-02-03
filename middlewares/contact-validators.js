import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const validateCreateContact = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('lastName')
        .trim()
        .notEmpty()
        .withMessage('El apellido es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El apellido debe tener entre 2 y 100 caracteres'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('Debe ingresar un correo válido'),
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('El teléfono es requerido')
        .isLength({ min: 8, max: 20 })
        .withMessage('El teléfono debe tener entre 8 y 20 caracteres'),
    checkValidators,
];

export const validateUpdateContactRequest = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El apellido debe tener entre 2 y 100 caracteres'),
    body('email')
        .optional()
        .trim()
        .isEmail()
        .withMessage('Debe ingresar un correo válido'),
    body('phone')
        .optional()
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage('El teléfono debe tener entre 8 y 20 caracteres'),
    checkValidators,
];

export const validateContactStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

export const validateGetContactById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
