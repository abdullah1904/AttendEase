import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } from "./config";


if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Please define ACCESS_TOKEN_SECRET environment variable inside .env.<development/production>.local.");
}
if (!ACCESS_TOKEN_EXPIRY) {
    throw new Error("Please define ACCESS_TOKEN_EXPIRY environment variable inside .env.<development/production>.local.");
}

if (!REFRESH_TOKEN_SECRET) {
    throw new Error("Please define REFRESH_TOKEN_SECRET environment variable inside .env.<development/production>.local.");
}
if (!REFRESH_TOKEN_EXPIRY) {
    throw new Error("Please define REFRESH_TOKEN_EXPIRY environment variable inside .env.<development/production>.local.");
}

const generateToken = (data: any, tokenType: 'ACCESS' | 'REFRESH') => {
    if (tokenType == 'ACCESS') {
        return jwt.sign(data, ACCESS_TOKEN_SECRET!, {
            expiresIn: ACCESS_TOKEN_EXPIRY,

        } as jwt.SignOptions);
    }
    if (tokenType == 'REFRESH') {
        return jwt.sign(data, ACCESS_TOKEN_SECRET!, {
           expiresIn: REFRESH_TOKEN_EXPIRY 
        } as jwt.SignOptions);
    }
}

export {
    generateToken
}