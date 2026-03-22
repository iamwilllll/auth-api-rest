import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/index.js';
import { ApiResponse } from '@/helpers/index.js';
import { SessionModel } from '@/models/index.js';

export async function logoutController(req: Request, res: Response, next: NextFunction) {
    try {
        const sessionId = req.sessionId;
        const findSession = await SessionModel.findById(sessionId);
        if (!findSession) throw new AppError('Session not found.', 404, 'SESSION_ERROR');

        findSession.isValid = false;
        findSession.save();

        res.clearCookie('sessionId');
        ApiResponse.success(res, 200, 'Logged out was successful');
    } catch (err) {
        next(err);
    }
}
