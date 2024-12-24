import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";
import { hashPassword } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {name, email, password } = await req.json();

  await connectToDatabase();

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({name, email, password: hashedPassword });

  return NextResponse.json({ user: { id: newUser._id, email: newUser.email } });
}
