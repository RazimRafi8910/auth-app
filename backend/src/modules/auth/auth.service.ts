import { LoginUserInput, RegisterUserInput } from './auth.validation.js';
import bcrypt from 'bcrypt';
import ApiError from '../../utils/apiError.js';
import { Types } from 'mongoose';
import { generateToken, generateFamilyId, generateTimeWindowOtp } from './auth.utils.js';
import { sendEmail } from '../../services/email.service.js';
import redisClient from '../../config/redis.js';
import User, { UserType } from '../user/user.model.js';

const jwtKey = process.env.JWT_KEY || "";

export const registerUser = async ({ fullname, email, password }: RegisterUserInput) => {
    const isUserExists = await User.findOne({ email }).lean();
    console.log(isUserExists)
    if (isUserExists) {
        if (isUserExists.verified) {
            console.log(`[register user] user:${email} already exists`);
            throw new ApiError(409, "Email already in use");
        }
        const otp = generateTimeWindowOtp(isUserExists.email); // generate otp
        console.log(`[register user] OTP generated :${otp} for ${email}`);
        return {
            status: true,
            message: "OTP generated successfully",
        }
    }

    const hashPassword = await bcrypt.hash(password, 8);

    let user = await User.create({
        fullname,
        email,
        password: hashPassword,
        role: "user",
    });

    console.log(`[register user] new user created : ${user.email}`);

    const otp = generateTimeWindowOtp(user.email); // generate otp
    console.log(`[register user] OTP generated :${otp} for ${user.email}`);
    return {
        status: true,
        otp
    }
}

export const generateUserOtp = async (email: string) => {
    const user = await User.findOne({ email }).lean();

    if (!user) {
        throw new ApiError(404, "User not found with this email");
    }

    if (user.verified) {
        throw new ApiError(403, "User email is already verified");
    }

    // TODO: change otp generation from time window to random digits
    const otp = generateTimeWindowOtp(user.email);

    //store otp on redis with ttl
    await redisClient.set(`user:${user.email}:otp`,otp);

    return {
        status: true,
        otp,
    }

}

export const validateOtp = async (otp: number, email: string) => {
    const userDetails = await User.findOne({ email }).lean()

    if (!userDetails) {
        console.log(`[register user] user:${email} does not exists`);
        throw new ApiError(404, "Email not found");
    }

    const existingOtp = generateTimeWindowOtp(userDetails.email);

    if (existingOtp !== otp) {
        console.log(`[validate otp] otp does not match, email:${userDetails.email}`);
        throw new ApiError(400, "OTP does not match");
    }

    await User.updateOne({ email }, { verified: true });

    return {
        status: true,
        message: "OTP matched",
        data: {
            user: userDetails,
        }
    }
}

export const createUserToken = async (user: UserType) => {
    if (!user._id) {
        throw new Error("[createUserToken] invalid userId");
        return;
    }

    const familyId = generateFamilyId()
    const accessToken = generateToken(user._id, user.role, "access",familyId);
    const refreshToken = generateToken(user._id, user.role, "refresh", familyId);

    if (!accessToken || !refreshToken) {
        console.log(`[createUserToken] accessToken${accessToken}, refresh: ${refreshToken}`)
        throw new Error("Failed to generate user tokens");
    }

    //save refresh tokon to redisClient
    const rtKey = `token:${familyId}:rt`;
    const userSessionData = { currentToken: refreshToken, createdAt: Date.now(), device: null };
    const result = await redisClient.set(rtKey, JSON.stringify(userSessionData));
    console.log(result)
    await redisClient.expire(rtKey, ((60 * 60 * 24 * 7) + (60 * 5))); //ttl :7d + 5min

    if(result !== "OK") {
        throw new Error("Failed to save refresh token to redis");
    }

    return {
        status:true,
        accessToken,
        refreshToken,
        familyId,
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

    if(userDetails?.verified) {
        console.log(`[login user] user:${userDetails?.email} is not verified`);
        throw new ApiError(401, "User is not verified");
    }

    const userObject = userDetails?.toObject();
    delete userObject?.password;
    delete (userObject as any).__v;

    return {
        status: true,
        login:true,
        user: userObject,
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


// to completed
export const logoutUser = async (userId: string) => {
    await redisClient.del(`token:${userId}`);
    return {
        status: true,
        message: "User logged out successfully",
    }
}


export const refreshToken = async (refreshToken: string, tokenUser: UserType) => {

}
