import { generateRequest } from "@/lib/api-client";
import { AttendanceStatus } from "@/utils/constants";

export const createAttendance = async (attendance: { course: string, date: string, students: { student: string, status: AttendanceStatus }[] }) => {
    const response = await generateRequest({
        method: "POST",
        url: "/attendance",
        data: attendance,
    });
    return response;
}

export const getAttendance = async (courseId: string) => {
    const response = await generateRequest({
        method: "GET",
        url: `/attendance/${courseId}`,
    });
    return response.attendance;
}