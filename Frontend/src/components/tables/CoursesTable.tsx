"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { CirclePlus, Pencil, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Course, dummyCourses } from '@/types/course';
import { getDepartmentDetails } from '@/utils';
import CourseFormModal from '../modals/CourseFormModal';
import { useSession } from 'next-auth/react';
import { UserTypes } from '@/utils/constants';


const CoursesTable = () => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Course | null>(null);
    return (
        <div className='p-2'>
            <div className='flex justify-between'>
                <h2 className='text-xl'>Students</h2>
                <Button className='cursor-pointer' onClick={() => setShowModal(true)}>
                    <CirclePlus />
                    Create Course
                </Button>
            </div>
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
                    {dummyCourses.map((course) => (
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
                                    />
                                    <Trash
                                        className='size-6 cursor-pointer text-red-500'
                                    // onClick={() => handleDelete(course.id)}
                                    />
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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