"use client";

import React, { useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCoursesListQuery } from '@/hooks/use-course'
import { Course } from '@/types/course'
import { useAttendanceGetQuery } from '@/hooks/use-attendance';
import { Attendance } from '@/types/attendance';
import { AttendanceStatus } from '@/utils/constants';
import { formatDate } from '@/utils';
import { Loader2 } from 'lucide-react';

const AttendanceTable = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const {
    data: coursesData,
    isLoading,
    isError,
    error,
  } = useCoursesListQuery();
  const {
    data: attendanceData,
    isLoading: isAttendanceLoading,
    isError: isAttendanceError,
    error: attendanceError,
  } = useAttendanceGetQuery(selectedCourse?._id || '');

  const handleSelectChange = (value: string) => {
    const course = coursesData.find((course: Course) => course._id === value);
    setSelectedCourse(course || null);
  }

  if (isError || isAttendanceError) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-red-500">Error: {error?.message || attendanceError?.message}</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Attendance</h2>
        <Select
          disabled={isLoading}
          onValueChange={(value) => handleSelectChange(value)}
          value={selectedCourse?._id}
          defaultValue={selectedCourse?._id}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {coursesData?.map((course: Course) => (
              <SelectItem key={course._id} value={course._id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isAttendanceLoading ? (
        <div className='w-full flex justify-center items-center'>
          <Loader2 className='size-16 animate-spin' />
        </div>
      ) : selectedCourse ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Name</TableHead>
              <TableHead>Attendance Date</TableHead>
              <TableHead>Attendance Marked By</TableHead>
              <TableHead>Total Students</TableHead>
              <TableHead>Present Count</TableHead>
              <TableHead>Absent Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData?.map((attendance: Attendance) => (
              <TableRow key={attendance._id}>
                <TableCell>{attendance.course.name}</TableCell>
                <TableCell>{formatDate(attendance.date)}</TableCell>
                <TableCell>{attendance.markedBy.name}</TableCell>
                <TableCell>{attendance.students.length}</TableCell>
                <TableCell>{attendance.students.filter((student) => student.status === AttendanceStatus.PRESENT).length}</TableCell>
                <TableCell>{attendance.students.filter((student) => student.status === AttendanceStatus.ABSENT).length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="w-full flex justify-center items-center">
          <p className="text-gray-500">Please select a course to view attendance data.</p>
        </div>
      )}
    </>
  );
};

export default AttendanceTable;