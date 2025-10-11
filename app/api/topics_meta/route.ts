import postService from "@/services/PostService";
import { NextResponse } from "next/server";

export async function GET(request : Request){
  const topicsMeta = await postService.getAllTopicMeta()
  return NextResponse.json(topicsMeta)
}