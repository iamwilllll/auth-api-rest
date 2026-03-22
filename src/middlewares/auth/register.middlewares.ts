import { body } from 'express-validator';
import { handleInputErrors } from '@/middlewares/index.js';

export const registerMiddlewares = [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').trim().notEmpty().withMessage('E-mail is required.').toLowerCase().isEmail().withMessage('E-mail is not valid.'),
    body('password').trim().notEmpty().withMessage('Password is required.'),
    body('repeatPassword')
        .trim()
        .notEmpty()
        .withMessage('Repeat password is required.')
        .custom((repeatPassword, { req }) => (repeatPassword !== req.body.password ? false : true))
        .withMessage('Passwords not match')
        .custom((repeatPassword) => (repeatPassword.length < 8 ? false : true))
        .withMessage('Password must be at least 8 characters long.'),
    handleInputErrors,
];
