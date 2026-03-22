import { body } from 'express-validator';
import { handleInputErrors } from '@/middlewares/index.js';

export const refreshEmailVerificationCodeMiddlewares = [
    body('email').trim().notEmpty().withMessage('E-mail is required.').isEmail().withMessage('E-mail is not valid.'),
    handleInputErrors,
];
