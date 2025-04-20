import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { BookMarked, GraduationCap } from 'lucide-react'
import DashboardChart from './DashboardChart'

const chart2Data = [
    { count: 200, fill: "var(--color-safari)" },
]

const chart3Data = [
    { count: 5, fill: "var(--color-safari)" },
]

const TeacherStats = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-evenly">
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

export default TeacherStats