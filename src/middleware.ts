"use server"

import { NextResponse } from "next/server";
import {verifyToken} from "./app/lib/auth"

export async function middleware(req:any) {
  const token = req.cookies.get("auth_token")?.value; 
console.log('token li baghi ',token);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const unauthRoutes = ["/auth/login", "/auth/register"];
 

    const decoded =  verifyToken(token)
    console.log("hada decode ",decoded);

    if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    req.user = decoded; 

    return NextResponse.next();
  
}

export const config = {
  matcher: ["/dashboard", "/api/protected-endpoint", "/auth/login",
    "/auth/register",],
};
