import { Request, Response } from "express";
import ApiError from "../../utils/apiError.js";
import { getUser, updateUser } from "./user.server.js";
import ApiResponse from "../../utils/apiResponse.js";

const getParamsUserId = (req:Request) => {
    const userId = req.params.id as string;

    if (!userId) {
        throw new ApiError(400, "Invalid User ID Format");
    }

    return userId
}


export const getUserController = async (req: Request, res: Response) => {
    const userId = getParamsUserId(req);

    const user = await getUser(userId);

    res.status(200).json(new ApiResponse(200, "User Fetched", user));
}

export const updateUserController = async (req: Request, res: Response) => {
    const userId = getParamsUserId(req);

    const { fullname }:{fullname:string} = req.body

    if (!fullname || fullname.length <= 1) {
        throw new ApiError(400, "Validation failed", [{ field: "name", message: "Name must be between 2 and 50 characters" }]);
    }

    const user = await updateUser(userId, fullname);

    res.status(200).json(new ApiResponse(200, "Profile updated successfully", user));
}