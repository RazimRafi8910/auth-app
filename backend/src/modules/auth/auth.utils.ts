import { generateCryptoId, generateHash } from "../../utils/crypto.uilts.js";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateTimeWindowOtp(email: string,) {
    const expireWindow = Math.floor(Date.now() / 1000 / 300); // converts to seconds and drop 5min (300)
    const hashPayload = `${email}${expireWindow}`;
    const hash = generateHash(hashPayload);
    const otp = parseInt(hash.substring(0, 8), 16) % 10000;
    const stringOtp = String(otp).padEnd(4, "0");
    return parseInt(stringOtp);
}

export function generateToken(userId: Types.ObjectId | string, role: string, type: "access" | "refresh"= "access",familyId:string) {
    const expireWindow = type == "access" ? "15m" : "7d";
    const payload = {
        userId: userId,
        role,
        familyId
    }
    if(!JWT_SECRET) return null;
    const token = jwt.sign(payload, JWT_SECRET,{expiresIn: expireWindow});
    return token;
}


export function generateFamilyId() {
    const randId = generateCryptoId(6);
    const familyId = `fam_${randId}`;
    return familyId;
}
