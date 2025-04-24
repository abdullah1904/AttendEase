import { NextFunction, Request, Response } from "express";
import { createUpdateCourseSchema } from "../utils/validators";
import { HttpStatusCode } from "../utils/constants";
import Course from "../models/course.model";
import { isValidObjectId } from "mongoose";

const {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_BAD_REQUEST,
    HTTP_NOT_FOUND,
} = HttpStatusCode;

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = createUpdateCourseSchema.validate(req.body);
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
        const courses = await Course.find({}).select("-__v").populate("instructor", "-__v -password").populate("students", "-__v -password");
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            courses,
        });
    }
    catch (err) {
        next(err);
    }
}

const getCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Invalid course id" });
            return;
        }
        const course = await Course.findById(id).populate("instructor", "-__v -password").populate("students", "-__v -password").select("-__v");
        if (!course) {
            res.status(HTTP_NOT_FOUND.code).json({ message: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            course,
        });
    }
    catch (err) {
        next(err);
    }
}

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { error, value } = createUpdateCourseSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: error.details[0].message });
            return;
        }
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Invalid course id" });
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
        const course = await Course.findByIdAndUpdate(id, {
            name: value.name,
            code: value.code,
            credits: value.credits,
            department: value.department,
            session: value.session,
            section: value.section,
            instructor: value.instructor,
            students: value.students,
        }, { new: true }).populate('instructor', '-__v -password').populate('students','-__v -password').select('-__v');
        if (!course) {
            res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_OK.code).json({
            message: HTTP_OK.message,
            course,
        });
    }
    catch (err) {
        next(err);
    }
}

const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: "Invalid course id" });
            return;
        }
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            res.status(HTTP_NOT_FOUND.code).json({ error: HTTP_NOT_FOUND.message });
            return;
        }
        res.status(HTTP_NO_CONTENT.code).send()
    }
    catch (err) {
        next(err);
    }
}

export {
    createCourse,
    listCourses,
    getCourse,
    updateCourse,
    deleteCourse,
}