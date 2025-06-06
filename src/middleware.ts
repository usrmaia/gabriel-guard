import { NextRequest, NextResponse } from "next/server";

const protectedRoutes: readonly string[] = ["/meu-perfil"];

export default function middleware(req: NextRequest) {
  const isAuthenticated = !!req.cookies.get("authjs.session-token");
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !isAuthenticated)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${pathname}`, req.url),
    );

  return NextResponse.next();
}
