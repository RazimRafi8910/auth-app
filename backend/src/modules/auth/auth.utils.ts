import { generateHash } from "../../utils/crypto.uilts.js";

export function generateOtp(email: string,) {
    const expireWindow = Math.floor(Date.now() / 1000 / 300);
    const hashPayload = `${email}${expireWindow}`;
    const hash = generateHash(hashPayload);
    const otp = parseInt(hash.substring(0, 8), 16) % 10000;
    return otp 
}