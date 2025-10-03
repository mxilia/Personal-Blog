import BlogContainer from "@/components/blog/BlogContainer";

async function PostPage({ params } : { params: Promise<{ topic: string; title: string }>  }){
  const param = await params
  return (
    <div className="h-max">
      <BlogContainer topic={param.topic} hrefTitle={param.title}></BlogContainer>
    </div>
  )
}
export default PostPage