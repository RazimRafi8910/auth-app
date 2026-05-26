import { Router } from "express";
import { authenticateUser, authorizeAdmin } from "../../middleware/authenticate.js";
import { adminUserByIdController, adminUserdeleteController, adminUserRoleController, adminUsersController } from "./admin.controller.js";

const router = Router();


router.get('/users', authenticateUser, authorizeAdmin, adminUsersController);
router.get('/users/:id', authenticateUser, authorizeAdmin, adminUserByIdController);
router.patch('/users/:id/role', authenticateUser, authorizeAdmin, adminUserRoleController);
router.delete('/users/:id', authenticateUser, authorizeAdmin, adminUserdeleteController);

export default router;