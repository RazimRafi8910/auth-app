import { Redis } from "ioredis";

const redisClient = new Redis({
    port: parseInt(process.env.REDIS_PORT || "6379"),
    host: process.env.REDIS_HOST || "localhost",
    password: process.env.REDIS_PASSWORD || "",
    db: 0,
    maxRetriesPerRequest: 5,
    retryStrategy: (times) => {
        if (times > 5) {
            return null;
        }
        return Math.min(times * 50, 1000);
    },
});


redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

redisClient.on("connect", () => {
    console.log("Redis connected successfully");
}); 

redisClient.on("reconnecting", () => {
    console.log("Redis reconnecting...");
});

redisClient.on("ready", () => {
    console.log("Redis ready");
});

redisClient.on("end", () => {
    console.log("Redis connection ended");
});

export default redisClient;