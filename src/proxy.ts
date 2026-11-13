import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/studios') {
    return NextResponse.redirect(new URL('/explore', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studios/:path*'],
}