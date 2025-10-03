'use client'
import LoadingBox from "./LoadingBox"
import TitleBox from "./TitleBox"
import { useBlogContext } from "@/context/BlogContext"

function TitleList(){
  const { hrefTitle, setTitle, allPosts } = useBlogContext()
  const clickHandler = (hrefTitle : string) => {
    setTitle(hrefTitle)
  }
  return (
    <>
      <div className="h-screen border-r-[1px] z-5 border-neutral-700 fixed top-[65px] w-80 p-10">
        {
         allPosts.length === 0 ? <LoadingBox></LoadingBox> :
         allPosts.map((e) => e.href === hrefTitle ? 
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