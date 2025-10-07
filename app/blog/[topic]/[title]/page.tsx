import BlogContainer from "@/components/blog/BlogContainer";

async function PostPage({ params } : { params: Promise<{ topic: string; title: string }> }){
  const param = await params
  return (
    <div className="pt-20 pb-5 flex bg-[var(--background)] transition-background justify-center">
      <BlogContainer 
        topic={param.topic} 
        hrefTitle={param.title}
      />
    </div>
  )
}
export default PostPage