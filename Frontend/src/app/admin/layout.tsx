import AdminSidebar from '@/components/sidebars/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const AdminLayout = ({ children }: Props) => {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AdminSidebar />
                <div className="flex-1 p-4">
                    {/* Top-left trigger only on mobile */}
                    <div className="mb-4 flex items-center border-b-2">
                        <SidebarTrigger className="bg-white p-2 rounded-md shadow md:hidden" />
                        <div className='p-2'>
                            <h2 className='text-2xl md:text-3xl'>AttendEase Admin&apos;s Panel</h2>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}

export default AdminLayout