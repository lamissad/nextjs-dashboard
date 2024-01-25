import NextAuth from 'next-auth';
import { NextRequest } from 'next/server';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export async function middleware(request: NextRequest) {
  const allCookies = request.cookies.getAll();
  console.log('allCookies', allCookies);
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
