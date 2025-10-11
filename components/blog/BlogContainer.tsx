'use client'
import type { Post } from "@/types/Post";
import { useEffect } from "react";
import LoadingBox from "../misc/LoadingBox";
import { useBlogContext } from "@/context/BlogContext";
import Link from "next/link";
import { fetcher } from "@/services/Fetcher";

function BlogBlock({ topic } : { topic : string }){
  const { contentHTML, allPosts, curTopic } = useBlogContext()
  return (
    <div className="p-[14px] w-full nice-scrollbar">
      {
        !allPosts ? <>Not Found</> : contentHTML === "Loading" || topic !== curTopic ? 
        <LoadingBox/> : <div className="prose prose-slate dark:prose-invert transition-background" dangerouslySetInnerHTML={{ __html: contentHTML }}></div> 
      }
    </div>
  )
}

function BlogContainer({ topic, href } : { topic : string, href : string }){
  const { setTitle, setContentHTML, allPosts, setPosts, idx, setIdx, curTopic, setTopic } = useBlogContext()
  useEffect(() => {
    setTitle(href)
    setContentHTML("Loading")
    if(allPosts && allPosts.length){
      const post : Post | undefined = allPosts.find((e) => e.href === href)
      if(!post){
        setContentHTML("Not Found")
        setIdx(-100)
      }
      else {
        setContentHTML(post.contentHTML)
        setIdx(parseInt(post.order)-1)
      }
      return
    }
    const load = async () => {
      const data = await fetcher("/api/"+topic+"/"+href)
      console.log("fetch", topic, href, data)
      if(data) setContentHTML(data?.post?.contentHTML ?? data.error)
    }
    load()
  }, [href])
  useEffect(() => {
    if(allPosts && allPosts.length && topic === curTopic) return
    setPosts([])
    setContentHTML("Loading")
    const load = async () => {
      const data = await fetcher("/api/"+topic)
      console.log(data)
      if(data) setPosts(data.posts)
      setTopic(topic)
    }
    setContentHTML("Loading")
    load()
  }, [topic])
  return (
    <>
      <div className="flex flex-col items-center transition-background mt-5 pb-4.5 border-[1px] rounded-lg border-[var(--border-block)] w-[calc(100%-26px)] [@media(min-width:590px)]:w-140 h-fit">
        <BlogBlock topic={topic}/>
        <div className="flex w-full mt-5 border-[var(--border-block)] justify-between pl-4 pr-4">
            {
              !allPosts || idx-1>=allPosts.length || idx-1<0 ? <div></div>:
              <Link href={`/blog/${topic}/${allPosts[idx-1].href}`} prefetch>
                <div  className="hover:text-[var(--yellow)] transition-all duration-300">
                  <div className="text-[var(--sub-text2)] text-[13px]">Previous</div>
                  <div className="text-[15px] text-[var(--text)]">{ allPosts[idx-1].title }</div>
                </div>
              </Link>
            }
            {
              !allPosts || idx+1>=allPosts.length || idx+1<0 ? <></>:
              <Link href={`/blog/${topic}/${allPosts[idx+1].href}`} prefetch>
                <div className="hover:text-[var(--yellow)] transition-all duration-300">
                  <div className="text-[var(--sub-text2)] text-[13px]">Next</div>
                  <div className="text-[15px] text-[var(--text)]">{ allPosts[idx+1].title }</div>
                </div>
              </Link>
            }
        </div>
      </div>
    </>
  )
}

export default BlogContainer