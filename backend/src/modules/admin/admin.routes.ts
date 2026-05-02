import { Router } from "express";
import { authenticateUser, authorizeAdmin } from "../../middleware/authenticate.js";
import ApiResponse from "../../utils/apiResponse.js";
import { getAdminUsersController } from "./admin.controller.js";

const router = Router();

router.get('/', authorizeAdmin, (req, res) => {
    res.status(200).json(new ApiResponse(200, "Admin route", {}));
});

router.get('/users', authenticateUser, authorizeAdmin,getAdminUsersController);

export default router;