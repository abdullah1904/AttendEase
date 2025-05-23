import axios, { isAxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

type GenerateRequestParams<T = unknown> = {
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    url: string;
    data?: T;
    isFormData?: boolean;
};


const generateRequest = async ({ method, url, data, isFormData }: GenerateRequestParams) => {
    const session = await getSession();

    const customHeaders = {
        headers: {
            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
            Authorization: `Bearer ${session?.user.access_token}`,
        },
    };
    try {
        let response;
        switch (method) {
            case "GET":
                response = await axiosInstance.get(url, customHeaders);
                break;
            case "POST":
                response = await axiosInstance.post(url, data, customHeaders);
                break;
            case "PUT":
                response = await axiosInstance.put(url, data, customHeaders);
                break;
            case "DELETE":
                response = await axiosInstance.delete(url, customHeaders);
                break;
            case "PATCH":
                response = await axiosInstance.patch(url, data, customHeaders);
                break;
            default:
                throw new Error("Invalid method");
        }
        return response.data;
    }

    catch (error: unknown) {
        console.log("API Error:", error);

        if (isAxiosError(error) && error.response) {
            const statusCode = error.response.status;
            const errorMessage = error.response.data?.error || error.response.data.message || "An error occurred";
            if (statusCode === 401) {
                signOut();
            }
            return Promise.reject(new Error(errorMessage));
        } else if (isAxiosError(error) && error.request) {
            return Promise.reject(new Error("No response from server"));
        } else if (error instanceof Error) {
            return Promise.reject(new Error(error.message));
        } else {
            return Promise.reject(new Error("Unknown error occurred"));
        }
    }
}

export {generateRequest};