import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


function middleware(request : NextRequest){
  console.log(request.headers.get("origin"), request.headers.get("host"))
  if(request.headers.get("origin") !== null && request.headers.get("origin") !== request.headers.get("host")) return new NextResponse("Forbidden", { status: 403 })
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}

export default middleware