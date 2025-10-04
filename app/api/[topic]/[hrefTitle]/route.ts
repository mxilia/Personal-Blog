import postService from "@/services/PostService";
import { NextResponse } from "next/server";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string, hrefTitle: string }> }){
  /*
  const api_key = request.headers.get("api-key")
  if(api_key !== process.env.INTERNAL_API_KEY) return new NextResponse("Unauthorized", { status: 401 })
  */
  const param = await params
  await postService.loadAll()
  const post = postService.getPostByTitle(param.topic, param.hrefTitle)
  if(!postService.titleExistence(param.topic, param.hrefTitle) || post === null) return NextResponse.json({post: null, error: "Post not found", status: 404})
  return NextResponse.json({post: post, error: null, status: 200})
}