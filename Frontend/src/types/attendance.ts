import { z } from "zod";
import { Course } from "./course";
import { User } from "./user";

export interface Attendance{
    _id: number,
    course: Course,
    date: Date,
    markedBy: User,
    students: {
        student: [],
        status: number,
    }[]
}

export const attendanceSchema = z.object({
    course: z.string().min(1, "Course is required"),
    date: z.date().min(new Date("2000-01-01"), "Date is required"),
});

export type AttendanceFormValues = z.infer<typeof attendanceSchema>;