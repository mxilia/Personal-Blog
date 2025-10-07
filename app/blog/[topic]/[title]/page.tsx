import BlogContainer from "@/components/blog/BlogContainer";

async function PostPage({ params } : { params: Promise<{ topic: string; title: string }> }){
  const param = await params
  return (
    <div className="pb-10 bg-[var(--background)] w-screen h-screen transition-background">
      <BlogContainer 
        topic={param.topic} 
        hrefTitle={param.title}
      />
    </div>
  )
}
export default PostPage