import { UserJwtPaload } from "../appTypes/app.js";

// Make this file a module so augmentation works
export {};

declare global {
  namespace Express {
    interface Request {
      user?: UserJwtPaload;
    }
  }
}