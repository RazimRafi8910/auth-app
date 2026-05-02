import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.js";

export const handleNotFound = (req: Request, res: Response,) => {
    console.log(`[invalid url] url: ${req.ip}, from: ${req.ip}`);
    res.status(404).json({ message: "url not found" });
}

export const errorHandler = (err:ApiError,req: Request, res: Response,next:NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = statusCode == 500 ? "Internal server error" : err.message;
    const success = err.success || false;
    
    console.log(`[error handler] ${err.message}`);
    if (process.env.NODE_ENV == "development") {
        console.log(err.stack);
    }

    res.status(statusCode).json({
        success,
        statusCode,
        message,
        errors: err.errors || [],
    });
}