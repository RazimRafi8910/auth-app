import ApiResponse from "../../utils/apiResponse.js";
import { Request, Response } from "express";    
import { getAllUsers } from "./admin.service.js";

export const getAdminUsersController = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    res.status(200).json(new ApiResponse(200, "Users fetched successfully", users));
}