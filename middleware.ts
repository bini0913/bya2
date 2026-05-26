import { type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { createServerClient } from "@supabase/ssr";

const intlMiddleware = createIntlMiddleware(routing);

const PROTECTED_ADMIN_ROUTES = [
  "/admin/dashboard",
  "/admin/admissions",
  "/admin/news",
  "/admin/media",
  "/admin/settings",
];

function isProtectedAdminPath(pathname: string) {
  return PROTECTED_ADMIN_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

async function hasAdminAccess(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: () => undefined,
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const role = (user.app_metadata?.role ?? user.user_metadata?.role ?? "").toString().toLowerCase();
  return role === "admin" || role === "super_admin";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAdminPath(pathname)) {
    if (isProtectedAdminPath(pathname)) {
      const allowed = await hasAdminAccess(request);
      if (!allowed) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }

    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
