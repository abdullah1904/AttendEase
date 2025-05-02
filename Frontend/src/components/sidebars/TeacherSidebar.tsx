"use client";
import React, { useState } from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, SidebarTrigger } from '@/components/ui/sidebar'
import { BookMarked, CalendarCheck, LogOut, University } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { getDepartmentDetails } from '@/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import ChangePasswordFormModal from '../modals/ChangePasswordFormModal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import Link from 'next/link';


const items = [
  {
    title: "Home",
    url: "/teacher",
    icon: University,
  },
  // {
  //   title: "Students",
  //   url: "/teacher/student",
  //   icon: GraduationCap,
  // },
  {
    title: "Courses",
    url: "/teacher/course",
    icon: BookMarked,
  },
  {
    title: "Attendance",
    icon: CalendarCheck,
    subitems: [
      {
        title: "Show Attendance",
        url: "/teacher/attendance",
      },
      {
        title: "Mark Attendance",
        url: "/teacher/attendance/mark",
      }

    ]
  },
]

const TeacherSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut()
    toast.success("Logged out successfully")
  }
  return (
    <>
      <Sidebar className='fixed top-0 left-0 h-screen w-64 border-r bg-white z-50'>
        <SidebarTrigger className="absolute top-4 right-4 z-50 bg-white p-2 rounded-md shadow md:hidden" />
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <h2 className="text-xl">AttendEase</h2>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) =>
                  item.subitems ? (
                    <Collapsible key={item.title}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className='gap-2'>
                            {item.subitems.map((sub) => (
                              <SidebarMenuSubItem key={sub.title}>
                                <Link href={sub.url}>
                                  <span>{sub.title}</span>
                                </Link>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
              </SidebarMenu>

            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {session?.user.name} ({session?.user.department !== undefined ? getDepartmentDetails(session.user.department) : ""})
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem onClick={() => setShowModal(true)}>
                    <span>Change Password</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>

              </DropdownMenu>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut}>
                <LogOut />
                Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {showModal && (
        <ChangePasswordFormModal
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </>
  )
}

export default TeacherSidebar;