import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token';

// Routes that require authentication
const PROTECTED_ROUTES = ['/admin', '/owner', '/superadmin', '/account', '/my-bookings'];
const PROTECTED_PATTERNS = [
  /^\/salon\/[^/]+\/portal\/dashboard(\/|$)/,
  /^\/salon\/[^/]+\/dashboard(\/|$)/,
  /^\/salon\/[^/]+\/services(\/|$)/,
  /^\/salon\/[^/]+\/appointments(\/|$)/,
  /^\/salon\/[^/]+\/availability(\/|$)/,
  /^\/salon\/[^/]+\/subscription(\/|$)/,
  /^\/salon\/[^/]+\/settings(\/|$)/,
  /^\/salon\/[^/]+\/customers(\/|$)/,
  /^\/salon\/[^/]+\/team(\/|$)/,
  /^\/salon\/[^/]+\/website(\/|$)/,
  /^\/salon\/[^/]+\/analytics(\/|$)/,
  /^\/salon\/[^/]+\/marketing(\/|$)/,
];

// Auth routes — redirect to dashboard if already logged in
const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const isAuthenticated = !!token && token.length > 0;
  const decoded = decodeToken(token);
  const role = decoded?.role || null;
  const roles = decoded?.roles || [];

  // Check if user has a role either via primary `role` or `roles` array
  const hasRole = (...allowed: string[]) =>
    (role && allowed.includes(role)) || roles.some((r: string) => allowed.includes(r));

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isTenantAccountRoute = /^\/tenant\/[^/]+\/(account|my-bookings|admin)(\/|$)/.test(pathname);
  const isPortalDashboardRoute = PROTECTED_PATTERNS.some((pattern) => pattern.test(pathname));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  // Owner setup page is accessible after registration (token exists)
  // Unauthenticated user trying to access protected routes → redirect to login
  if ((isProtectedRoute || isTenantAccountRoute || isPortalDashboardRoute) && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith('/superadmin') && !hasRole('SUPER_ADMIN', 'ADMIN')) {
    return NextResponse.redirect(new URL('/owner/dashboard', request.url));
  }

  if (pathname.startsWith('/owner') && !hasRole('OWNER', 'SALON_OWNER', 'TENANT_ADMIN', 'STAFF', 'ADMIN', 'SUPER_ADMIN')) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // Authenticated user trying to access login/register → redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

function decodeToken(token?: string): { role?: string; roles?: string[] } | null {
  if (!token) return null;
  try {
    const raw = token.startsWith('Bearer ') ? token.slice(7) : token;
    const payload = raw.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)',],
};
