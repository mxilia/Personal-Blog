import TopicText from "./TopicText";
import ContentList from "./ContentList";
import { Suspense } from "react";

function SearchBar(){
  return (
    <>
      
    </>
  )
}

function ContentContainer(){

  return (
    <div className="w-full h-fit p-5">
      <TopicText text="Content"></TopicText>
      <Suspense fallback={<div>Loading Posts...</div>}>
        <ContentList></ContentList>
      </Suspense>
      
    </div>
  )
}

export default ContentContainer