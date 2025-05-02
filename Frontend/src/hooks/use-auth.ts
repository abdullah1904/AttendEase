import { changePassword } from "@/services/auth-api-client";
import { useMutation } from "@tanstack/react-query";

export const useChangePasswordMutation = ()=>{
    return useMutation({
        mutationFn: changePassword,
    });
}