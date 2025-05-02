import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { ACCESS_TOKEN_SECRET } from "../utils/config";
import { HttpStatusCode, UserTypes } from "../utils/constants";

const {
    HTTP_UNAUTHORIZED,
    HTTP_FORBIDDEN
} = HttpStatusCode;

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(HTTP_UNAUTHORIZED.code).json({ message: "Authorization token missing or malformed." });
            return
        }
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { id: string };
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(HTTP_UNAUTHORIZED.code).json({ message: "User associated with credentials not found." });
            return
        }
        req.user = { ...user.toObject(), _id: user._id.toString() };
        next();
    }
    catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            res.status(HTTP_UNAUTHORIZED.code).json({ message: "Session expired. Please login again." });
            return;
        }
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(HTTP_UNAUTHORIZED.code).json({ message: "Invalid session. Please login again." });
            return;
        }
        res.status(HTTP_UNAUTHORIZED.code).json({ message: HTTP_UNAUTHORIZED.message, error: err });
        return;
    }
}

const adminAuthorize = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.userType !== UserTypes.ADMIN) {
        res.status(HTTP_FORBIDDEN.code).json({ message: HTTP_FORBIDDEN.message });
        return;
    }
    next();
}

const teacherAuthorize = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.userType !== UserTypes.TEACHER) {
        res.status(HTTP_FORBIDDEN.code).json({ message: HTTP_FORBIDDEN.message });
        return;
    }
    next();
}

export { authenticate, adminAuthorize, teacherAuthorize };