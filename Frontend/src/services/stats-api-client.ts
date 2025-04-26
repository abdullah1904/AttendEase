import { generateRequest } from "@/lib/api-client";

export const getStats = async () => {
    const response = await generateRequest({
        method: "GET",
        url: "/stats",
    });
    return response.data;
}