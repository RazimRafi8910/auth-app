import mongoose from "mongoose";
import ApiError from "../../utils/apiError.js";
import User from "../user/user.model.js";
import { UserRole } from "../../types/appTypes/app.d.js";


export const getAllUsers = async () => {
    const users = await User.find();
    return users.map((user) => {
        const userObject = user.toObject();
        delete userObject.password;
        delete (userObject as any).__v;
        return userObject;
    });
}


export const getUser = async (userId: string) => {
    
    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    const user = await User.findById(userId).lean();

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
}

export const updateUserRole = async (userId: string, role: string) => {
    if (role != UserRole.ADMIN) {
        throw new ApiError(400, "Validation failed", [{ field: "role", message: "Role must be one of: user, admin" }]);
    }

    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    const updateResult = await User.findOneAndUpdate({ _id: userId }, { role: UserRole.ADMIN });

    if (!updateResult) {
        throw new ApiError(404, "User not found");
    }

    return updateResult;
}

export const deleteUser = async (userId: string)=>{
    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID format");
    }

    const deleteResult = await User.deleteOne({ _id: userId });

    if (deleteResult.deletedCount == 0) {
        throw new ApiError(404, "User not found");
    }

    return deleteResult;
}