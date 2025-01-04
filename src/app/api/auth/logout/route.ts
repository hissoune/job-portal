import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function DELETE() {
  try {
    const cookie = serialize("auth_token", "", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), 
    });

    const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    response.headers.set("Set-Cookie", cookie); 

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
