'use client'
import type { Post } from "@/types/Post";
import { useEffect } from "react";
import LoadingBox from "../misc/LoadingBox";
import { useBlogContext } from "@/context/BlogContext";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/services/Fetcher";

function BlogBlock(){
  const { contentHTML } = useBlogContext()
  return (
    <div className="p-[14px] w-full nice-scrollbar">
      {
        contentHTML === "Loading" ? 
        <LoadingBox/> : <div className="prose prose-slate dark:prose-invert transition-background" dangerouslySetInnerHTML={{ __html: contentHTML }}></div> 
      }
    </div>
  )
}

function BlogContainer({ topic, hrefTitle } : { topic : string, hrefTitle : string }){
  const { setTitle, setContentHTML, allPosts, setPosts, idx, setIdx, setTopic } = useBlogContext()
  const { data: posts, isLoading: postsLoading } = useSWR("/api/"+topic, fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 600000,
  })
  const { data: post, isLoading: postLoading } = useSWR("/api/"+topic+"/"+hrefTitle, fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 600000,
  })
  useEffect(() => {
    if(allPosts.length) return
    if(posts) setPosts(posts.posts)
  }, [posts, postsLoading])
  useEffect(() => {
    setTitle(hrefTitle)
    setContentHTML("Loading")
    if(allPosts.length){
      const post : Post | undefined = allPosts.find((e) => e.href === hrefTitle)
      if(post === null || post === undefined){
        setContentHTML("Not Found")
        setIdx(-100)
      }
      else {
        setContentHTML(post.contentHTML)
        setIdx(parseInt(post.order)-1)
      }
      return
    }
    if(postLoading) return
    if(post === null || post === undefined){
      setContentHTML("Not Found")
      setIdx(-100)
    }
    else {
      setContentHTML(post.post.contentHTML)
      setIdx(parseInt(post.post.order)-1)
    }
  }, [hrefTitle, postLoading])
  useEffect(() => {
    setTopic(topic)
    setTitle(hrefTitle)
  }, [])
  return (
    <>
      <div className="flex flex-col items-center transition-background mt-5 pb-4.5 border-[1px] rounded-lg border-[var(--border-block)] w-[calc(100%-26px)] [@media(min-width:590px)]:w-140 h-fit">
        <BlogBlock/>
        <div className="flex w-full mt-5 border-[var(--border-block)] justify-between pl-4 pr-4">
            {
              idx-1>=allPosts.length || idx-1<0 || !allPosts.length ? <div></div>:
              <Link href={`/blog/${topic}/${allPosts[idx-1].href}`} prefetch>
                <div  className="hover:text-[var(--yellow)] transition-all duration-300">
                  <div className="text-[var(--sub-text2)] text-[13px]">Previous</div>
                  <div className="text-[15px] text-[var(--text)]">{ allPosts[idx-1].title }</div>
                </div>
              </Link>
            }
            {
              idx+1>=allPosts.length || idx+1<0 || !allPosts.length ? <></>:
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