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
            content: `<!DOCTYPE html>
                        <html lang="en">  
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <title>Your Account Details</title>
                            <style>
                                body {
                                    margin: 0;
                                    padding: 0;
                                    background-color: #f4f4f4;
                                    font-family: 'Arial', sans-serif;
                                }
                                table {
                                    border-collapse: collapse;
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                }
                                img {
                                    display: block;
                                    margin: 0 auto;
                                }
                                .container {
                                    background-color: #ffffff;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                                    overflow: hidden;
                                }
                                .header {
                                    background-color: #284b63;
                                    color: #ffffff;
                                    padding: 20px;
                                    text-align: center;
                                }
                                .header h1 {
                                    margin: 0;
                                    font-size: 24px;
                                }
                                .content {
                                    padding: 30px;
                                    text-align: center;
                                }
                                .content h2 {
                                    color: #333333;
                                    font-size: 20px;
                                    margin-bottom: 20px;
                                }
                                .content p {
                                    font-size: 16px;
                                    color: #777777;
                                    margin-bottom: 20px;
                                }
                                .info-box {
                                    display: inline-block;
                                    background-color: #f1f1f1;
                                    border-radius: 8px;
                                    padding: 15px;
                                    margin: 10px 0;
                                    font-size: 18px;
                                    font-weight: bold;
                                    color: #333333;
                                }
                                .footer {
                                    padding: 20px;
                                    text-align: center;
                                    color: #999999;
                                    font-size: 12px;
                                }
                                @media screen and (max-width: 600px) {
                                    .content {
                                        padding: 20px;
                                    }
                                    .info-box {
                                        font-size: 16px;
                                        padding: 10px;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <table class="container">
                                <tr>
                                    <td class="header">
                                        <h1>Welcome to AttendEase!</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="content">
                                        <h2>Hello, ${newTeacher.name}!</h2>
                                        <p>Your account has been successfully created.</p>
                                        <p>Please find your login credentials and user type below:</p>

                                            <div class="info-box">Password: ${teacherPassword}</div>

                                        <p>We recommend changing your password after logging in for the first time.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="footer">
                                        <p>If you have any questions or didn’t request this account, please contact our support team.</p>
                                        <p>&copy; 2025 AttendEase. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </body>
                        </html>`,
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
        const teacher = await User.findOneAndDelete({ _id: id, userType: UserTypes.TEACHER });
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