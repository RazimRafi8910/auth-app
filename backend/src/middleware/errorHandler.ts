import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.js";

export const handleNotFound = (req: Request, res: Response,) => {
    console.log(`[invalid url] url: ${req.ip}, from: ${req.ip}`);
    res.status(404).json({ message: "url not found" });
}

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ success: err.success, message: err.message });
        return;
    }
    console.log(`[error handler] ${err.message}`);
    if (process.env.NODE_ENV == "development") {
        console.log(err.stack);
    }

    res.status(500).json({ message: "Internal server error" });
}
