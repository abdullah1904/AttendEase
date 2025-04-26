"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"


const StudentHomePage = () => {
    const handleSignOut = ()=>{
        signOut();
    }
  return (
    <div>
        <Button onClick={handleSignOut}>
            Logout
        </Button>
    </div>
  )
}

export default StudentHomePage