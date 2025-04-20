import { NextFunction, Request, Response } from "express";
import { changePasswordSchema, signInSchema, signUpSchema } from "../utils/validators";
import { HttpStatusCode, UniversityDepartments, UserTypes } from "../utils/constants";
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
        const { value, error } = signUpSchema.validate(req.body);
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
            name: value.name,
            email: value.email,
            password: await hash(value.password, await genSalt(10)),
            phone: value.phone,
            userType: UserTypes.ADMIN,
            department: UniversityDepartments.Admin,
        });
        res.status(HTTP_CREATED.code).json({
            message: "User created successfully",
            user: {
                ...newUser.toObject(),
                access_token: generateToken({ id: newUser._id }, 'ACCESS'),
                refresh_token: generateToken({ id: newUser._id }, 'REFRESH'),
            },
        });
    }
    catch (err) {
        next(err);
    }
}

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { value, error } = signInSchema.validate(req.body);
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
                ...user.toObject(),
                access_token: generateToken({ id: user._id }, 'ACCESS'),
                refresh_token: generateToken({ id: user._id }, 'REFRESH'),
            },
        });
    }
    catch (err) {
        next(err);
    }
}

const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        const { value, error } = changePasswordSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: error.details[0].message });
            return;
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(HTTP_NOT_FOUND.code).json({ error: "User not found" });
            return;
        }
        const isMatch = await compare(value.oldPassword, user.password);
        if (!isMatch) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Invalid credentials" });
            return;
        }
        await User.findByIdAndUpdate(userId, {
            password: await hash(value.newPassword, await genSalt(10)),
        });
        res.status(HTTP_OK.code).json({ message: "Password changed successfully" });
    }
    catch (err) {
        next(err);
    }
}

export { 
    signUp, 
    signIn,
    changePassword
};