import { createCourse, deleteCourse, listCourses, updateCourse } from "@/services/course-api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCourseCreateMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['courses'],
            });
        }
    });
}

export const useCoursesListQuery = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: listCourses,
    });
}

export const useCourseUpdateMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['courses'],
            });
        },
    });
}

export const useCourseDeleteMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCourse,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['courses'],
            });
        },
    });
}