import { generateRequest } from "@/lib/api-client";

export const getAttendance = async (courseId: string) => {
    const response = await generateRequest({
        method: "GET",
        url: `/attendance/${courseId}`,
    });
    return response.attendance;
}