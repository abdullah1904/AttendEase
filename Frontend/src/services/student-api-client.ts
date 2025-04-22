import { generateRequest } from "@/lib/api-client";
import { ListStudentsResponse, Student } from "@/types/student";


export const createStudent = async (student: Omit<Student, "_id">) => {
    const response = await generateRequest({
        method: "POST",
        url: "/students",
        data: student,
    });
    return response;
}

export const listStudents = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/students",
    }) as ListStudentsResponse;
    return response.students;
}

export const updateStudent = async ({ studentId, student }: { studentId: string, student: Omit<Student, "_id"> }) => {
    const response = await generateRequest({
        method: "PUT",
        url: `/students/${studentId}`,
        data: student,
    });
    return response;
}

export const deleteStudent = async (studentId: string) => {
    const response = await generateRequest({
        method: "DELETE",
        url: `/students/${studentId}`,
    });
    return response;
}