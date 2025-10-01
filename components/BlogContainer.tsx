'use client'
import type { Post } from "@/types/Post";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import TitleList from "./TitleList";
import LoadingBox from "./LoadingBox";
import { createContext } from "vm";
import { useBlogContext } from "@/context/BlogContext";

const BlogContext = createContext()

function BlogBlock({ contentHTML } : { contentHTML : string }){
  return (
    <div className="p-4 w-150 nice-scrollbar">
      {
        contentHTML === "" ? <div> Not found </div> : contentHTML === "Loading" ? 
        <LoadingBox></LoadingBox> : <div className="prose prose-slate dark:prose-invert" dangerouslySetInnerHTML={{ __html: contentHTML }}></div> 
      }
    </div>
  )
}

function BlogContainer({ topic } : { topic : string }){
  const { hrefTitle, setTitle, contentHTML, setContentHTML, allPosts, setPosts, idx, setIdx } = useBlogContext()
  useEffect(() => {
    const load = async () => { 
      setContentHTML("Loading")
      if(allPosts.length !==0){
        const post : Post | undefined = allPosts.find((e) => e.href === hrefTitle)
        if(post === undefined){
          setContentHTML("")
          setIdx(-100)
        }
        else{
          setContentHTML(post.contentHTML)
          setIdx(parseInt(post.order)-1)
        }
        return
      }
      const result = await axios.get("/api/"+topic+"/"+hrefTitle)
      const post : Post = result.data
      if(post === null){
        setContentHTML("")
        setIdx(-100)
      }
      else {
        setContentHTML(post.contentHTML)
        setIdx(parseInt(post.order)-1)
      }
    }
    load()
  }, [hrefTitle])
  useEffect(() => {
    const load = async () => {
      const result = await axios.get("/api/"+topic)
      const posts = result.data.sort((a : Post, b : Post) => parseInt(a.order, 10) - parseInt(b.order, 10))
      setPosts(posts)
    }
    load()
  }, [])
  return (
    <>
      <TitleList hrefTitle={hrefTitle} hrefTitleSetter={setTitle} posts={allPosts}></TitleList>
      <div className="flex flex-col items-center mt-5 absolute top-20 left-[50%] translate-x-[-50%] pb-5 border-[1px] rounded-lg border-neutral-700">
        <BlogBlock contentHTML={contentHTML}></BlogBlock>
        <div className="flex w-full mt-5 border-neutral-700 justify-between pl-4 pr-4">
            {
              idx-1>=allPosts.length || idx-1<0 ? <div></div>:
              <div onClick={() => setTitle(allPosts[idx-1].href)} className="hover:text-amber-300 transition-all duration-300">
                <div className="text-neutral-400 text-sm">Previous</div>
                <div>{ allPosts[idx-1].title }</div>
              </div>
            }
            {
              idx+1>=allPosts.length || idx+1<0 ? <></>:
              <div onClick={() => setTitle(allPosts[idx+1].href)} className="hover:text-amber-300 transition-all duration-300">
                <div className="text-neutral-400 text-sm">Next</div>
                <div>{ allPosts[idx+1].title }</div>
              </div>
            }
        </div>
      </div>
    </>
  )
}

export default BlogContainer