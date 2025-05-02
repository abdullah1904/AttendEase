"use client";
import React, { useState } from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { BookMarked, GraduationCap, LogOut, Presentation, University } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { getDepartmentDetails } from "@/utils";
import ChangePasswordFormModal from "../modals/ChangePasswordFormModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Link from "next/link";

const items = [
    {
        title: "Home",
        url: "/admin",
        icon: University,
    },
    {
        title: "Teachers",
        url: "/admin/teacher",
        icon: Presentation,
    },
    {
        title: "Students",
        url: "/admin/student",
        icon: GraduationCap,
    },
    {
        title: "Courses",
        url: "/admin/course",
        icon: BookMarked,
    },
];

const AdminSidebar = () => {
    const [showModal, setShowModal] = useState(false);
    const { data: session } = useSession();
    const handleSignOut = () => {
        signOut();
        toast.success("Logged out successfully");
    }
    return (
        <>
            <Sidebar className="fixed top-0 left-0 h-screen w-64 border-r bg-white z-50">
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
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
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
    );
};

export default AdminSidebar;
