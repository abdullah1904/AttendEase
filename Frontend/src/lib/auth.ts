import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                        email: credentials?.email,
                        password: credentials?.password,
                    });
                    const user = response.data;
                    if (user && response.status === 200) {
                        return {
                            id: user.user.id,
                            email: user.user.email,
                            userType: user.user.userType,
                            access_token: user.user.access_token,
                            refresh_token: user.user.refresh_token,
                        };
                    }
                    return null;
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        throw new Error(error.response?.data?.error || "Login failed");
                    } else {
                        throw new Error("An unexpected error occurred");
                    }
                }
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.userType = user.userType;
                token.access_token = user.access_token;
                token.refresh_token = user.refresh_token;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.userType = token.userType as number;
                session.user.access_token = token.access_token as string;
                session.user.refresh_token = token.refresh_token as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET
}