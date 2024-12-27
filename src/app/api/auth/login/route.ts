import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string, 
      { expiresIn: "1h" }
    );

    // Set the token in an HTTP-only cookie
    const cookie = serialize("auth_token", token, {
      httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "strict", // Helps protect against CSRF attacks
      path: "/", // Makes the cookie available throughout the application
      expires: new Date(Date.now() + 60 * 60 * 1000), // Token expiration set to 1 hour
    });

    // Send the cookie with the response
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.headers.set("Set-Cookie", cookie); // Set the cookie in the response header

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
