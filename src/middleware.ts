import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isLoggedIn = !!accessToken;

  if (pathname.startsWith("/auth") && isLoggedIn) {
    console.log("middleware: redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/profile") && !isLoggedIn) {
    console.log("middleware: redirecting to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/:path*", "/profile/:path*"],
};
