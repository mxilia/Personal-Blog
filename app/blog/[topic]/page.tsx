import postService, { postsLoaded } from "@/services/PostService"

async function PostPage({ params } : { params : { topic : string } }){
  const topic = params.topic
  await postService.loadAll()
  const post : any = postService.getPostByTitle(topic, "Overview")
  return (
    <div>
      <div className="flex justify-center mt-5">
        {
          post !== null ? <div className="prose w-170" dangerouslySetInnerHTML={{ __html: post.contentHTML }}></div> : <div>not found</div>
        }
      </div>
      <a href="/"> back </a>
    </div>
  )
}

export default PostPage