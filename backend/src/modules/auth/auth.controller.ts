import { Request, Response } from "express";
import { createUserToken, generateUserOtp, getUserDetails, loginUser, registerUser, validateOtp } from "./auth.service.js";
import ApiResponse from "../../utils/apiResponse.js";
import { AT_COOKIE_MAX_AGE, RT_COOKIE_MAX_AGE } from "../../config/contants.js";
import ApiError from "../../utils/apiError.js";

export const registerController = async (req: Request, res: Response) => {

    const result = await registerUser(req.body);

    // res.cookie("token", result.token, {
    //     secure: process.env.NODE_ENV == "production",
    //     sameSite: 'lax',
    //     httpOnly: true,
    //     maxAge:COOKIE_MAX_AGE_MS,
    // });

    res.status(201).json(new ApiResponse<{status:boolean}>(201, "OTP generated successfully", { status: true }))
}

export const generateOtpController = async (req: Request, res: Response) => {
    const { email } = req.body;
    const otpType = { redisStored: "redisotp", timedOtp: "topt" }; // for selecting the type of otp state design

    const generationResult = await generateUserOtp(email);
}

export const otpController = async (req: Request, res: Response) => {
    const { otp, email } = req.body;
    const userAgent = req.get('user-agent');
    const otpValidateResult = await validateOtp(otp, email,);

    if (!otpValidateResult || !otpValidateResult.status) {
        throw new ApiError(501, "Internal server error, Failed to verify OTP");
    }

    const userTokenResult = await createUserToken(otpValidateResult.data.user);

    if (!userTokenResult?.status|| userTokenResult?.accessToken == undefined || userTokenResult.refreshToken == undefined) {
        throw new Error("[otpController] undefined access or token");
    }

    const cookieOption = {
        secure: process.env.NODE_ENV == "production",
        httpOnly: true,
        sameSite: 'lax' as const,
    }

    res.cookie("accessToken", userTokenResult?.accessToken, {
        ...cookieOption,
        maxAge: AT_COOKIE_MAX_AGE,
    });

    res.cookie("accessToken", userTokenResult?.refreshToken, {
        ...cookieOption,
        maxAge: RT_COOKIE_MAX_AGE,
        path: '/api/auth/refresh',
    });

    res.status(200).json(new ApiResponse(200, "OTP Matched, account varifyed", { status: true }));
}

export const loginController = async (req: Request, res: Response) => {
    const result = await loginUser(req.body);

    if (!result.login || !result.status) {
        throw new Error("Internal server Error");
    }

    const tokenResult = await createUserToken(result.user);

    if (!tokenResult?.status || tokenResult?.accessToken === undefined || tokenResult?.refreshToken === undefined) {
        throw new Error(`[loginController] undefined access or refresh token, accessToken:${tokenResult?.accessToken}`);
    }

    const cookieOption = {
        secure: process.env.NODE_ENV == "production",
        sameSite: 'lax' as const,
        httpOnly: true,
    }

    res.cookie("accessToken", tokenResult?.accessToken, {
        ...cookieOption,
        maxAge:AT_COOKIE_MAX_AGE,
    });

    res.cookie("refreshToken", tokenResult?.refreshToken, {
        ...cookieOption,
        maxAge: RT_COOKIE_MAX_AGE,
        path: '/api/auth/refresh'
    });

    res.status(200).json(new ApiResponse(200, "Login successful",result.user));
}

export const logOutController = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
        throw new ApiError(401, "Not authenticated. Please login.");
    }

    res.clearCookie('accessToken', { httpOnly: true });
    res.clearCookie('refreshToken', { httpOnly: true });
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

export const refreshUserToken = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
}
