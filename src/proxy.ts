
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    // Get the token from cookies
    const token = request.cookies.get("auth_token")?.value;

    const { pathname } = request.nextUrl;

    // Protect Dashboard Routes
    if (pathname.startsWith("/dashboard")) {
        if (!token) {
            // Redirect to login if not authenticated
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }

    // Redirect Authenticated Users away from Auth Pages
    if (pathname.startsWith("/auth")) {
        if (token) {
            // Redirect to dashboard if already authenticated
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/auth/:path*"
    ],
};
