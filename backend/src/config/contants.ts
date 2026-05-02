
export const JWT_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 1 week
export const COOKIE_MAX_AGE_MS = JWT_EXPIRY_SECONDS * 1000;


export const sessionState = ["Logined", "Logout", "BlackList", "Failed"];