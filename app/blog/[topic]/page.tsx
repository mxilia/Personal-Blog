import BlogContainer from "@/components/BlogContainer";
import NavBar from "@/components/NavBar";

async function PostPage({ params } : { params: Promise<{ topic : string }> }){
  const param = await params
  return (
    <div className="h-max">
      <NavBar></NavBar>
      <BlogContainer topic={param.topic}></BlogContainer>
    </div>
  )
}
export default PostPage