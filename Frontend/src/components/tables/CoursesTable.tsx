"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { CirclePlus, Loader2, Pencil, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Course } from '@/types/course';
import { getDepartmentDetails } from '@/utils';
import CourseFormModal from '../modals/CourseFormModal';
import { useSession } from 'next-auth/react';
import { UserTypes } from '@/utils/constants';
import { useCourseDeleteMutation, useCoursesListQuery } from '@/hooks/use-course';
import { toast } from 'sonner';


const CoursesTable = () => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Course | null>(null);
    const deleteCourseMutation = useCourseDeleteMutation();

    const {
        data: coursesData,
        isLoading,
        isError,
        error,
    } = useCoursesListQuery();

    const handleDelete = (course: Course) => {
        setSelected(course);
        deleteCourseMutation.mutate(course._id, {
            onSuccess: () => {
                setSelected(null);
                toast.success("Course deleted successfully!");
            },
            onError: (error) => {
                setSelected(null);
                toast.error("Error deleting course: " + error.message);
            }
        });
    }
    const handleEdit = (course: Course) => {
        setSelected(course);
        setShowModal(true);
    }

    if (isError) {
        return (
            <div className='w-full flex justify-center items-center'>
                <p className='text-red-500'>Error: {error.message}</p>
            </div>
        )
    }
    return (
        <div className='p-2'>
            <div className='flex justify-between'>
                <h2 className='text-xl'>Students</h2>
                <Button className='cursor-pointer' onClick={() => setShowModal(true)}>
                    <CirclePlus />
                    Create Course
                </Button>
            </div>
            {isLoading ? (
                <div className='w-full flex justify-center items-center'>
                    <Loader2 className='size-16 animate-spin' />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Session/Section</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Students</TableHead>
                            {session?.user.userType == UserTypes.ADMIN &&
                                <TableHead>Actions</TableHead>
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coursesData.map((course: Course) => (
                            <TableRow key={course._id}>
                                <TableCell className="font-medium">{course.code} {course.name}</TableCell>
                                <TableCell>{course.credits}</TableCell>
                                <TableCell>{getDepartmentDetails(course.department)}</TableCell>
                                <TableCell>{course.session} {course.section}</TableCell>
                                <TableCell>{course.instructor.name}</TableCell>
                                <TableCell>{course.students.length}</TableCell>
                                {session?.user.userType == UserTypes.ADMIN &&
                                    <TableCell className="flex gap-2">
                                        <Pencil
                                            className='size-6 cursor-pointer'
                                            onClick={() => handleEdit(course)}
                                        />
                                        {deleteCourseMutation.isPending && selected?._id === course._id ? (
                                            <Loader2 className='size-6 animate-spin' />
                                        ) : (
                                            <Trash
                                                className='size-6 cursor-pointer text-red-500'
                                                onClick={() => handleDelete(course)}
                                            />
                                        )}
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            {showModal && (
                <CourseFormModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}
        </div>
    )
}

export default CoursesTable