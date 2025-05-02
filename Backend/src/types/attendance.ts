import { ObjectId } from "mongoose";
import { AttendanceStatus } from "../utils/constants";

export interface IAttendance {
    course: ObjectId;
    date: Date;
    markedBy: ObjectId;
    students: {
        student: ObjectId;
        status: AttendanceStatus;
    }
}