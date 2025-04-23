"use client";
import { Student } from '@/types/student'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CirclePlus, Loader2, Pencil, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import StudentFormModal from '../modals/StudentFormModal';
import { useSession } from 'next-auth/react';
import { UserTypes } from '@/utils/constants';
import { useStudentDeleteMutation, useStudentsListQuery } from '@/hooks/use-student';
import { toast } from 'sonner';
import { getDepartmentDetails } from '@/utils';

const StudentsTable = () => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Student | null>(null);
    const deleteStudentMutation = useStudentDeleteMutation();

    const {
        data: studentsData,
        isLoading,
        isError,
        error,
    } = useStudentsListQuery();

    const handleDelete = (student: Student) => {
        setSelected(student);
        deleteStudentMutation.mutate(student._id, {
            onSuccess: () => {
                setSelected(null);
                toast.success("Student deleted successfully!");
            },
            onError: (error) => {
                setSelected(null);
                toast.error("Error deleting student: " + error.message);
            }
        });
    }
    const handleEdit = (student: Student) => {
        setSelected(student);
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
                    Create Student
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
                            <TableHead>Email</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Phone</TableHead>
                            {session?.user.userType === UserTypes.ADMIN &&
                                <TableHead>Actions</TableHead>
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentsData && studentsData.map((student:Student) => (
                            <TableRow key={student._id}>
                                <TableCell className="font-medium">{student.name}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{getDepartmentDetails(student.department)}</TableCell>
                                <TableCell>{student.phone}</TableCell>
                                {session?.user.userType == UserTypes.ADMIN &&
                                    <TableCell className="flex gap-2">
                                        <Pencil
                                            className='w-6 h-6 cursor-pointer'
                                            onClick={() => handleEdit(student)}
                                        />
                                        {deleteStudentMutation.isPending && selected?._id === student._id ? (
                                            <Loader2 className='size-6 animate-spin' />
                                        ) : (
                                            <Trash
                                                className='size-6 cursor-pointer text-red-500'
                                                onClick={() => handleDelete(student)}
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
                <StudentFormModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}
        </div>
    )
}

export default StudentsTable