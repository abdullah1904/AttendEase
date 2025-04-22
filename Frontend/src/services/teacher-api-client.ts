import { generateRequest } from "@/lib/api-client";
import { ListTeachersResponse, Teacher } from "@/types/teacher";


export const createTeacher = async (teacher: Omit<Teacher, "_id">) => {
    const response = await generateRequest({
        method: "POST",
        url: "/teachers",
        data: teacher,
    });
    return response;
}

export const listTeachers = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/teachers",
    }) as ListTeachersResponse;
    return response.teachers;
}

export const updateTeacher = async ({ teacherId, teacher }: { teacherId: string, teacher: Omit<Teacher, "_id"> }) => {
    const response = await generateRequest({
        method: "PUT",
        url: `/teachers/${teacherId}`,
        data: teacher,
    });
    return response;
}

export const deleteTeacher = async (teacherId: string) => {
    const response = await generateRequest({
        method: "DELETE",
        url: `/teachers/${teacherId}`,
    });
    return response;
}