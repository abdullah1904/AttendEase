import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Student } from '@/types/student'
import { formatDate, getDepartmentDetails } from '@/utils'
import { Attendance } from '@/types/attendance'
import { AttendanceStatus } from '@/utils/constants'

type Props = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
    selected: Attendance | null
    setSelected: (selected: Attendance | null) => void
}

const AttendanceDetailModal = ({ selected, setSelected, setShowModal, showModal }: Props) => {
    const handleClose = () => {
        setSelected(null);
        setShowModal(false);
    }
    return (
        <Dialog open={showModal} onOpenChange={handleClose}>
            <DialogContent className='overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-700 hide-scrollbar max-h-[90%]'>
                <DialogHeader>
                    <DialogTitle>Attendance Details</DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <p className='text-sm font-semibold'>Course Name</p>
                        <p className='text-sm'>{selected?.course.name}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Attendance Date</p>
                        <p className='text-sm'>{formatDate(selected?.date ?? new Date())}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold'>Attendance Marked By</p>
                        <p className='text-sm'>{selected?.markedBy.name}</p>
                    </div>
                    <div className='col-span-2'>
                        <p className='text-sm font-semibold'>Students</p>
                        <Table className='text-sm'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selected?.students.map(({status,student}: {student: Student, status: AttendanceStatus}) => (
                                    <TableRow key={student._id}>
                                        <TableCell className="font-medium">{student.name}</TableCell>
                                        <TableCell>{getDepartmentDetails(student.department)}</TableCell>
                                        <TableCell>{status === AttendanceStatus.PRESENT ? "Present" : "Absent"}</TableCell>
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

export default AttendanceDetailModal