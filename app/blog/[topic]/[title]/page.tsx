import BlogContainer from "@/components/BlogContainer";
import TitleList from "@/components/TitleList";

async function PostPage({ params } : { params: Promise<{ topic: string; title: string }>  }){
  const param = await params
  return (
    <div className="h-max">
      {/* <TitleList/> */}
      
      <BlogContainer topic={param.topic} hrefTitle={param.title}></BlogContainer>
    </div>
  )
}
export default PostPage