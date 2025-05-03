import { z } from "zod";
import { Course } from "./course";
import { User } from "./user";
import { Student } from "./student";

export interface Attendance{
    _id: number,
    course: Course,
    date: Date,
    markedBy: User,
    students: {
        student: Student,
        status: number,
    }[]
}

export const attendanceSchema = z.object({
    course: z.string().min(1, "Course is required"),
    date: z.date().min(new Date("2000-01-01"), "Date is required"),
    students : z.array(z.string()).min(1, "At least one student is required"),
});

export type AttendanceFormValues = z.infer<typeof attendanceSchema>;