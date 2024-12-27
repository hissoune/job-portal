import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; 

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1000d" });
}

export async function verifyToken(token: string) {
  console.log(token);
  
  // try {
    const decoded = await jwt.verify(token, JWT_SECRET); 
    return decoded; 
  // } catch (error) {
  //   console.error("JWT verification error:", error);
  //   throw new Error("Invalid token");
  // }
}

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword); 
}
