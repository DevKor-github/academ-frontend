import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // more redirects in next.config.mjs

  if (pathname.startsWith('/course/')) {
    const newPathname = pathname.replace('/course/', '/lecture/');
    return NextResponse.redirect(new URL(newPathname, request.url));
  }
  return NextResponse.next();
}

// Specify the paths that will use this middleware
export const config = {
  matcher: '/course/:path*',
};
