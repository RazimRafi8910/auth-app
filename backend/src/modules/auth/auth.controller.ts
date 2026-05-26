import { Request, Response } from "express";
import { getUserDetails, loginUser, registerUser, validateOtp } from "./auth.service.js";
import ApiResponse from "../../utils/apiResponse.js";
import { COOKIE_MAX_AGE_MS } from "../../config/contants.js";
import ApiError from "../../utils/apiError.js";

export const registerController = async (req: Request, res: Response) => {
    
    const result = await registerUser(req.body);
    
    // res.cookie("token", result.token, {
    //     secure: process.env.NODE_ENV == "production",
    //     sameSite: 'lax',
    //     httpOnly: true,
    //     maxAge:COOKIE_MAX_AGE_MS,
    // });
    
    res.status(201).json(new ApiResponse(201, "OTP generated successfully", { status: true }))
}

export const otpController = async (req: Request, res: Response) => {
    const { otp, email } = req.body;

    const result = await validateOtp(otp, email);

    if (result.status) {
        res.cookie("token", result.data.token, {
            secure: process.env.NODE_ENV == "production",
            sameSite: 'lax',
            httpOnly: true,
            maxAge: COOKIE_MAX_AGE_MS,
        });
        res.status(200).json(new ApiResponse(200, "OTP Matched, account varifyed", { status: true }));
    }
}

export const loginController = async (req: Request, res: Response) => {
    const result = await loginUser(req.body);

    res.cookie("token", result.token, {
        secure: process.env.NODE_ENV == "production",
        sameSite: 'lax',
        httpOnly: true,
        maxAge:COOKIE_MAX_AGE_MS,
    });

    res.status(200).json(new ApiResponse(200, "Login successful",result.user));  
}

export const logOutController = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new ApiError(401, "Not authenticated. Please login.");
    }

    res.clearCookie('token', { httpOnly: true });
    res.status(200).json(new ApiResponse(200, "Logged out successfully",null));
}

export const gerUserController = async (req: Request, res: Response)=> {
    const userId = req.user?.userId;
    
    if (!userId) {
        throw new ApiError(401, "Not authenticated. Please login.");
    }
    const user = await getUserDetails(userId);

    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
}
