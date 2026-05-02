export enum UserRole { ADMIN = "admin", USER = "user" }

export interface User {
    fullname: string,
    email: string,
    role: UserRole,
    _id?: string,
    createdAt: Date,
    updatedAt: Date,
}


export type UserJwtPaload = {
    userId: string,
    role: UserRole
}