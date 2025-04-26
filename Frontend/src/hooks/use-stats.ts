import { getStats } from "@/services/stats-api-client";
import { useQuery } from "@tanstack/react-query";

export const useStatsQuery = () => {
    return useQuery({
        queryKey: ['stats'],
        queryFn: getStats
    });
}