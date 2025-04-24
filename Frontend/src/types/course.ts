import { z } from "zod";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Course {
    _id: string,
    name: string,
    code: string,
    credits: number,
    department: number,
    session: string,
    section: string,
    instructor: Teacher,
    students: Student[],
}

export const courseSchema = z.object({
    name: z.string().trim().min(1).max(100), // assuming safeName is similar
    code: z
        .string()
        .min(4)
        .max(10)
        .regex(/^[A-Z]{2,4}[0-9]{2,4}$/, {
            message: "Course code must be like 'CS101' or 'MATH202'.",
        }),
    credits: z
        .string()
        .refine((val) => {
            const num = Number(val);
            return !isNaN(num) && num >= 1 && num <= 6;
        }, {
            message: "Credits must be a number between 1 and 6",
        }),
    department: z.string().min(1, { message: "Department is required." }),
    session: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{4}$/, {
            message: "Session must be in 'YYYY-YYYY' format.",
        }),
    section: z
        .string()
        .trim()
        .toUpperCase()
        .regex(/^[A-Z][0-9]$/, {
            message: "Section must be like 'A1', 'B2', etc.",
        }),
    instructor: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Must be a valid ObjectId" }),
    students: z
        .array(
            z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Must be a valid ObjectId" })
        )
        .max(30, { message: "You can select up to 30 students only." }),

});

export type CourseFormValues = z.infer<typeof courseSchema>