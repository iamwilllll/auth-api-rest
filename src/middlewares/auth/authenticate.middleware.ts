import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/appError.error.js';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { SessionModel } from '../../models/session.model.js';

interface SessionPayload extends JwtPayload {
    sessionId: string;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.sessionId;
        if (!token) throw new AppError('No session token', 401, 'AUTH_ERROR');

        const { sessionId } = jwt.verify(token, env.JWT.KEY) as SessionPayload;

        const session = await SessionModel.findById(sessionId);

        if (!session || !session.isValid) throw new AppError('Invalid session', 401, 'SESSION_ERROR');
        if (session.expiresAt < new Date()) throw new AppError('Session expired', 401, 'SESSION_EXPIRED');

        req.sessionId = session.id;
        req.userId = session.userId.toString();

        return next();
    } catch (err) {
        next(err);
    }
}
