'use client';

import { useBlogContext } from "@/context/BlogContext";
import { type Heading } from "@/types/Post";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const classArrow = "w-2 h-2 border-r-2 border-b-2 transition-all duration-200"
const classArrowBox = "w-4 h-4"

function TitleBox({ classStr, title, subtopics, href, order } : { classStr: string, clickHandler : () => void, title : string, subtopics : Heading[], href : string, order : string }) {
  const { hrefTitle, curTopic, setShowSubTopics, allPosts } = useBlogContext()
  const idx = parseInt(order)-1
  const subTopicsRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    if(subTopicsRef.current !== null) setHeight(subTopicsRef.current.scrollHeight)
    if(href === hrefTitle) setShowSubTopics(idx, true)
  }, [subTopicsRef, hrefTitle])
  return (
    <>
      <div className="flex justify-between items-center">
        <Link href={`/blog/${curTopic}/${href}`}>
          <div className={classStr+" select-none break-words w-45"} onClick={() => {setShowSubTopics(idx, true)}}>{ title }</div>
        </Link>
        <div onClick={() => {setShowSubTopics(idx, !allPosts[idx].showSubTopics)}} className={classArrowBox}>
          <div className={classArrow + (allPosts[idx].showSubTopics === true ? " rotate-45" : " rotate-[-45deg]") + (href === hrefTitle ? " border-[var(--yellow)]" : "")}></div>
        </div> 
      </div>
      <div className="ml-2 overflow-hidden transition-all duration-300" ref={subTopicsRef} style={{ maxHeight: allPosts[idx].showSubTopics === true ? `${height}px` : "0px" }}>
        {
          subtopics.length === 0 ? null
          : subtopics.map((e) => (
            <Link href={`/blog/${curTopic}/${href}#${e.id}`} key={e.id}>
              <div className="select-none border-l-[1px] border-[var(--border-block)] text-[15px] pl-2.5 transition-all duration-200 origin-left hover:text-[var(--hover-text)] text-[var(--subtext-1)] p-[5px]">{ e.text }</div>
            </Link>
            )
          )
        }
      </div>
    </>
  )
}

export default TitleBox