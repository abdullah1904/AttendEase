import { ObjectId } from "mongoose";
import { AttendanceStatus } from "../utils/constants";

export interface IAttendance {
    course: ObjectId;
    date: Date;
    students: {
        student: ObjectId;
        status: AttendanceStatus;
    }
}