import { Router } from "express";
import { authenticateUser } from "../../middleware/authenticate.js";
import { getUserController, updateUserController } from "./user.controller.js";

const router = Router();


router.get('/:id/profile', authenticateUser, getUserController);
router.patch('/:id/profile', authenticateUser, updateUserController);


export default router;