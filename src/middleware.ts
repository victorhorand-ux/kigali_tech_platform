import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Only protect routes that start with /admin (excluding the login page itself)
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const sessionCookie = request.cookies.get("admin_session");

    // If the cookie is missing or invalid, boot them back to the login screen
    if (!sessionCookie || sessionCookie.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Optimize middleware execution by only running it on /admin paths
export const config = {
  matcher: ["/admin/:path*"],
};