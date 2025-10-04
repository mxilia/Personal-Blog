import postService from "@/services/PostService";

export async function GET(request : Request, { params }: { params: Promise<{ topic: string, hrefTitle: string }> }){
  const param = await params
  await postService.loadAll()
  const post = postService.getPostByTitle(param.topic, param.hrefTitle)
  if(!postService.titleExistence(param.topic, param.hrefTitle) || post === null) return Response.json({post: null, error: "Post not found", status: 404})
  return Response.json({post: post, error: "Post not found", status: 404})
}