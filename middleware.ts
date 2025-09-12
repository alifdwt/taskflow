import { NextRequest, NextResponse } from "next/server";

import { auth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session from the request
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuthenticated = !!session?.user;

  // Define route types
  const isAuthRoute =
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password");

  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/profile");

  // Redirect logic
  if (isAuthRoute && isAuthenticated) {
    // If user is already authenticated, redirect from auth pages to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    // If user is not authenticated, redirect to signin with return URL
    const returnUrl = encodeURIComponent(pathname + request.nextUrl.search);
    return NextResponse.redirect(
      new URL(`/signin?returnUrl=${returnUrl}`, request.url)
    );
  }

  // Handle root redirect
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
