import postService from "@/services/PostService";
import { type Post } from "@/types/Post";
import { NextResponse } from "next/server";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string }> }){
  const param = await params
  if(!await postService.topicExistence(param.topic)) return NextResponse.json({posts: null, error: "Topic not found.", status: 404})
  const posts = await postService.getPostsByTopic(param.topic)
  const sortedPosts = posts?.sort((a : Post, b : Post) => parseInt(a.order, 10) - parseInt(b.order, 10))
  return NextResponse.json({posts: sortedPosts, error: null, status: 200})
}