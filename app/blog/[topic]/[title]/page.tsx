import BlogContainer from "@/components/blog/BlogContainer";

async function PostPage({ params } : { params: Promise<{ topic: string; title: string }> }){
  const param = await params
  return (
    <div className="pb-10">
      <BlogContainer 
        topic={param.topic} 
        hrefTitle={param.title}
      />
    </div>
  )
}
export default PostPage