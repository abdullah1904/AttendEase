import { DefaultSession } from "next-auth";

// Extend the `Session` interface
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string,
            email: string;
            userType: number;
            phone: string,
            department: number;
            access_token: string;
            refresh_token: string;
        } & DefaultSession["user"];  // Include all other properties of the default user
    }

    // Extend the `User` interface
    interface User {
        id: string;
        email: string;
        name: string;
        userType: number;
        phone: string;
        department: number;
        access_token: string;
        refresh_token: string;
    }
}

// Extend the `JWT` interface in `next-auth/jwt`
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
        userType: number;
        phone: string;
        department: number;
        access_token: string;
        refresh_token: string;
    }
}