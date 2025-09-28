import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function middleware(request : NextRequest){
  return NextResponse.next()
}

export const config = {
  matcher: '/'
}

export default middleware