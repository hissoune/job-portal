

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/auth"
import { cryptoRuntime } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const unauthRoutes = ["/auth/login", "/auth/register"];

  if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }



  if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }


  const decode = await verifyToken(token);
  req.user = decode


  return NextResponse.next();

}

export const config = {
  matcher: [
    "/dashboard",
    "/api/protected-endpoint",
    "/auth/login",
    "/auth/register",
  ],
};
