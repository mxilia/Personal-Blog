import postService from "@/services/PostService";
import ContentBox from "./ContentBox";

async function ContentList(){
  await postService.loadAll()
  return (
    <>
      {
        postService.getAllTopicMeta()?.map((e) => (<ContentBox key={e.topic} date={e.date} href={e.href} topic_text={e.topic} tags={e.tags} desc={e.desc}></ContentBox>))
      }
    </>
  )
}

export default ContentList