

import { NextResponse } from "next/server";
import {verifyToken} from "./app/lib/auth"

export async function middleware(req:any) {
  const token = req.cookies.get("auth_token")?.value; 
  const unauthRoutes = ["/auth/login", "/auth/register"];
 
  if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) &&  !token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }



    if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    

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
