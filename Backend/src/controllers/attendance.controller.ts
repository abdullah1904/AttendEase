import { NextFunction, Request, Response } from "express";
import { createAttendanceSchema } from "../utils/validators";
import { HttpStatusCode } from "../utils/constants";
import Attendance from "../models/attendance.model";
import { isValidObjectId } from "mongoose";

const {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_BAD_REQUEST,
    HTTP_NOT_FOUND,
} = HttpStatusCode;

const createAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id;
        const { error, value } = createAttendanceSchema.validate(req.body);
        if (error) {
            res.status(HTTP_BAD_REQUEST.code).json({ error: error.details[0].message });
            return;
        }
        const existingAttendance = await Attendance.findOne({
            course: value.course,
            date: value.date
        });
        if (existingAttendance) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Attendance already exists for this course on this date." });
            return;
        }
        const attendance = await Attendance.create({
            course: value.course,
            date: value.date,
            markedBy: userId,
            students: value.students
        });
        res.status(HTTP_CREATED.code).json({ message: "Attendance created successfully.", attendance });
    }
    catch (err) {
        next(err)
    }
}

const getAttendance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId } = req.params;
        if (!courseId || !isValidObjectId(courseId)) {
            res.status(HTTP_BAD_REQUEST.code).json({ message: "Invalid course id." });
            return;
        }
        const attendance = await Attendance.find({ course: courseId, }).populate("course").populate("students.student").populate("markedBy");
        res.status(HTTP_OK.code).json({ message: HTTP_OK.message, attendance });
        return;
    }
    catch (err) {
        next(err)
    }
}

export {
    createAttendance,
    getAttendance
}