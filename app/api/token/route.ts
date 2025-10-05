import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(){
  if(!process.env.JWT_SECRET) return NextResponse.json({ error: "Missing JWT_SECRET" }, { status: 500 })
  const secret = process.env.JWT_SECRET
  const token = jwt.sign(
    { role: "frontend-client" },
    secret,
    { expiresIn: "10m" }
  )
  return NextResponse.json({ token })
}