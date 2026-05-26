import { Router, Request,Response } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import adminRoutes from '../modules/admin/admin.routes.js';
import userRoutes from '../modules/user/user.routes.js';

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send(200).json({ message: "server is running" });
})
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);

export default router;
