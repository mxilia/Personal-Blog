import postService from "@/services/PostService";
import { type Post } from "@/types/Post";
import { NextResponse } from "next/server";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string }> }){
  /*
  const api_key = request.headers.get("api-key")
  if(api_key !== process.env.INTERNAL_API_KEY) return new NextResponse("Unauthorized", { status: 401 })
  */
  const param = await params
  await postService.loadAll()
  if(!postService.topicExistence(param.topic)) return NextResponse.json({posts: null, error: "Topic not found.", status: 404})
  const posts = postService.getPostsByTopic(param.topic)?.sort((a : Post, b : Post) => parseInt(a.order, 10) - parseInt(b.order, 10))
  return NextResponse.json({posts: posts, error: null, status: 200})
}