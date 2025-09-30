import postService from "@/services/PostService";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string, hrefTitle: string }> }){
  const param = await params
  await postService.loadAll()
  const post = postService.getPostByTitle(param.topic, param.hrefTitle)
  return Response.json(post)
}