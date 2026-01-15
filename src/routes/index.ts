import { Router } from 'express';
import authRouter from './authRouter';

const appRouter: Router = Router();

appRouter.use('/auth', authRouter);

export default appRouter;
