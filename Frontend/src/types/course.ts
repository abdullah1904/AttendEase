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
    credits: z.number().min(1).max(6),
    department: z.string().min(1,{ message: "Department is required." }),
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
    students: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, { message: "Must be a valid ObjectId" })),
});

export type CourseFormValues = z.infer<typeof courseSchema>

export const dummyCourses: Course[] = [
    {
        _id: "c1",
        name: "Introduction to Artificial Intelligence",
        code: "CS401",
        credits: 3,
        department: 1,
        session: "2022-2026",
        section: "B",
        instructor: {
            _id: "t1",
            name: "Dr. Sarah Khan",
            email: "sarah.khan@university.edu",
            phone: "+92-300-1234567",
            department: 1
        },
        students: [
            {
                _id: "s1",
                name: "Ahmed Raza",
                email: "ahmed.raza@student.edu",
                phone: "+92-300-1234567",
                department: 1
            },
            {
                _id: "s2",
                name: "Fatima Noor",
                email: "fatima.noor@student.edu",
                phone: "+92-300-1234567",
                department: 1
            }
        ]
    },
    {
        _id: "c2",
        name: "Database Systems",
        code: "CS303",
        credits: 3,
        department: 1,
        session: "2022-2026",
        section: "A",
        instructor: {
            _id: "t2",
            name: "Prof. Imran Latif",
            email: "imran.latif@university.edu",
            phone: "+92-300-7654321",
            department: 1
        },
        students: [
            {
                _id: "s3",
                name: "Ali Usman",
                email: "ali.usman@student.edu",
                department: 1,
                phone: "+92-300-1234567",
            },
            {
                _id: "s4",
                name: "Mehwish Tariq",
                email: "mehwish.tariq@student.edu",
                phone: "+92-300-1234567",
                department: 1
            }
        ]
    },
    {
        _id: "c3",
        name: "Software Engineering",
        code: "CS305",
        credits: 3,
        department: 1,
        session: "2022-2026",
        section: "C",
        instructor: {
            _id: "t3",
            name: "Dr. Ayesha Rehman",
            email: "ayesha.rehman@university.edu",
            phone: "+92-301-1112233",
            department: 1
        },
        students: [
            {
                _id: "s5",
                name: "Usman Javed",
                email: "usman.javed@student.edu",
                phone: "+92-300-1234567",
                department: 1
            },
            {
                _id: "s6",
                name: "Hina Asif",
                email: "hina.asif@student.edu",
                phone: "+92-300-1234567",
                department: 1
            }
        ]
    },
    {
        _id: "c4",
        name: "Operating Systems",
        code: "CS307",
        credits: 4,
        department: 1,
        session: "2022-2026",
        section: "D",
        instructor: {
            _id: "t4",
            name: "Mr. Bilal Ahmed",
            email: "bilal.ahmed@university.edu",
            phone: "+92-302-9876543",
            department: 1
        },
        students: [
            {
                _id: "s7",
                name: "Nida Hussain",
                email: "nida.hussain@student.edu",
                phone: "+92-300-1234567",
                department: 1
            },
            {
                _id: "s8",
                name: "Hassan Rafiq",
                email: "hassan.rafiq@student.edu",
                phone: "+92-300-1234567",
                department: 1
            }
        ]
    }
];
