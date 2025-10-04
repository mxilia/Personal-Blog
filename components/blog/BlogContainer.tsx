'use client'
import type { Post } from "@/types/Post";
import axios from "axios";
import { useEffect } from "react";
import LoadingBox from "../misc/LoadingBox";
import { useBlogContext } from "@/context/BlogContext";
import Link from "next/link";
import useSWR from "swr";

const fetcher = async (url: string) => await axios.get(url).then(r => r.data.posts);

function BlogBlock(){
  const { contentHTML } = useBlogContext()
  return (
    <div className="p-4 w-150 nice-scrollbar">
      {
        contentHTML === "Loading" ? 
        <LoadingBox></LoadingBox> : <div className="prose prose-slate dark:prose-invert" dangerouslySetInnerHTML={{ __html: contentHTML }}></div> 
      }
    </div>
  )
}

function BlogContainer({ topic, hrefTitle } : { topic : string, hrefTitle : string }){
  const { setTitle, setContentHTML, allPosts, setPosts, idx, setIdx, setTopic } = useBlogContext()
  const { data } = useSWR("/api/"+topic, fetcher, {
    revalidateOnFocus: false, 
    dedupingInterval: 600000,
  })
  useEffect(() => {
    if(allPosts.length) return
    if(data) setPosts(data)
  }, [data])
  useEffect(() => {
    setTitle(hrefTitle)
    const load = async () => { 
      setContentHTML("Loading")
      if(allPosts.length){
        const post : Post | undefined = allPosts.find((e) => e.href === hrefTitle)
        if(post === null || post === undefined){
          setContentHTML("Not Found")
          setIdx(-100)
        }
        else{
          setContentHTML(post.contentHTML)
          setIdx(parseInt(post.order)-1)
        }
        return
      } 
      try {
        let post : Post | null = null;
        const result = await axios.get("/api/"+topic+"/"+hrefTitle)
        if(result) post = result.data.post
        if(post === null || post === undefined){
          setContentHTML("Not Found")
          setIdx(-100)
        }
        else {
          setContentHTML(post.contentHTML)
          setIdx(parseInt(post.order)-1)
        }
      } catch(error) {
        console.log("Error fetching for post:", error)
        setContentHTML("Error")
        setIdx(-100)
      }
    }
    load()
  }, [hrefTitle])
  useEffect(() => {
    setTopic(topic)
    setTitle(hrefTitle)
  }, [])
  
  return (
    <>
      <div className="flex flex-col items-center mt-5 absolute top-20 left-[50%] translate-x-[-50%] pb-5 border-[1px] rounded-lg border-neutral-700">
        <BlogBlock></BlogBlock>
        <div className="flex w-full mt-5 border-neutral-700 justify-between pl-4 pr-4">
            {
              idx-1>=allPosts.length || idx-1<0 || !allPosts.length ? <div></div>:
              <Link href={`/blog/${topic}/${allPosts[idx-1].href}`}>
                <div  className="hover:text-amber-300 transition-all duration-300">
                  <div className="text-neutral-400 text-sm">Previous</div>
                  <div>{ allPosts[idx-1].title }</div>
                </div>
              </Link>
            }
            {
              idx+1>=allPosts.length || idx+1<0 || !allPosts.length ? <></>:
              <Link href={`/blog/${topic}/${allPosts[idx+1].href}`}>
                <div className="hover:text-amber-300 transition-all duration-300">
                  <div className="text-neutral-400 text-sm">Next</div>
                  <div>{ allPosts[idx+1].title }</div>
                </div>
              </Link>
            }
        </div>
      </div>
    </>
  )
}

export default BlogContainer