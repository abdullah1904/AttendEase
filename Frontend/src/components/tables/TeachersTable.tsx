"use client"
import { Teacher, } from '@/types/teacher'
import { CirclePlus, Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import TeacherFormModal from '../modals/TeacherFormModal';

type Props = {
    teachers: Teacher[];
}


const TeachersTable = ({ teachers }: Props) => {
    const [isAdmin] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Teacher | null>(null);
    const [teachersData, setTeachersData] = useState<Teacher[]>(teachers);

    const handleDelete = (id: number) => {
        setTeachersData(teachersData.filter(teacher => teacher.id !== id));
    }
    const handleEdit = (teacher: Teacher) => {
        setSelected(teacher);
        setShowModal(true);
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Phone</TableHead>
                        {isAdmin &&
                            <TableHead>Actions</TableHead>
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {teachersData && teachersData.map((teacher) => (
                        <TableRow key={teacher.id}>
                            <TableCell className="font-medium">{teacher.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.department}</TableCell>
                            <TableCell>{teacher.phone}</TableCell>
                            {isAdmin &&
                                <TableCell className="flex gap-2">
                                    <Pencil
                                        className='w-6 h-6 cursor-pointer'
                                        onClick={() => handleEdit(teacher)}
                                    />
                                    <Trash
                                        className='w-6 h-6 cursor-pointer text-red-500'
                                        onClick={() => handleDelete(teacher.id)}
                                    />
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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