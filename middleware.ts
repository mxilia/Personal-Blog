import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs" 

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  const allowedOrigin = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://${host}` 
  if (origin && origin !== allowedOrigin) return new NextResponse("Forbidden", { status: 403 })
  
  const url = request.nextUrl.pathname
  if(url === '/api/token') return NextResponse.next()

  const authHeader = request.headers.get("authorization")
  const token = authHeader?.replace("Bearer ", "")
  if(!token) return new NextResponse("Missing token", { status: 401 })

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error : any) {
    console.error("JWT verify error:", error.name, error.message)
    return new NextResponse("Invalid or expired token", { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}

export default middleware