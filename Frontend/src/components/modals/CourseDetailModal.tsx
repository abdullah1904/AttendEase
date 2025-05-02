import { Course } from '@/types/course'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { getDepartmentDetails } from '@/utils'
import { Student } from '@/types/student'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Course | null
    setSelected: (selected: Course | null) => void
}

const CourseDetailModal = ({ selected, setSelected, setShowModal, showModal }: Props) => {
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <DialogContent className='overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-700 hide-scrollbar max-h-[90%]'>
                <DialogHeader>
                    <DialogTitle>Course Details</DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-3 gap-4'>
                    <div>
                        <p className='text-sm font-semibold'>Course Name</p>
                        <p className='text-sm'>{selected?.name}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Course Code</p>
                        <p className='text-sm'>{selected?.code}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Course Credits</p>
                        <p className='text-sm'>{selected?.credits}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Course Department</p>
                        <p className='text-sm'>{getDepartmentDetails(selected?.department ?? 0)}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Session / Session</p>
                        <p className='text-sm'>{selected?.session} {selected?.section}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Instructor</p>
                        <p className='text-sm'>{selected?.instructor.name}</p>
                    </div>
                    <div className='col-span-3'>
                        <p className='text-sm font-semibold'>Students</p>
                        <Table className='text-sm'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Phone</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selected?.students.map((student: Student) => (
                                    <TableRow key={student._id}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{getDepartmentDetails(student.department)}</TableCell>
                                        <TableCell>{student.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default CourseDetailModal