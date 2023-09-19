import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  if (pathname.startsWith("/auth") && !accessToken) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/auth") && accessToken) {
    return NextResponse.redirect(`${origin}/profile/dashboard`);
  }

  if (pathname.startsWith("/profile") && accessToken) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/profile") && !accessToken) {
    return NextResponse.redirect(`${origin}/auth?type=login`);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/auth/login", "/auth/register", "/profile/:path*"],
// };
