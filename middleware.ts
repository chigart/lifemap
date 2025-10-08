import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const firstVisit = req.cookies.get("visited");
  const isLanguageChange = req.nextUrl.searchParams.has('lang');

  // If cookie exists and it's not a language change, skip intro page
  if (firstVisit && req.nextUrl.pathname === "/welcome" && !isLanguageChange) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If cookie doesn't exist and user visits anywhere else first, redirect to intro
  if (!firstVisit && req.nextUrl.pathname !== "/welcome") {
    return NextResponse.redirect(new URL("/welcome", req.url));
  }

  // Otherwise continue
  const res = NextResponse.next();

  // Set cookie if user has seen welcome page
  if (req.nextUrl.pathname === "/welcome") {
    res.cookies.set("visited", "true", { maxAge: 60 * 60 * 24 * 365 }); // 1 year
  }

  return res;
}

// Apply to all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};