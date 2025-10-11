import postService from "@/services/PostService";
import { NextResponse } from "next/server";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string, hrefTitle: string }> }){
  const param = await params
  const post = await postService.getPostByTitle(param.topic, param.hrefTitle)
  if(!await postService.titleExistence(param.topic, param.hrefTitle) || post === null) return NextResponse.json({post: null, error: "Post not found", status: 404})
  return NextResponse.json({post: post, error: null, status: 200})
}