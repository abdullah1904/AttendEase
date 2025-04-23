import { createTeacher, deleteTeacher, listTeachers, updateTeacher } from "@/services/teacher-api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTeacherCreateMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teachers'],
            });
        }
    });
}

export const useTeacherListQuery = () => {
    return useQuery({
        queryKey: ['teachers'],
        queryFn: listTeachers,
    });
}

export const useTeacherUpdateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teachers'],
            });
        },
    });
}

export const useTeacherDeleteMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTeacher,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['teachers'],
            });
        },
    });
}