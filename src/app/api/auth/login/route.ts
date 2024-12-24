import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";
import { comparePassword } from "@/app/lib/auth";
import { generateToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken({ id: user._id, role: user.role });
  return NextResponse.json({ token });
}
