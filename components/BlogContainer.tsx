'use client'
import type { Post } from "@/types/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import TitleList from "./TitleList";
import LoadingBox from "./LoadingBox";

function BlogBlock({ contentHTML } : { contentHTML : string }){
  return (
    <div className="border-[1px] border-neutral-700 p-4 rounded-lg w-150 nice-scrollbar">
      {
        contentHTML === "" ? <div> Not found </div> : contentHTML === "Loading" ? 
        <LoadingBox></LoadingBox> : <div className="prose prose-slate dark:prose-invert" dangerouslySetInnerHTML={{ __html: contentHTML }}></div> 
      }
    </div>
  )
}

function BlogContainer({ topic } : { topic : string }){
  const [hrefTitle, setTitle] = useState<string>("overview")
  const [contentHTML, setContentHTML] = useState<string>("Loading")
  const [sub_topics, setSubTopics] = useState<string[]>([])
  const [allPosts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const load = async () => { 
      setContentHTML("Loading")
      if(allPosts.length !==0){
        const post : Post | undefined = allPosts.find((e) => e.href === hrefTitle)
        if(post === undefined){
          setContentHTML("")
          setSubTopics([])
        }
        else{
          setContentHTML(post.contentHTML)
          setSubTopics(post.subtopics)
        }
        return
      }
      const result = await axios.get("/api/"+topic+"/"+hrefTitle)
      const post : Post = result.data
      if(post === null){
        setContentHTML("")
        setSubTopics([])
      }
      else {
        setContentHTML(post.contentHTML)
        setSubTopics(post.subtopics)
      }
    }
    load()
  }, [hrefTitle])
  useEffect(() => {
    const load = async () => {
      const result = await axios.get("/api/"+topic)
      const posts = result.data
      setPosts(posts)
    }
    load()
  }, [])
  return (
    <>
      <TitleList hrefTitle={hrefTitle} hrefTitleSetter={setTitle} posts={allPosts} sub_topics={sub_topics}></TitleList>
      <div className="flex flex-col items-center mt-5 absolute top-20 left-[50%] translate-x-[-50%]">
        <BlogBlock contentHTML={contentHTML}></BlogBlock>
      </div>
    </>
  )
}

export default BlogContainer