import bcrypt from 'bcrypt';
import { env } from '../config/env.js';

export async function hashPassword(myPlaintextPassword: string): Promise<string> {
    const saltRounds = Number(env.SALT);

    if (isNaN(saltRounds)) {
        throw new Error('SALT must be a number');
    }

    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    return hash;
}
