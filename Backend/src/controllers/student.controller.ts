import { NextFunction, Request, Response } from "express";
import { createStudentSchema, updateStudentSchema } from "../utils/validators";
import { HttpStatusCode, UserTypes } from "../utils/constants";
import { generate } from "generate-password";
import User from "../models/user.model";
import { genSalt, hash } from "bcrypt";
import { sendMail } from "../utils";
import { isValidObjectId } from "mongoose";

const {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_BAD_REQUEST,
    HTTP_NOT_FOUND,
} = HttpStatusCode;

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { value, error } = createStudentSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: error.details[0].message });
            return;
        }
        const alreadyStudent = await User.findOne({ email: value.email });
        if (alreadyStudent) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Email already exists" });
            return;
        }
        const studentPassword = generate({
            length: 6,
            numbers: true,
            uppercase: true,
            lowercase: true,
        });
        const newStudent = await User.create({
            name: value.name,
            email: value.email,
            password: await hash(studentPassword, await genSalt(10)),
            phone: value.phone,
            userType: UserTypes.STUDENT,
            department: value.department,
        });
        sendMail({
            content: `Your password is ${studentPassword}`,
            subject: "Student Registration",
            to: value.email,
        });
        res.status(HTTP_CREATED.code).json({
            message: "Student created successfully",
            student: newStudent,
        });
        return;
    }
    catch (err) {
        next(err);
    }
}

const listStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await User.find({ userType: UserTypes.STUDENT }).select("-password -__v");
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            students,
        });
    }
    catch (err) {
        next(err);
    }
}

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Invalid student id" });
            return;
        }
        const student = await User.findOne({ _id: id, userType: UserTypes.STUDENT }).select("-password -__v");
        if (!student) {
            res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            student,
        });
    }
    catch (err) {
        next(err);
    }
}

const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { value, error } = updateStudentSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: error.details[0].message });
            return;
        }
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Invalid student id" });
            return;
        }
        const student = await User.findOneAndUpdate({ _id: id, userType: UserTypes.STUDENT }, {
            name: value.name,
            email: value.email,
            phone: value.phone,
            department: value.department,
        }, { new: true }).select("-password -__v");
        if (!student) {
            res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            student,
        });

    }
    catch (err) {
        next(err);
    }
}

const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Invalid student id" });
            return;
        }
        const student = await User.findOneAndDelete({_id: id, userType: UserTypes.STUDENT});
        if (!student) {
            res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_NO_CONTENT.code).send();
    }
    catch (err) {
        next(err);
    }
}

export {
    createStudent,
    listStudents,
    getStudent,
    updateStudent,
    deleteStudent,
}