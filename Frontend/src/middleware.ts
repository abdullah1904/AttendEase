import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }


    const userType = token.userType;

    if (req.nextUrl.pathname === "/") {
      if (userType === 1) {
        return NextResponse.redirect(new URL("/admin", req.url));
      } else if (userType === 2) {
        return NextResponse.redirect(new URL("/teacher", req.url));
      }
    }

    if (req.nextUrl.pathname.startsWith("/admin") && userType !== 1) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/teacher") && userType !== 2) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow if userType matches the route
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/admin/:path*", 
    "/teacher/:path*"
  ],
};