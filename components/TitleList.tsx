'use client'
import type { Post } from "@/types/Post"
import { useEffect, useState } from "react"
import LoadingBox from "./LoadingBox"
import TitleBox from "./TitleBox"

function TitleList({ hrefTitle, hrefTitleSetter, posts, sub_topics } : { hrefTitle : string, hrefTitleSetter : (val: string) => void, posts : Post[], sub_topics : string[] }){
  const clickHandler = (hrefTitle : string) => {
    hrefTitleSetter(hrefTitle)
  }
  const [list, setList] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  console.log(posts)
  useEffect(() => {
    setLoading(true)
    const sortedPosts = [...posts].sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10));
    setList(sortedPosts)
    setLoading(false)
  }, [posts])
  return (
    <>
      <div className="h-screen border-r-[1px] z-5 border-neutral-700 fixed top-[65px] w-80 p-10">
        {
         loading === true ? <LoadingBox></LoadingBox> : list.length === 0 ? <div> Not found </div> :
         list.map((e) => e.href === hrefTitle ? 
          (<TitleBox key={e.order} classStr="transition-all duration-200 scale-110 origin-left font-bold text-yellow-200" clickHandler={() => clickHandler(e.href)} title={e.title} sub_topics={sub_topics}></TitleBox>)
          :
          (<TitleBox key={e.order} classStr="transition-all duration-200 origin-left hover:scale-110 hover:text-neutral-200 font-normal" clickHandler={() => clickHandler(e.href)} title={e.title} sub_topics={sub_topics}></TitleBox>)
         )
        }
      </div>
    </>
  )
}

export default TitleList