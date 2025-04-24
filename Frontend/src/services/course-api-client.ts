import { generateRequest } from "@/lib/api-client";
import { Course } from "@/types/course";


export const createCourse = async (course: Omit<Course, "_id" | "instructor" | "students"> & {instructor: string, students: string[]}) => {
    const response = await generateRequest({
        method: "POST",
        url: "/courses",
        data: course,
    });
    return response;
}

export const listCourses = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/courses",
    });
    return response.courses;
}

export const updateCourse = async ({ course,courseId }: { courseId: string, course: Omit<Course, "_id" | "instructor" | "students"> & {instructor: string, students: string[]} }) => {
    const response = await generateRequest({
        method: "PUT",
        url: `/courses/${courseId}`,
        data: course,
    });
    return response;
}

export const deleteCourse = async (courseId: string) => {
    const response = await generateRequest({
        method: "DELETE",
        url: `/courses/${courseId}`,
    });
    return response;
}