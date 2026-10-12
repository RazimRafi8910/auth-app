import { Request, Response, NextFunction } from "express";
import redisClient from "../config/redis.js";

export const authRateLimiterWithEmail = async (req : Request & { user: { email: string } }, res:Response, next:NextFunction) => {
    const clientIp = req.ip;
    const clientEmail = req.user.email;
    if (clientEmail) {
        throw new Error("[authRateLimiterWithEmail] client email is missing");
    }

    const key = `${clientIp}${clientEmail}`;

    const currentUser = await redisClient.get(key);

    if (!currentUser) {
        const userData = {
            reqCount: 1,
            failed:0
        }
        await redisClient.set(key, JSON.stringify(userData));
        await redisClient.incr(key);
    }
}


export const authRateLimiter = () => {

}
