

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/auth"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const unauthRoutes = ["/login", "/register"];

  if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/jobs", req.url));
  }

  const decode = await verifyToken(token);

  req.user = decode;
  const response = NextResponse.next();
  response.cookies.set("user_data", JSON.stringify(decode));
  return response;
}


export const config = {
  matcher: [
    "/jobs",
    "/api/protected-endpoint",
    "/login",
    "/register",
  ],
};
