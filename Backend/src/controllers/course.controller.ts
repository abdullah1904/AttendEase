import { NextFunction, Request, Response } from "express";
import { createCourseSchema } from "../utils/validators";
import { HttpStatusCode } from "../utils/constants";
import Course from "../models/course.model";

const {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_BAD_REQUEST,
    HTTP_NOT_FOUND,
} = HttpStatusCode;

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = createCourseSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: error.details[0].message });
            return;
        }
        const alreadyCreatedCourse = await Course.findOne({
            department: value.department,
            session: value.session,
            section: value.section,
        });
        if (alreadyCreatedCourse) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Course already exists." });
            return;
        }
        const newCourse = await Course.create({
            name: value.name,
            code: value.code,
            credits: value.credits,
            department: value.department,
            session: value.session,
            section: value.section,
            instructor: value.instructor,
            students: value.students,
        });
        res.status(HTTP_CREATED.code).json({
            message: "Course created successfully.",
            data: newCourse,
        });
    }
    catch (err) {
        next(err);
    }
}

const listCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await Course.find({}).select("-__v").populate("instructor", "-__v").populate("students", "-__v");
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            courses,
        });
    }
    catch (err) {
        next(err);
    }
}

export {
    createCourse,
    listCourses,
}