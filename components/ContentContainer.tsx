'use client'
import TopicText from "./TopicText";
import ContentList from "./ContentList";

function ContentContainer(){
  return (
    <div className="w-full h-fit p-5">
      <TopicText text="Content"></TopicText>
      <ContentList></ContentList>
    </div>
  )
}

export default ContentContainer