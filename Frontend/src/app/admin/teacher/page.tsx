import React from 'react'
import TeachersTable from '@/components/tables/TeachersTable'
import { teachers } from '@/types/teacher';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const AdminTeachersPage = () => {
  return (
    <div>
      <div className='p-2'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Teachers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <TeachersTable teachers={teachers} />
    </div>
  )
}

export default AdminTeachersPage