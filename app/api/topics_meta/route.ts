import postService from "@/services/PostService";

export async function GET(){
  await postService.loadAll()
  const topicsMeta = postService.getAllTopicMeta()
  return Response.json(topicsMeta)
}