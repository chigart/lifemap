import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const firstVisit = req.cookies.get("visited");
  const isLanguageChange = req.nextUrl.searchParams.has('lang');

  if (firstVisit && req.nextUrl.pathname === "/welcome" && !isLanguageChange)
    return NextResponse.redirect(new URL("/", req.url));

  if (!firstVisit && req.nextUrl.pathname !== "/welcome")
    return NextResponse.redirect(new URL("/welcome", req.url));

  const res = NextResponse.next();

  if (req.nextUrl.pathname === "/welcome")
    res.cookies.set("visited", "true", { maxAge: 60 * 60 * 24 * 365 });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};