import { NextFunction, Request, Response } from "express";
import { authSchema } from "../utils/validators";
import { HttpStatusCode, UserTypes } from "../utils/constants";
import User from "../models/user.model";
import { compare, genSalt, hash } from "bcrypt";
import { generateToken } from "../utils";

const {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_BAD_REQUEST,
    HTTP_NOT_FOUND,
} = HttpStatusCode;

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { value, error } = authSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: error.details[0].message });
            return;
        }
        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Email already exists" });
            return;
        }
        const newUser = await User.create({
            email: value.email,
            password: await hash(value.password, await genSalt(10)),
            userType: UserTypes.ADMIN,
        });
        res.status(HTTP_CREATED.code).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                userType: newUser.userType,
                access_token: generateToken({ id: newUser._id }, 'ACCESS'),
                refresh_token: generateToken({ id: newUser._id }, 'REFRESH'),
            },
        });
        return;
    }
    catch (err) {
        next(err);
    }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { value, error } = authSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: error.details[0].message });
            return;
        }
        const user = await User.findOne({ email: value.email });
        if (!user) {
            res.status(HTTP_NOT_FOUND.code).json({ error: "User not found" });
            return;
        }
        const isMatch = await compare(value.password, user.password);
        if (!isMatch) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Invalid credentials" });
            return;
        }
        res.status(HTTP_OK.code).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                userType: user.userType,
                access_token: generateToken({ id: user._id }, 'ACCESS'),
                refresh_token: generateToken({ id: user._id }, 'REFRESH'),
            },
        });
    }
    catch (err) {
        next(err);
    }
}

export { signUp, signIn };