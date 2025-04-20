"use client";
import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar'
import { BookMarked, CalendarCheck, GraduationCap, LogOut, University } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { getDepartmentDetails } from '@/utils';


const items = [
  {
    title: "Home",
    url: "/teacher",
    icon: University,
  },
  {
    title: "Students",
    url: "/teacher/student",
    icon: GraduationCap,
  },
  {
    title: "Attendance",
    url: "/teacher/attendance",
    icon: CalendarCheck
  },
  {
    title: "Courses",
    url: "/admin/course",
    icon: BookMarked,
  },
]

const TeacherSidebar = () => {
  const { data: session } = useSession();
  const handleSignOut = () => {
    signOut()
    toast.success("Logged out successfully")
  }
  return (
    <Sidebar className='relative'>
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              {session?.user.name} ({session?.user.department !== undefined ? getDepartmentDetails(session.user.department) : "Unknown Department"})
            </SidebarMenuButton>
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
  )
}

export default TeacherSidebar;