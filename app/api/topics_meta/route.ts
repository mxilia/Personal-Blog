import postService from "@/services/PostService";

export async function GET(request : Request){
  await postService.loadAll()
  const topicsMeta = postService.getAllTopicMeta()
  return Response.json(topicsMeta)
}