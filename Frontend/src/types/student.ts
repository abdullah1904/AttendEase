import { z } from "zod";

export interface Student {
    id: string,
    name: string,
    email: string,
    phone: string,
    overallAttendance: number;
}

export const studentSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
});

export type StudentFormValues = z.infer<typeof studentSchema>

export const students: Student[] = [
    { id: "student-1", name: "Student 1", email: "student1@university.edu", phone: "0300100000", overallAttendance: 96 },
    { id: "student-2", name: "Student 2", email: "student2@university.edu", phone: "0300100001", overallAttendance: 91 },
    { id: "student-3", name: "Student 3", email: "student3@university.edu", phone: "0300100002", overallAttendance: 84 },
    { id: "student-4", name: "Student 4", email: "student4@university.edu", phone: "0300100003", overallAttendance: 90 },
    { id: "student-5", name: "Student 5", email: "student5@university.edu", phone: "0300100004", overallAttendance: 99 },
    { id: "student-6", name: "Student 6", email: "student6@university.edu", phone: "0300100005", overallAttendance: 85 },
    { id: "student-7", name: "Student 7", email: "student7@university.edu", phone: "0300100006", overallAttendance: 87 },
    { id: "student-8", name: "Student 8", email: "student8@university.edu", phone: "0300100007", overallAttendance: 88 },
    { id: "student-9", name: "Student 9", email: "student9@university.edu", phone: "0300100008", overallAttendance: 93 },
    { id: "student-10", name: "Student 10", email: "student10@university.edu", phone: "0300100009", overallAttendance: 97 },
    { id: "student-11", name: "Student 11", email: "student11@university.edu", phone: "0300100010", overallAttendance: 83 },
    { id: "student-12", name: "Student 12", email: "student12@university.edu", phone: "0300100011", overallAttendance: 95 },
    { id: "student-13", name: "Student 13", email: "student13@university.edu", phone: "0300100012", overallAttendance: 89 },
    { id: "student-14", name: "Student 14", email: "student14@university.edu", phone: "0300100013", overallAttendance: 90 },
    { id: "student-15", name: "Student 15", email: "student15@university.edu", phone: "0300100014", overallAttendance: 92 },
    { id: "student-16", name: "Student 16", email: "student16@university.edu", phone: "0300100015", overallAttendance: 86 },
    { id: "student-17", name: "Student 17", email: "student17@university.edu", phone: "0300100016", overallAttendance: 98 },
    { id: "student-18", name: "Student 18", email: "student18@university.edu", phone: "0300100017", overallAttendance: 94 },
    { id: "student-19", name: "Student 19", email: "student19@university.edu", phone: "0300100018", overallAttendance: 82 },
    { id: "student-20", name: "Student 20", email: "student20@university.edu", phone: "0300100019", overallAttendance: 100 },
    { id: "student-21", name: "Student 21", email: "student21@university.edu", phone: "0300100020", overallAttendance: 91 },
    { id: "student-22", name: "Student 22", email: "student22@university.edu", phone: "0300100021", overallAttendance: 93 },
    { id: "student-23", name: "Student 23", email: "student23@university.edu", phone: "0300100022", overallAttendance: 84 },
    { id: "student-24", name: "Student 24", email: "student24@university.edu", phone: "0300100023", overallAttendance: 89 },
    { id: "student-25", name: "Student 25", email: "student25@university.edu", phone: "0300100024", overallAttendance: 96 },
    { id: "student-26", name: "Student 26", email: "student26@university.edu", phone: "0300100025", overallAttendance: 88 },
    { id: "student-27", name: "Student 27", email: "student27@university.edu", phone: "0300100026", overallAttendance: 85 },
    { id: "student-28", name: "Student 28", email: "student28@university.edu", phone: "0300100027", overallAttendance: 97 },
    { id: "student-29", name: "Student 29", email: "student29@university.edu", phone: "0300100028", overallAttendance: 80 },
    { id: "student-30", name: "Student 30", email: "student30@university.edu", phone: "0300100029", overallAttendance: 92 },
    { id: "student-31", name: "Student 31", email: "student31@university.edu", phone: "0300100030", overallAttendance: 87 },
    { id: "student-32", name: "Student 32", email: "student32@university.edu", phone: "0300100031", overallAttendance: 90 },
    { id: "student-33", name: "Student 33", email: "student33@university.edu", phone: "0300100032", overallAttendance: 95 },
    { id: "student-34", name: "Student 34", email: "student34@university.edu", phone: "0300100033", overallAttendance: 83 },
    { id: "student-35", name: "Student 35", email: "student35@university.edu", phone: "0300100034", overallAttendance: 94 },
    { id: "student-36", name: "Student 36", email: "student36@university.edu", phone: "0300100035", overallAttendance: 86 },
    { id: "student-37", name: "Student 37", email: "student37@university.edu", phone: "0300100036", overallAttendance: 98 },
    { id: "student-38", name: "Student 38", email: "student38@university.edu", phone: "0300100037", overallAttendance: 100 },
    { id: "student-39", name: "Student 39", email: "student39@university.edu", phone: "0300100038", overallAttendance: 88 },
    { id: "student-40", name: "Student 40", email: "student40@university.edu", phone: "0300100039", overallAttendance: 85 },
    { id: "student-41", name: "Student 41", email: "student41@university.edu", phone: "0300100040", overallAttendance: 91 },
    { id: "student-42", name: "Student 42", email: "student42@university.edu", phone: "0300100041", overallAttendance: 82 },
    { id: "student-43", name: "Student 43", email: "student43@university.edu", phone: "0300100042", overallAttendance: 94 },
    { id: "student-44", name: "Student 44", email: "student44@university.edu", phone: "0300100043", overallAttendance: 99 },
    { id: "student-45", name: "Student 45", email: "student45@university.edu", phone: "0300100044", overallAttendance: 97 },
    { id: "student-46", name: "Student 46", email: "student46@university.edu", phone: "0300100045", overallAttendance: 96 },
    { id: "student-47", name: "Student 47", email: "student47@university.edu", phone: "0300100046", overallAttendance: 92 },
    { id: "student-48", name: "Student 48", email: "student48@university.edu", phone: "0300100047", overallAttendance: 90 },
    { id: "student-49", name: "Student 49", email: "student49@university.edu", phone: "0300100048", overallAttendance: 84 },
    { id: "student-50", name: "Student 50", email: "student50@university.edu", phone: "0300100049", overallAttendance: 86 }
]  