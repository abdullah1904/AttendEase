"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { CirclePlus, Pencil, Trash } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Course } from '@/types/course'

type Props = {
  courses: Course[]
}

const CoursesTable = ({ courses }: Props) => {
  const [isAdmin] = useState(true);
  const [coursesData, setCoursesData] = useState<Course[]>(courses);
  const handleDelete = (id: string) => {
    setCoursesData(coursesData.filter(course => course.id !== id));
  }
  return (
    <div className='p-2'>
      <div className='flex justify-between'>
        <h2 className='text-xl'>Students</h2>
        <Button>
          <CirclePlus />
          Create Course
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Session/Section</TableHead>
            {isAdmin &&
              <TableHead>Actions</TableHead>
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {coursesData && coursesData.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.name}</TableCell>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.credits}</TableCell>
              <TableCell>{course.department}</TableCell>
              <TableCell>{course.teacher.name}</TableCell>
              {isAdmin &&
                <TableCell className="flex gap-2">
                  <Pencil
                    className='w-6 h-6'
                  />
                  <Trash
                    className='w-6 h-6 text-red-500'
                    onClick={() => handleDelete(course.id)}
                  />
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CoursesTable