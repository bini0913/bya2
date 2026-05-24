import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

function isAdminPath(pathname: string) {
  return pathname === "/admin-login" || pathname.startsWith("/admin");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Keep admin routes unprefixed and outside locale routing.
  if (isAdminPath(pathname)) {
    return NextResponse.next();
  }

export function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
