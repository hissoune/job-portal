import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable inside .env.local");
}

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}


export async function hashPassword(password: string) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
