'use client'
import type { Post } from "@/types/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import TitleList from "./TitleList";

function BlogBlock({ contentHTML } : { contentHTML : string }){
  return (
    <div className="border-[1px] border-neutral-700 p-4 rounded-lg">
      {
        contentHTML !== "" ? <div className="prose prose-slate dark:prose-invert" dangerouslySetInnerHTML={{ __html: contentHTML }}></div> : <div> Not found </div>
      }
    </div>
  )
}

function BlogContainer({ topic } : { topic : string }){
  const [hrefTitle, setTitle] = useState("overview")
  const [contentHTML, setContentHTML] = useState("Loading")
  const [allPosts, setPosts] = useState([])
  useEffect(() => {
    const load = async () => { 
      setContentHTML("Loading")
      const result = await axios.get("/api/"+topic+"/"+hrefTitle)
      const post : Post = result.data
      if(post === null) setContentHTML("")
      else setContentHTML(post.contentHTML)
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
      <TitleList hrefTitleSetter={setTitle} posts={allPosts}></TitleList>
      <div className="flex flex-col items-center mt-5 absolute top-20 left-[50%] translate-x-[-50%]">
        <BlogBlock contentHTML={contentHTML}></BlogBlock>
      </div>
    </>
  )
}

export default BlogContainer