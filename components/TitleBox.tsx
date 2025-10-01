'use client';

import { useBlogContext } from "@/context/BlogContext";
import { type Heading } from "@/types/Post";
import { useEffect, useRef, useState } from "react";

function TitleBox({ classStr, clickHandler, title, subtopics, href } : { classStr: string, clickHandler : () => void, title : string, subtopics : Heading[], href : string }) {
  const { hrefTitle } = useBlogContext()
  const [showSubTopics, setShowSubTopics] = useState(false)
  const classArrow = "w-2 h-2 border-r-2 border-b-2 transition-all duration-200"
  const classArrowBox = "w-4 h-4"
  const subTopicsRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    if(subTopicsRef.current !== null) setHeight(subTopicsRef.current.scrollHeight)
  }, [subTopicsRef])
  useEffect(() => {
    if(href === hrefTitle) setShowSubTopics(true)
    console.log(href, hrefTitle, showSubTopics)
  }, [href, hrefTitle])
  return (
    <>
      <div className="flex justify-between items-center">
        <div className={classStr+" select-none break-words w-50"} onClick={() => {clickHandler(), setShowSubTopics(true)}}>{ title }</div>
        {
          showSubTopics === true  ? 
          <div onClick={() => {setShowSubTopics(false)}} className={classArrowBox}><div className={classArrow+" rotate-45"}></div></div> 
          : 
          <div onClick={() => {clickHandler(), setShowSubTopics(true)}} className={classArrowBox}><div className={classArrow+" rotate-[-45deg]"}></div></div>
        }
      </div>
      {
        <div className="ml-2 overflow-hidden transition-all duration-300" ref={subTopicsRef} style={{ maxHeight: showSubTopics ? `${height}px` : "0px" }}>
          {
            subtopics.map((e) => (<a href={"#"+e.id} key={e.id} onClick={clickHandler}><div className="select-none border-l-[1px] border-neutral-700 pl-2.5 transition-all duration-200 origin-left hover:text-neutral-50 text-neutral-300 p-[5px]">{ e.text }</div></a>))
          }
        </div>
      }
    </>
  )
}

export default TitleBox