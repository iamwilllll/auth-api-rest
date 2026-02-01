import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../../errors/appError.error.js';
import { UserModel } from '../../models/user.model.js';
import { ApiResponse } from '../../helpers/response.js';
import { env } from '../../config/env.js';

export async function resetPasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, code } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) throw new AppError('Invalid credentials.', 400, 'CREDENTIAL_ERROR');
        if (user.resetPasswordOTPCode !== code) throw new AppError('Invalid or incorrect code.', 400, 'CODE_ERROR');
        if (user.resetPasswordOTPCodeExpirationTime < new Date()) throw new AppError('OTP code has expired.', 400, 'CODE_ERROR');

        const resetToken = jwt.sign(
            {
                sub: user._id.toString(),
                type: 'RESET_PASSWORD',
            },
            env.JWT.KEY,
            { expiresIn: '15m' }
        );

        user.resetPasswordOTPCode = '';
        await user.save();

        res.cookie('resetToken', resetToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        ApiResponse.success(res, 200, 'Code verified successfully.');
    } catch (err) {
        next(err);
    }
}
