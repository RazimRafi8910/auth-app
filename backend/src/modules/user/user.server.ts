import mongoose from "mongoose";
import ApiError from "../../utils/apiError.js";
import User from "./user.model.js";


export const getUser = async (userId:string) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    const user = await User.findById(userId).lean();

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
}

export const updateUser = async (userId: string, fullname: string) => {
    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    const updateResult = await User.findByIdAndUpdate({ _id: userId }, { fullname });
    
    if (!updateResult) {
        throw new ApiError(404, "User not found");
    }

    return updateResult;
}