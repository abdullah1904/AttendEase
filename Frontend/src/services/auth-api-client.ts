import { generateRequest } from "@/lib/api-client";

export const changePassword = async (data: {oldPassword: string, newPassword: string}) => {
    const response = await generateRequest({
        method: "PATCH",
        url: "/auth/change-password",
        data,
    });
    return response;
}