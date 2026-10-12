import mongoose, { Schema, InferSchemaType } from "mongoose";
import z from "zod";
import type { User } from "../../types/appTypes/app.js";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (email: string) => z.string().email().safeParse(email).success,
            message: "Invalid email address",
        }
    },
    verified: {
        type: Boolean,
        required: true,
        default:false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true,
        default: "user",
    },
    password: {
        type: String,
        require: true,
        select: false,
    }
}, { timestamps: true,_id:true });


type UserType = InferSchemaType<typeof userSchema> & User;
const User = mongoose.model('users', userSchema);

export type { UserType };
export default User;
