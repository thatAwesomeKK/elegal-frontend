import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

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
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/auth/login', '/auth/register', '/profile/:path*'],
  }