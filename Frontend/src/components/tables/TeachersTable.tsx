"use client"
import { Teacher, } from '@/types/teacher'
import { CirclePlus, Loader2, Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import TeacherFormModal from '../modals/TeacherFormModal';
import { useSession } from 'next-auth/react';
import { UserTypes } from '@/utils/constants';
import { getDepartmentDetails } from '@/utils';
import { useTeacherListQuery, useTeacherDeleteMutation } from '@/hooks/use-teacher';
import { toast } from 'sonner';

const TeachersTable = () => {
    const { data: session } = useSession();
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Teacher | null>(null);
    const deleteTeacherMutation = useTeacherDeleteMutation();

    const {
        data: teachersData,
        isLoading,
        isError,
        error,
    } = useTeacherListQuery();

    const handleDelete = (teacher: Teacher) => {
        setSelected(teacher);
        deleteTeacherMutation.mutate(teacher._id,{
            onSuccess: ()=>{
                setSelected(null);
                toast.success("Teacher deleted successfully!");
            },
            onError: (error) => {
                setSelected(null);
                toast.error("Error deleting teacher: " + error.message);
            }
        });
    }
    const handleEdit = (teacher: Teacher) => {
        setSelected(teacher);
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
                <h2 className='text-xl'>Teachers</h2>
                <Button onClick={() => setShowModal(true)} className='cursor-pointer'>
                    <CirclePlus />
                    Create Teacher
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
                        {teachersData && teachersData.map((teacher:Teacher) => (
                            <TableRow key={teacher._id}>
                                <TableCell className="font-medium">{teacher.name}</TableCell>
                                <TableCell>{teacher.email}</TableCell>
                                <TableCell>{getDepartmentDetails(teacher.department)}</TableCell>
                                <TableCell>{teacher.phone}</TableCell>
                                {session?.user.userType === UserTypes.ADMIN &&
                                    <TableCell className="flex gap-2">
                                        <Pencil
                                            className='size-6 cursor-pointer'
                                            onClick={() => handleEdit(teacher)}
                                        />
                                        {deleteTeacherMutation.isPending && selected?._id === teacher._id ? (
                                            <Loader2 className='size-6 animate-spin' />
                                        ) : (
                                            <Trash
                                                className='size-6 cursor-pointer text-red-500'
                                                onClick={() => handleDelete(teacher)}
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
                <TeacherFormModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}
        </div>
    )
}

export default TeachersTable