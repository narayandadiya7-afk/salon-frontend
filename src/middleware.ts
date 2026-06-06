import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token';

// Routes that require authentication
const PROTECTED_ROUTES = ['/admin', '/owner', '/superadmin', '/account', '/my-bookings'];

// Auth routes — redirect to dashboard if already logged in
const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const isAuthenticated = !!token && token.length > 0;
  const role = decodeRole(token);

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isTenantAccountRoute = /^\/tenant\/[^/]+\/(account|my-bookings|admin)(\/|$)/.test(pathname);
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Owner setup page is accessible after registration (token exists)
  // Unauthenticated user trying to access protected routes → redirect to login
  if ((isProtectedRoute || isTenantAccountRoute) && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/superadmin') && role && role !== 'SUPER_ADMIN' && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/owner/dashboard', request.url));
  }

  if (pathname.startsWith('/owner') && role && !['OWNER', 'SALON_OWNER', 'TENANT_ADMIN', 'STAFF', 'ADMIN', 'SUPER_ADMIN'].includes(role)) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // Authenticated user trying to access login/register → redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

function decodeRole(token?: string): string | null {
  if (!token) return null;
  try {
    const raw = token.startsWith('Bearer ') ? token.slice(7) : token;
    const payload = raw.split('.')[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decoded.role || null;
  } catch {
    return null;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',],
};
