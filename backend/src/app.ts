import express from "express";
import 'dotenv/config.js';
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import appRouter from "./routes/index.js";
import healthRouter from './routes/health.js';
import cookieparser from 'cookie-parser'
import { errorHandler, handleNotFound } from "./middleware/errorHandler.js";

const app = express();

// cors options
const corsOptions = {
    origin: ['http://localhost:5731',],
    credentials: true,
};

// global rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
});

app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

//server health
app.use('/health',healthRouter)
//routes
app.use('/api/v1', appRouter);

// invalid url error
app.use((req, res) => {
    console.log(`[404] from ${req.ip} to url:${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//global error handler
app.use(errorHandler)

export default app
