import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
<<<<<<< Updated upstream

    const {pathname} = request.nextUrl
    const accessToken = request.cookies.get('accessToken')?.value

  if (pathname.startsWith('/auth/login') && !accessToken) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/auth/register') && !accessToken) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/profile') && accessToken) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/", request.url));
=======
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
>>>>>>> Stashed changes
}

// See "Matching Paths" below to learn more
export const config = {
<<<<<<< Updated upstream
    matcher: ['/auth/login', '/auth/register', '/profile/:path*'],
  }
=======
  matcher: ["/auth/:path*", "/profile/:path*"],
};
>>>>>>> Stashed changes
