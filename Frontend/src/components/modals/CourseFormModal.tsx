import { Course, CourseFormValues, courseSchema } from '@/types/course'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CirclePlus, Loader2, Pencil } from 'lucide-react'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { departmentOptions } from '@/utils'
import { useTeacherListQuery } from '@/hooks/use-teacher'
import { useStudentsListQuery } from '@/hooks/use-student'
import { Teacher } from '@/types/teacher'
import { Student } from '@/types/student'
import { toast } from 'sonner'
import { useCourseCreateMutation, useCourseUpdateMutation } from '@/hooks/use-course'
import { MultiSelect } from '../multi-select'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Course | null
    setSelected: (selected: Course | null) => void
}

const CourseFormModal = ({ selected, setSelected, setShowModal, showModal }: Props) => {
    const {
        isLoading: isLoadingTeachers,
        isError: isErrorTeachers,
        data: teachersData,
        error: teachersError,
    } = useTeacherListQuery();
    const {
        isLoading: isLoadingStudents,
        isError: isErrorStudents,
        data: studentsData,
        error: studentsError,
    } = useStudentsListQuery();
    const createCourseMutation = useCourseCreateMutation();
    const updateCourseMutation = useCourseUpdateMutation();
    const form = useForm<CourseFormValues>({
        defaultValues: {
            name: selected ? selected.name : "",
            code: selected ? selected.code : "",
            credits: selected ? String(selected.credits) : "",
            department: selected ? String(selected.department) : "",
            session: selected ? selected.session : "",
            section: selected ? selected.section : "",
            instructor: selected ? selected.instructor._id : "",
            students: selected ? selected.students.map((student) => student._id) : [],
        },
        resolver: zodResolver(courseSchema)
    });
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    const onSubmit = (data: CourseFormValues) => {
        const courseData = {
            ...data,
            credits: Number(data.credits),
            department: Number(data.department),
        }
        if (selected) {
            updateCourseMutation.mutate({ courseId: selected._id, course: courseData }, {
                onSuccess: () => {
                    handleClose();
                    toast.success("Course updated successfully!");
                },
                onError: (error) => {
                    toast.error("Error updating course: " + error.message);
                }
            });
        } else {
            createCourseMutation.mutate(courseData, {
                onSuccess: () => {
                    handleClose();
                    toast.success("Course created successfully!");
                },
                onError: (error) => {
                    toast.error("Error creating course: " + error.message);
                }
            });
        }
    }
    if (isErrorTeachers || isErrorStudents) {
        return (
            <div className='flex items-center justify-center w-full h-full'>
                <p className='text-red-500'>Error: {teachersError?.message || studentsError?.message}</p>
            </div>
        )
    }
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <Form {...form}>
                <DialogContent className='overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-700 hide-scrollbar max-h-[90%]'>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{selected ? 'Update' : 'Create'} Course</DialogTitle>
                        </DialogHeader>
                        {isLoadingStudents || isLoadingTeachers ? (
                            <div className="flex items-center justify-center h-40 w-full">
                                <Loader2 className="size-6 animate-spin text-primary" />
                            </div>
                        ) : isErrorTeachers || isErrorStudents ? (
                            <div className="flex flex-col items-center justify-center h-40 w-full text-center text-red-500">
                                <p>Error loading data.</p>
                                <p>{teachersError || studentsError}</p>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4 my-4'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="name">Name</Label>
                                            <FormControl>
                                                <Input id="name" placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="code">Code</Label>
                                            <FormControl>
                                                <Input id="code" type="text" placeholder="Code (i.e. CS305)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="credits"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="credits">Credits</Label>
                                            <FormControl>
                                                <Input id="credits" type="text" placeholder="Credits" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="department"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="department">Department</Label>
                                            <FormControl>
                                                <Select
                                                    value={String(field.value)}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Select Department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {departmentOptions.map((dept) => (
                                                            <SelectItem key={dept.value} value={String(dept.value)}>
                                                                {dept.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='grid grid-cols-2 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name="session"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="session">Session</Label>
                                                <FormControl>
                                                    <Input id="session" type="text" placeholder="Session (i.e. 2022-2026)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="section"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="section">Section</Label>
                                                <FormControl>
                                                    <Input id="section" type="text" placeholder="Section (i.e. A1)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="instructor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="instructor">Instructor</Label>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className='w-full'>
                                                        <SelectValue placeholder="Select Instructor" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {teachersData.map((teacher: Teacher) => (
                                                            <SelectItem key={teacher._id} value={teacher._id}>
                                                                {teacher.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="students"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Label htmlFor="students">Students</Label>
                                            <FormControl>
                                                <MultiSelect
                                                    options={studentsData.map((student: Student) => ({
                                                        label: student.name,
                                                        value: student._id,
                                                    }))}
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    placeholder="Select Students"
                                                    defaultValue={selected ? selected.students.map((student) => student._id) : []}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                        )}
                        <DialogFooter>
                            <Button type="submit" disabled={createCourseMutation.isPending} >
                                {createCourseMutation.isPending ? (
                                    <Loader2 className="size-6 animate-spin" />
                                ) : (
                                    <>
                                        {selected ? (
                                            <Pencil className="mr-2 size-4" />
                                        ) : (
                                            <CirclePlus className="mr-2 h-4 w-4" />
                                        )}
                                        {selected ? 'Update' : 'Create'}
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Form>
        </Dialog>
    )
}

export default CourseFormModal