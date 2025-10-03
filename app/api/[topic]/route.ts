import postService from "@/services/PostService";
import { type Post } from "@/types/Post";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string }> }){
  const param = await params
  await postService.loadAll()
  if(!postService.topicExistence(param.topic)) return Response.json({data: null, error: "Topic not found.", status: 404})
  const posts = postService.getPostsByTopic(param.topic)?.sort((a : Post, b : Post) => parseInt(a.order, 10) - parseInt(b.order, 10))
  return Response.json(posts)
}