import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/lib/auth'


export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === '/studios') {
    return NextResponse.redirect(new URL('/explore', request.url))
  }

  const session = await auth.api.getSession({ headers: 
   request.headers
  })
const user=session?.user;

  if (!user) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/myBookings/:path*', '/studios/:path*'],
}