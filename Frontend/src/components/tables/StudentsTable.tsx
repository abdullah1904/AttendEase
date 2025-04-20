"use client";
import { Student } from '@/types/student'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CirclePlus, Pencil, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import StudentFormModal from '../modals/StudentFormModal';

type Props = {
    students: Student[]
}

const StudentsTable = ({ students }: Props) => {
    const [isAdmin] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState<Student | null>(null);
    const [studentsData, setStudentsData] = useState<Student[]>(students);

    const handleDelete = (id: string) => {
        setStudentsData(studentsData.filter(student => student.id !== id));
    }
    const handleEdit = (student: Student) => {
        setSelected(student);
        setShowModal(true);
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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Overall Attendance</TableHead>
                        {isAdmin &&
                            <TableHead>Actions</TableHead>
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {studentsData && studentsData.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.phone}</TableCell>
                            <TableCell>{student.overallAttendance}</TableCell>
                            {isAdmin &&
                                <TableCell className="flex gap-2">
                                    <Pencil
                                        className='w-6 h-6 cursor-pointer'
                                        onClick={() => handleEdit(student)}
                                    />
                                    <Trash
                                        className='w-6 h-6 cursor-pointer text-red-500'
                                        onClick={() => handleDelete(student.id)}
                                    />
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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