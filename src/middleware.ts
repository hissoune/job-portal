import { NextResponse } from "next/server";
import { verifyToken } from "./app/lib/auth";

export async function middleware(req: Request) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/api/jobs/:path*", "/api/applications/:path*"],
};
