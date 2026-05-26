import { LoginUserInput, RegisterUserInput } from './auth.validation.js';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import ApiError from '../../utils/apiError.js';
import bcrypt from 'bcrypt';
import { JWT_EXPIRY_SECONDS } from '../../config/contants.js';
import { Types } from 'mongoose';
import { generateOtp } from './auth.utils.js';
import { sendEmail } from '../../services/email.service.js';

const jwtKey = process.env.JWT_KEY || "";

const generateToken = (userId: Types.ObjectId, role: string) => {
    const tokenPayload = {
        userId: userId.toString(),
        role,
    }
    return jwt.sign(tokenPayload, jwtKey, {
        expiresIn: JWT_EXPIRY_SECONDS,
    });
}

export const registerUser = async ({ fullname, email, password }: RegisterUserInput) => {
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
        if (isUserExists.verifyed) {
            console.log(`[register user] user:${email} already exists`);
            throw new ApiError(409, "Email already in use");
        }
        const otp = generateOtp(isUserExists.email); // generate otp
        console.log(`[register user] OTP generated :${otp} for ${user.email}`);
        return
    }

    const hashPassword = await bcrypt.hash(password, 8);

    let user = await User.create({
        fullname,
        email,
        password: hashPassword,
        role: "user",
    });

    console.log(`[register user] new user created : ${user.email}`);

    const otp = generateOtp(user.email); // generate otp
    console.log(`[register user] OTP generated :${otp} for ${user.email}`);
    return {
        status: true,
        otp
    }
}

export const validateOtp = async (otp: number, email: string) => {
    const userDetails = await User.findOne({ email });

    if (!userDetails) {
        console.log(`[register user] user:${email} does not exists`);
        throw new ApiError(404, "Email not found");
    }

    const existingOtp = generateOtp(userDetails.email);
    
    if (existingOtp !== otp) {
        console.log(`[validate otp] otp does not match, email:${userDetails.email}`);
        throw new ApiError(400, "OTP does not match");
    }

    await User.updateOne({ email }, { verifyed: true });
    const token = generateToken(userDetails._id, userDetails.role);

    return {
        status: true,
        message: "OTP matched",
        data: {
            user: userDetails,
            token
        }
    }
}

export const loginUser = async ({ email, password }: LoginUserInput) => {
    const userDetails = await User.findOne({ email }).select("+password");
    if (!userDetails) {
        console.log(`[login user] user:${email} not found`);
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, userDetails?.password || "");
    if (!isPasswordValid) {
        console.log(`[login user] user:${email} password is invalid`);
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken(userDetails?._id, userDetails?.role);

    const userObject = userDetails?.toObject();
    delete userObject?.password;
    delete (userObject as any).__v;

    return {
        user: userObject,
        token
    }
}

export const getUserDetails = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        console.log(`[get user details] user:${userId} not found`);
        throw new ApiError(404, "User not found");
    }
    const userObject = user?.toObject();
    delete (userObject as any).__v;
    return userObject;
}