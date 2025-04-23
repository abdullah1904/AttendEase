import { generateRequest } from "@/lib/api-client";

export const getAdminStats = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/stats/admin",
    });
    return response.data;
}