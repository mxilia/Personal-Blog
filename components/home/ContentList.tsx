'use client'
import ContentBox from "./ContentBox";
import { useEffect, useState } from "react";
import type { TopicMeta } from "@/types/TopicMeta";
import axios from "axios";
import LoadingBox from "../misc/LoadingBox";
import useSWR from "swr";

function SearchBar(){
  return (
    <>
      
    </>
  )
}

const fetcher = async (url: string) => await axios.get(url).then(r => r.data);

function ContentList(){
  const [topics, setTopics] = useState<TopicMeta[]>([])
  const { data } = useSWR("/api/topics_meta", fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 600000,
  });
  useEffect(() => {
    if(data) setTopics(data);
  }, [data])
  return (
    <> 
      <SearchBar></SearchBar>
      {
        topics.length === 0 ? 
        <LoadingBox></LoadingBox> 
        : 
        topics.map((e) => (<ContentBox key={e.topic} date={e.date} href={e.href} topic_text={e.topic} tags={e.tags} desc={e.desc}></ContentBox>))
      }
    </>
  )
}

export default ContentList