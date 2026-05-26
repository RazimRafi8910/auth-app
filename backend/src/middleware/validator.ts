import z from 'zod';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError.js';

export const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        console.log(`[middleware validator error] request body is ${req.body}`);
        next(new ApiError(400, "Validation failed", ["invalid request body"]));
    }

    const result = schema.safeParse(req.body);
    if (!result.success && result.error) {
        const errors = result.error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));
        console.log("[middleware validator error]", errors);
        next(new ApiError(400, "Validation failed", errors));
        return;
    }
    req.body = result.data;
    next();
}