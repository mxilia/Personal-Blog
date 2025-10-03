'use client';

import { useBlogContext } from "@/context/BlogContext";
import { type Heading } from "@/types/Post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function TitleBox({ classStr, title, subtopics, href } : { classStr: string, clickHandler : () => void, title : string, subtopics : Heading[], href : string }) {
  const { hrefTitle, curTopic } = useBlogContext()
  const [showSubTopics, setShowSubTopics] = useState(false)
  const classArrow = "w-2 h-2 border-r-2 border-b-2 transition-all duration-200"
  const classArrowBox = "w-4 h-4"
  const subTopicsRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    if(subTopicsRef.current !== null) setHeight(subTopicsRef.current.scrollHeight)
  }, [subTopicsRef])
  const router = useRouter()
  return (
    <>
      {/* <Link href={`/blog/${curTopic}/${href}`}> */}
        <div className="flex justify-between items-center">
          <div className={classStr+" select-none break-words w-50"} onClick={() => {
            setShowSubTopics(true);
            // router.push(`/blog/${curTopic}/${href}`);
          }}>{ title }</div>
          {
            showSubTopics === true  ? 
            <div onClick={() => {setShowSubTopics(false)}} className={classArrowBox}><div className={classArrow + " rotate-45" + (href === hrefTitle ? " border-amber-300" : "")}></div></div> 
            : 
            <div onClick={() => {setShowSubTopics(true)}} className={classArrowBox}><div className={classArrow + " rotate-[-45deg]" + (href === hrefTitle ? " border-amber-300" : "")}></div></div>
          }
        </div>
      {/* </Link> */}
      {
        <div className="ml-2 overflow-hidden transition-all duration-300" ref={subTopicsRef} style={{ maxHeight: showSubTopics ? `${height}px` : "0px" }}>
          {
            subtopics.map((e) => (<a href={"#"+e.id} key={e.id}><div className="select-none border-l-[1px] border-neutral-700 pl-2.5 transition-all duration-200 origin-left hover:text-neutral-50 text-neutral-300 p-[5px]">{ e.text }</div></a>))
          }
        </div>
      }
    </>
  )
}

export default TitleBox