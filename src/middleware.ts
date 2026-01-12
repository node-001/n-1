import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from '@/i18n/config';

export const runtime = "nodejs";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // Only prefix non-default locales
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip i18n for admin routes, API routes, static files
  const shouldSkipI18n =
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.');

  if (shouldSkipI18n) {
    // Only run Supabase auth for admin routes
    if (pathname.startsWith('/admin')) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const isSupabaseConfigured = supabaseUrl && !supabaseUrl.includes("localhost");

      if (isSupabaseConfigured) {
        const { updateSession } = await import("@/lib/supabase/middleware");
        return await updateSession(request);
      }
    }
    return NextResponse.next();
  }

  // Handle i18n routing for public pages
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
