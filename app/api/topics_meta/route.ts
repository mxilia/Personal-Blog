import postService from "@/services/PostService";
import { NextResponse } from "next/server";

export async function GET(request : Request){
  /*
  const api_key = request.headers.get("api-key")
  if(api_key !== process.env.INTERNAL_API_KEY) return new NextResponse("Unauthorized", { status: 401 })
  */
  await postService.loadAll()
  const topicsMeta = postService.getAllTopicMeta()
  return NextResponse.json(topicsMeta)
}