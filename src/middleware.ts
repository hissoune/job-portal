

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/auth"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const unauthRoutes = ["/login", "/register"];
   const hrRoutes = ["/dashboard"];
   const condidatRoutes = ["/jobs","/jobs/[jobId]",
    "/jobs/[jobId]/aply",
    "/applications"]

  if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const decode = await verifyToken(token);

  if (unauthRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && token) {
   if (decode.role == "hr") {
    return NextResponse.redirect(new URL("/dashboard", req.url));

   }else if (decode.role == "condidat") {
        return NextResponse.redirect(new URL("/jobs", req.url));

   }else {
    return NextResponse.redirect(new URL("/", req.url));

   }
  }

 
 
  if (hrRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && decode.role != "hr") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (condidatRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && decode.role != "condidat") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  req.user = decode;
  const response = NextResponse.next();
  response.cookies.set("user_data", JSON.stringify(decode));
  return response;
}


export const config = {
  matcher: [
    "/jobs",
    "/jobs/[jobId]",
    "/jobs/[jobId]/aply",
    "/applications",
    "/dashboard",
    "/api/protected-endpoint",
    "/login",
    "/register",
  ],
};
