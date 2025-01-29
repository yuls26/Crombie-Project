// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const token = request.cookies.get("next-auth.session-token");
    const isAuthPage = request.nextUrl.pathname.startsWith("/login");
    const isHomePage = request.nextUrl.pathname.startsWith("/");

    if (!token && (!isAuthPage || !isHomePage)) {

        // console.log(token);

        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // console.log(token);

    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: [
        "/test",
        "/main",
        "/dashboard"
    ],
};