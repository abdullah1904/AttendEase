import { getAdminStats } from "@/services/stats-api-client";
import { useQuery } from "@tanstack/react-query";

export const useStatsAdminQuery = () => {
    return useQuery({
        queryKey: ['admin-stats'],
        queryFn: getAdminStats
    });
}