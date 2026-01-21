import 'express';
import { UserT } from './schemas/user.type.ts';

declare global {
    namespace Express {
        interface Request {
            sessionId?: string;
            userId?: string;
            user?: UserT;
        }
    }
}
