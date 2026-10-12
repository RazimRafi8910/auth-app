import crypto from "node:crypto"

const serverHashKey = process.env.SERVER_HASH_KEY || "";

export function generateHash(payload:string) {
    const hash = crypto.createHmac('sha256',serverHashKey).update(payload).digest('hex');
    return hash;
}

export function generateCryptoId(length:number) {
    const id = crypto.randomBytes(length).toString("hex").slice(0, length);
    return id;
}
