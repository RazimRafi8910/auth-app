
export const JWT_EXPIRY_SECONDS = 60 * 60 * 24 * 7; // 1 week
export const JWT_EXPIRY_RT = "7d"
export const JWT_EXPIRY_AT = "15m"
export const RT_COOKIE_MAX_AGE = (JWT_EXPIRY_SECONDS + 60 * 5) * 1000; //7D + 5min
export const AT_COOKIE_MAX_AGE = 60 * 15;

export const sessionState = ["Logined", "Logout", "BlackList", "Failed"];
