'use client'
import ContentBox from "./ContentBox";
import { useEffect, useRef, useState } from "react";
import type { TopicMeta } from "@/types/TopicMeta";
import axios from "axios";
import LoadingBox from "../misc/LoadingBox";
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

const fetcher = async (url: string) => await axios.get(url).then(r => r.data);

function ContentList(){
  const [topics, setTopics] = useState<TopicMeta[]>([])
  const [text, setText] = useState("")
  const [filteredTopics, setFiltered] = useState<TopicMeta[]>([])
  const partialStringCount = (a : string, b : string) => {
    let minLength = Math.min(a.length, b.length), cnt=0
    for(let i=0;i<minLength;i++){
      if(a[i]===b[i]) cnt++
      else break
    }
    return cnt
  }
  const { data } = useSWR("/api/topics_meta", fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 600000,
  })
  useEffect(() => {
    if(data){
      setTopics(data)
      setFiltered(data)
    }
  }, [data])
  useEffect(() => {
    let maxPartial = 0
    topics.forEach((e) => {maxPartial = Math.max(maxPartial, partialStringCount(text, e.topic))})
    const filtered = text === "" ? topics : topics.filter((e) => (partialStringCount(text, e.topic) === maxPartial && maxPartial !== 0))
    console.log(text, filtered)
    setFiltered(filtered)
  }, [text])
  useEffect(() => {
    if(data) setFiltered(data)
  }, [])
  return (
    <> 
      <SearchBar text={text} setText={setText}/>
      {
        topics.length === 0 ? <LoadingBox/> : 
        filteredTopics.map((e) => (<ContentBox key={e.topic+"_searched"} date={e.date} href={e.href} topic_text={e.topic} tags={e.tags} desc={e.desc}/>))
      }
    </>
  )
}

export default ContentList