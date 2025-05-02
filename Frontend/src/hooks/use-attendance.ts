import { getAttendance } from "@/services/attendance-api-client"
import { useQuery } from "@tanstack/react-query"

export const useAttendanceGetQuery = (courseId:string)=>{
    return useQuery({
        queryKey: ['attendance',courseId],
        queryFn: ()=> getAttendance(courseId),
        enabled: !!courseId,
    })
}