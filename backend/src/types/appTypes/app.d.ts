import type { Types as MongoTypes } from 'mongoose';

export enum UserRole { ADMIN = "admin", USER = "user" }

export interface User {
    fullname: string,
    email: string,
    role: "admin" | "user",
    verified: boolean,
    _id:MongoTypes.ObjectId,
    createdAt: Date,
    updatedAt: Date,
}

export type ServiceResponseType = {
    status: boolean,
    message?: string,
    data?:any
}

export type UserJwtPaload = {
    userId: string,
    role: UserRole
}
