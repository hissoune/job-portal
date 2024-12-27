import { NextResponse } from "next/server";
import {verifyToken} from "./app/lib/auth"

export async function middleware(req:any) {
  const token = req.cookies.get("auth_token"); // Retrieve token from cookies
console.log('token li baghi ',token);

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }


    const decoded = verifyToken(token)
    console.log("hada decode ",decoded);
    
    req.user = decoded; 

    return NextResponse.next();
  
}

export const config = {
  matcher: ["/dashboard", "/api/protected-endpoint"],
};
