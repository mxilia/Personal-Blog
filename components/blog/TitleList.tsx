'use client'
import LoadingBox from "../misc/LoadingBox"
import TitleBox from "./TitleBox"
import { useBlogContext } from "@/context/BlogContext"

function TitleList(){
  const { hrefTitle, setTitle, allPosts } = useBlogContext()
  return (
    <>
      <div className="h-screen border-r-[1px] z-5 border-neutral-700 fixed top-[65px] w-80 p-10">
        {
         allPosts.length === 0 ? <LoadingBox></LoadingBox> :
         allPosts.map((e) => (
            <TitleBox key={e.order} classStr={"transition-all duration-200 origin-left" + (e.href === hrefTitle ? " scale-110 font-bold text-amber-300" : " font-normal hover:text-neutral-200 hover:scale-110") } 
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
    </>
  )
}

export default TitleList