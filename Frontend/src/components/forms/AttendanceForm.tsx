"use client"

import { useCoursesListQuery } from "@/hooks/use-course";
import { Course } from "@/types/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calender";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AttendanceFormValues, attendanceSchema } from "@/types/attendance";
import { useState } from "react";
import { Student } from "@/types/student";


const AttendanceForm = () => {
    const [selectedCourseStudents, setSelectedCourseStudents] = useState<Student[] | null>(null);
    const form = useForm<AttendanceFormValues>({
        resolver: zodResolver(attendanceSchema),
    });

    const {
        data: coursesData,
        isLoading,
        isError,
        error,
    } = useCoursesListQuery();
    const handleCourseChange = (courseId: string) => {
        const selectedCourse = coursesData?.find((course: Course) => course._id === courseId);
        if (selectedCourse) {
            setSelectedCourseStudents(selectedCourse.students);
        } else {
            setSelectedCourseStudents(null);
        }
    }

    const onSubmit = (values: AttendanceFormValues) => {
        console.log("Submitted Data:", {
            ...values,
            date: format(values.date, "yyyy-MM-dd")
        });
    };

    if (isError) {
        return (
            <div className="w-full flex justify-center items-center">
                <p className="text-red-500">Error: {error?.message}</p>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Mark Attendance</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Select Course</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        handleCourseChange(value);
                                    }}
                                    defaultValue={field.value}
                                    disabled={isLoading}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full bg-white">
                                            <SelectValue placeholder="Select Course" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="w-full">
                                        {coursesData?.map((course: Course) => (
                                            <SelectItem key={course._id} value={course._id}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Attendance Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? format(field.value, "PPP") : "Pick a date"}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date > new Date("2100-01-01") || date < new Date("2000-01-01")}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="col-span-2">
                        {selectedCourseStudents && selectedCourseStudents.length > 0 && selectedCourseStudents.map((student: Student) => (
                            <div key={student._id} className="flex items-center justify-between p-2 border-b">
                                {student.name}
                            </div>
                        ))}
                    </div>
                </div>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default AttendanceForm;