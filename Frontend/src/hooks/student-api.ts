import { createStudent, deleteStudent, listStudents, updateStudent } from "@/services/student-api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useStudentCreateMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students'],
            });
        }
    });
}

export const useStudentsListQuery = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: listStudents,
    });
}

export const useStudentUpdateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students'],
            });
        },
    });
}

export const useStudentDeleteMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['students'],
            });
        },
    });
}