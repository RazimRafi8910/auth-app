import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
import ApiError from '../utils/apiError.js';
import { UserJwtPaload, UserRole } from '../types/appTypes/app.d.js';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    
    if (!cookies || !cookies.token) {
        throw new ApiError(401, "Not authenticated. Please login.");
    }
    const jwtToken = cookies.token;
    const result = jwt.verify(jwtToken, process.env.JWT_KEY || "") as UserJwtPaload;
    
    req.user = result;

    next();
}


export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        throw new ApiError(401, "Not authenticated. Please login.");
    }

    if (user.role != UserRole.ADMIN) {
        throw new ApiError(403, "Access denied. Admins only.");
    }
    next();
}