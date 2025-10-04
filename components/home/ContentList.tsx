'use client'
import ContentBox from "./ContentBox";
import { useEffect, useRef, useState } from "react";
import LoadingBox from "../misc/LoadingBox";
import axios from "axios";
import { TopicMeta } from "@/types/TopicMeta";
import useSWR from "swr";

function SearchBar({ text, setText } : { text : string, setText : (val: string) => void }){
  const barRef = useRef(null)
  return (
    <>
      <input 
        ref={barRef} 
        className="w-full mt-2 mb-2 p-1 pl-2 border-[1px] border-neutral-700 rounded-lg text-neutral-300 focus:outline-none" 
        placeholder="Search?"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </>
  )
}

const fetcher = async (url: string) => await axios.get(url).then(r => r.data)

function ContentList(){
  const [topics, setTopics] = useState<TopicMeta[]>([])
  const [text, setText] = useState("")
  const partialString = (a : string, b : string) => {
    const minLength = Math.min(a.length, b.length)
    for(let i=0;i<minLength;i++){
      if(a[i]!==b[i]) return false
    }
    return true
  }
  const { data } = useSWR("/api/topics_meta", fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 600000,
  })
  useEffect(() => {
    if(data) setTopics(data)
  }, [data])
  return (
    <> 
      <SearchBar text={text} setText={setText}/>
      {
        topics === undefined || topics.length === 0 ? <LoadingBox/> : 
        topics.map((e) => (
            text === "" || partialString(e.topic, text) ? <ContentBox key={e.topic} date={e.date} href={e.href} topic_text={e.topic} tags={e.tags} desc={e.desc}/> : null
          )
        )
      }
    </>
  )
}

export default ContentList