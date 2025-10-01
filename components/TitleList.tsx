'use client'
import { type Heading, type Post } from "@/types/Post"
import { useContext, useEffect, useState } from "react"
import LoadingBox from "./LoadingBox"
import TitleBox from "./TitleBox"

function TitleList({ hrefTitle, hrefTitleSetter, posts } : { hrefTitle : string, hrefTitleSetter : (val: string) => void, posts : Post[] }){
  const clickHandler = (hrefTitle : string) => {
    hrefTitleSetter(hrefTitle)
  }
  const [list, setList] = useState<Post[]>([])
  useEffect(() => {
    setList(posts)
  }, [posts])
  return (
    <>
      <div className="h-screen border-r-[1px] z-5 border-neutral-700 fixed top-[65px] w-80 p-10">
        {
         list.length === 0 ? <LoadingBox></LoadingBox> :
         list.map((e) => e.href === hrefTitle ? 
          (<TitleBox key={e.order} classStr="transition-all duration-200 scale-110 origin-left font-bold text-amber-300" clickHandler={() => clickHandler(e.href)} title={e.title} subtopics={e.subtopics} href={e.href}></TitleBox>)
          :
          (<TitleBox key={e.order} classStr="transition-all duration-200 origin-left hover:scale-110 hover:text-neutral-200 font-normal" clickHandler={() => clickHandler(e.href)} title={e.title} subtopics={e.subtopics} href={e.href}></TitleBox>)
         )
        }
      </div>
    </>
  )
}

export default TitleList