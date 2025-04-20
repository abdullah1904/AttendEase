export interface Attendance{
    id: number,
    studentId: number,
    courseId: number,
    date: Date,
    status: "Present" | "Absent",
}