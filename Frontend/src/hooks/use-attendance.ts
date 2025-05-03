import { createAttendance, getAttendance } from "@/services/attendance-api-client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useAttendanceCreateMutation = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAttendance,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['attendance'],
            });
        }
    });
}

export const useAttendanceGetQuery = (courseId:string)=>{
    return useQuery({
        queryKey: ['attendance',courseId],
        queryFn: ()=> getAttendance(courseId),
        enabled: !!courseId,
    })
}