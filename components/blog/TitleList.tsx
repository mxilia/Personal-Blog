'use client'
import { useState } from "react"
import LoadingBox from "../misc/LoadingBox"
import TitleBox from "./TitleBox"
import { useBlogContext } from "@/context/BlogContext"

function TitleList(){
  const { hrefTitle, setTitle, allPosts } = useBlogContext()
  const [close, setClose] = useState(true)
  return (
    <>
      <div 
        className="flex justify-center select-none items-center translate-x-[-200px] transition-all duration-300 [@media(max-width:1154px)]:translate-x-[0px] z-20 text-[var(--header-text)] fixed bottom-4 left-4 bg-[var(--background)] border-[1px] border-[var(--border-block)] rounded-[50px] p-2 pt-1.5 pb-1.5 h-10 w-10"
        onClick={()=>{setClose(!close)}}
      >
        M
      </div>
      <div className={"text-[var(--text)] transition-all duration-300 [@media(min-width:1155px)]:translate-x-[0px] fixed h-screen border-r-[1px] z-5 border-[var(--border-block)] top-[65px] w-72 p-9 bg-[var(--background)] "+(close ? "translate-x-[-288px]" : "")}>
        {
         !allPosts || allPosts.length === 0 ? <LoadingBox></LoadingBox> :
         allPosts.map((e) => (
            <TitleBox key={e.order} classStr={"transition-all duration-200 origin-left text-[15px]" + (e.href === hrefTitle ? " scale-110 font-bold text-[var(--yellow)]" : " font-normal hover:text-[var(--hover-text)] hover:scale-110") } 
              clickHandler={() => {setTitle(e.href)}} 
              title={e.title} 
              subtopics={e.subtopics} 
              href={e.href} 
              order={e.order}
            />
          )
         )
        }
      </div>
      <div className={"opacity-80 bg-black w-[100vw] h-[100vh] fixed z-[2] [@media(min-width:1154px)]:hidden "+(close ? "hidden" : "block")} onClick={()=>{setClose(!close)}}></div>
    </>
  )
}

export default TitleList