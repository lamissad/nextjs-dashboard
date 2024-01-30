import NextAuth from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
  // Directly retrieve the token from the cookies
  const token = request.cookies.get('token');

  // Apply the middleware logic only for the /profile route
  if (request.nextUrl.pathname === '/profile' && !token) {
    // Construct the URL for the login page
    const loginUrl = new URL('/login', request.url);
    // Redirect to the login page if the token is not present
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed normally for all other cases
  return NextResponse.next();
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
