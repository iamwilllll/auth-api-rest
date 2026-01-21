import { Router } from 'express';
import { errorMiddleware } from '../middlewares/errorMiddleware.middleware.js';

import {
    registerController,
    loginController,
    refreshEmailVerificationCodeController,
    emailConfirmController,
    getCurrentUserController,
} from '../controllers/index.js';

import {
    registerMiddlewares,
    loginMiddlewares,
    refreshEmailVerificationCodeMiddlewares,
    emailConfirmMiddlewares,
    authenticate,
    loadUser,
} from '../middlewares/index.js';
import { logoutController } from '../controllers/auth/logout.controller.js';

const authRouter: Router = Router();

authRouter.post('/register', registerMiddlewares, registerController, errorMiddleware);
authRouter.post(
    '/email/refresh',
    refreshEmailVerificationCodeMiddlewares,
    refreshEmailVerificationCodeController,
    errorMiddleware
);
authRouter.post('/email/confirm', emailConfirmMiddlewares, emailConfirmController, errorMiddleware);
authRouter.post('/login', loginMiddlewares, loginController, errorMiddleware);
authRouter.post('/logout', authenticate, logoutController, errorMiddleware);
authRouter.get('/me', authenticate, loadUser, getCurrentUserController, errorMiddleware);
export default authRouter;
