import ApiResponse from "../../utils/apiResponse.js";
import { Request, Response } from "express";    
import { deleteUser, getAllUsers, getUser, updateUserRole } from "./admin.service.js";
import ApiError from "../../utils/apiError.js";

export const adminUsersController = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.status(200).json(new ApiResponse(200, "Users fetched successfully", { users }));
}

export const adminUserByIdController = async (req: Request, res: Response) => {
    const userId = req.params.id as string;

    if (!userId) {
        throw new ApiError(400, "Invalid User ID Format");
    }

    const user = await getUser(userId);

    res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
}

export const adminUserRoleController = async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    const role = req.body.role;

    if (!userId) {
        throw new ApiError(400, "Invalid User ID Format");
    }

    const result = await updateUserRole(userId, role);
    
    res.status(200).json(new ApiResponse(200, "User role updated successfully", result));
}

export const adminUserdeleteController = async (req: Request, res: Response) => {
    const userId = req.params.id as string;
    if (!userId) {
        throw new ApiError(400, "Invalid User ID Format");
    }

    const result = await deleteUser(userId);

    res.status(200).json(new ApiResponse(200, "User deleted successfully", null));
}