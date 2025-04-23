"use client";
import { BookMarked, GraduationCap, Loader2, Presentation } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"
import DashboardChart from "./DashboardChart"
import { useStatsAdminQuery } from "@/hooks/use-stats"


const AdminStats = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useStatsAdminQuery();
    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center">
                <Loader2 className="size-16 animate-spin" />
            </div>
        );
    }
    if (isError || !data) {
        return (
            <div className='w-full flex justify-center items-center'>
                <p className='text-red-500'>Error: {error?.message}</p>
            </div>
        )
    }
    const chart1Data = [
        { count: data.teachersCount ?? 0, fill: "var(--color-safari)" },
    ]

    const chart2Data = [
        { count: data.studentsCount ?? 0, fill: "var(--color-safari)" },
    ]

    const chart3Data = [
        { count: data.coursesCount ?? 0, fill: "var(--color-safari)" },
    ]
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-evenly">
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Presentation />
                        Teachers
                    </h2>
                </CardHeader>
                <CardContent>
                    <DashboardChart
                        data={chart1Data}
                        label="Teachers"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <GraduationCap />
                        Students
                    </h2>
                </CardHeader>
                <CardContent>
                    <DashboardChart
                        data={chart2Data}
                        label="Students"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <BookMarked />
                        Courses
                    </h2>
                </CardHeader>
                <CardContent>
                    <DashboardChart
                        data={chart3Data}
                        label="Courses"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminStats