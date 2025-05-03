"use client"

import { useCoursesListQuery } from "@/hooks/use-course";
import { Course } from "@/types/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";

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
import { MultiSelect } from "../multi-select";
import { Student } from "@/types/student";
import { AttendanceStatus } from "@/utils/constants";
import { useAttendanceCreateMutation } from "@/hooks/use-attendance";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const AttendanceForm = () => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const createAttendanceMutation = useAttendanceCreateMutation();
    const router = useRouter();
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
            setSelectedCourse(selectedCourse);
        } else {
            setSelectedCourse(null);
        }
    }

    const onSubmit = (values: AttendanceFormValues) => {
        const presentStudents = values.students;
        const absentStudents = selectedCourse?.students.filter((student: Student) => !presentStudents.includes(student._id)).map((student) => student._id) || [];
        const data = {
            course: values.course,
            date: format(values.date, "yyyy-MM-dd"),
            students: [
                ...presentStudents.map((student) => ({
                    student: student,
                    status: AttendanceStatus.PRESENT,
                })),
                ...absentStudents.map((student) => ({
                    student: student,
                    status: AttendanceStatus.ABSENT,
                })),
            ],
        }
        createAttendanceMutation.mutate(data, {
            onSuccess: () => {
                router.refresh();
                router.push("/teacher/attendance");
                toast.success("Attendance marked successfully!");
            },
            onError: (error) => {
                toast.error("Error creating attendance: " + error.message);
            },

        })


        console.log("Attendance Data: ", data);
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
                        <FormField
                            control={form.control}
                            name="students"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="students">Students</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={selectedCourse ? selectedCourse.students.map((student: Student) => ({ label: student.name, value: student._id })) : []}
                                            disabled={!selectedCourse}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            placeholder="Select Students"
                                            defaultValue={selectedCourse ? selectedCourse.students.map((student) => student._id) : []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                </div>
                <div className="w-full flex justify-end mt-4">
                    <Button type="submit" disabled={createAttendanceMutation.isPending}>
                        {createAttendanceMutation.isPending ? (
                            <Loader2 className="size-6 animate-spin" />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AttendanceForm;