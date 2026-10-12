import { Router } from 'express';

const router = Router();


router.get('/', (req, res) => {
    console.log(`[health] from:${req.ip} to /health/`);
    const data = {
        status: 'ok',
        upTime: process.uptime(),
        memoryUsage: process.memoryUsage(),
    }

    return res.status(200).json(data);
});

export default router;
