import postService from "@/services/PostService";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string }> }){
  const param = await params
  await postService.loadAll()
  const posts = postService.getPostsByTopic(param.topic)
  return Response.json(posts)
}