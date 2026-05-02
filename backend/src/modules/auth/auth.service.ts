import { LoginUserInput, RegisterUserInput } from './auth.validation.js';
import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';
import ApiError from '../../utils/apiError.js';
import bcrypt from 'bcrypt';
import { JWT_EXPIRY_SECONDS } from '../../config/contants.js';
import { Types } from 'mongoose';

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
        console.log(`[register user] user:${email} exists`);
        throw new ApiError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 8);

    let user = await User.create({
        fullname,
        email,
        password: hashPassword,
        role: "user",
    });

    if (!user) {
        console.log(`[register user] failed to create ${email}`);
        throw new ApiError(400, "Failed to create");
    }

    const token = generateToken(user._id, user.role);

    const userObject = user.toObject();
    delete userObject.password;
    delete (userObject as any).__v;

    return {
        user: userObject,
        token
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