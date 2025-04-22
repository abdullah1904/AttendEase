import { z } from "zod";

export interface Student {
    _id: string,
    name: string,
    email: string,
    phone: string,
    department: number,
}

export const studentSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    department: z.string().min(1, { message: "Department is required" })
});

export type StudentFormValues = z.infer<typeof studentSchema>

export interface ListStudentsResponse {
    students: Student[];
    message: string;
}