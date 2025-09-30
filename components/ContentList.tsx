'use client'
import ContentBox from "./ContentBox";
import { useEffect, useState } from "react";
import type { TopicMeta } from "@/types/TopicMeta";
import axios from "axios";
import LoadingBox from "./LoadingBox";

function ContentList(){
  const [topics, setTopics] = useState<TopicMeta[]>([])
  useEffect(() => {
    const load = async () => {
      const result = await axios.get("/api/topics_meta")
      if(result.data) setTopics([...result.data])
      console.log(result.data)
    }
    load()
  }, [])
  return (
    <>
      {
        topics.length === 0 ? <LoadingBox></LoadingBox> : topics.map((e) => (<ContentBox key={e.topic} date={e.date} href={e.href} topic_text={e.topic} tags={e.tags} desc={e.desc}></ContentBox>))
      }
    </>
  )
}

export default ContentList