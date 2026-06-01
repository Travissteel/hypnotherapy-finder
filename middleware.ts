import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Practitioners who requested removal — return 410 Gone so Google de-indexes quickly
const REMOVED_PRACTITIONER_SLUGS = new Set([
  'jq-new-york-67',
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/practitioner/')) {
    const slug = pathname.split('/practitioner/')[1]?.split('/')[0];
    if (slug && REMOVED_PRACTITIONER_SLUGS.has(slug)) {
      return new NextResponse(null, { status: 410 });
    }
  }

  const hostname = req.headers.get('host') || '';

  // Redirect www to non-www (canonical domain standardization)
  // This fixes the "Alternate Page with Proper Canonical Tag" issue in Search Console
  if (hostname.startsWith('www.')) {
    const newUrl = new URL(req.url);
    newUrl.host = hostname.replace('www.', '');
    return NextResponse.redirect(newUrl, 301);
  }

  let res = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          res = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/claim-listing', '/profile'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to dashboard if logged in user tries to access login/signup
  // EXCEPTION: Allow access to /practitioner-signup?confirmed=true for users completing their profile after email confirmation
  const isCompletingSignup = req.nextUrl.pathname === '/practitioner-signup' &&
    req.nextUrl.searchParams.get('confirmed') === 'true';

  if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/practitioner-signup') && session && !isCompletingSignup) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  // Match all paths for www redirect, plus protected routes for auth
  matcher: [
    // Match all paths except static files and api routes for www redirect
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};
