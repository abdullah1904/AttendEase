import { NextFunction, Request, Response } from "express";
import { createTeacherSchema, updateTeacherSchema } from "../utils/validators";
import { HttpStatusCode, UserTypes } from "../utils/constants";
import { generate } from "generate-password";
import User from "../models/user.model";
import { genSalt, hash } from "bcrypt";
import { sendMail } from "../utils";
import { isValidObjectId } from "mongoose";
import Course from "../models/course.model";

const {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_BAD_REQUEST,
    HTTP_NOT_FOUND,
} = HttpStatusCode;

const createTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { value, error } = createTeacherSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: error.details[0].message });
            return;
        }
        const alreadyTeacher = await User.findOne({ email: value.email });
        if (alreadyTeacher) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Email already exists" });
            return;
        }
        const teacherPassword = generate({
            length: 6,
            numbers: true,
            uppercase: true,
            lowercase: true,
        });
        const newTeacher = await User.create({
            name: value.name,
            email: value.email,
            password: await hash(teacherPassword, await genSalt(10)),
            phone: value.phone,
            userType: UserTypes.TEACHER,
            department: value.department,
        });
        sendMail({
            content: `Your password is ${teacherPassword}`,
            subject: "Teacher Registration",
            to: value.email,
        });
        res.status(HTTP_CREATED.code).json({
            message: "Teacher created successfully",
            teacher: newTeacher,
        });
        return;
    }
    catch (err) {
        next(err);
    }
}

const listTeachers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await User.find({ userType: UserTypes.TEACHER }).select("-password -__v");
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            teachers,
        });
    }
    catch (err) {
        next(err);
    }
}

const getTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Invalid teacher id" });
            return;
        }
        const teacher = await User.findOne({ _id: id, userType: UserTypes.TEACHER }).select("-password -__v");
        if (!teacher) {
            res.status(HTTP_NOT_FOUND.code).json({ message: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            teacher,
        });
    }
    catch (err) {
        next(err);
    }
}

const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { value, error } = updateTeacherSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: error.details[0].message });
            return;
        }
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Invalid teacher id" });
            return;
        }
        const teacher = await User.findOneAndUpdate({ _id: id, userType: UserTypes.TEACHER }, {
            name: value.name,
            email: value.email,
            phone: value.phone,
            department: value.department,
        }, { new: true }).select("-password -__v");
        if (!teacher) {
            res.status(HTTP_NOT_FOUND.code).json({ message: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            teacher,
        });

    }
    catch (err) {
        next(err);
    }
}

const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Invalid teacher id" });
            return;
        }
        const isInstructor = await Course.findOne({ instructor: id });
        if (isInstructor) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Teacher is instructing a course" });
            return;
        }
        const teacher = await User.findOneAndDelete({_id: id, userType: UserTypes.TEACHER});
        if (!teacher) {
            res.status(HTTP_NOT_FOUND.code).json({ message: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_NO_CONTENT.code).send();
    }
    catch (err) {
        next(err);
    }
}

export {
    createTeacher,
    listTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher,
}