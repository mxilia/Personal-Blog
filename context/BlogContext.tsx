'use client'
import { type Post } from "@/types/Post"
import { createContext, useContext, useState, ReactNode } from "react";

type BlogContextType = {
  hrefTitle: string,
  setTitle: (val: string) => void,
  contentHTML : string,
  setContentHTML : (val: string) => void,
  allPosts: Post[],
  setPosts : (val: Post[]) => void,
  idx : number,
  setIdx : (val: number) => void  
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogContextProvider({ children }: { children: ReactNode }){
  const [hrefTitle, setTitle] = useState<string>("overview")
  const [contentHTML, setContentHTML] = useState<string>("Loading")
  const [allPosts, setPosts] = useState<Post[]>([])
  const [idx, setIdx] = useState<number>(-100)
  return (
    <BlogContext.Provider value={{ hrefTitle, setTitle, contentHTML, setContentHTML, allPosts, setPosts, idx, setIdx }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext(){
  const context = useContext(BlogContext);
  if (!context) throw new Error("useContextBlog must be used inside BlogContextProvider.");
  return context;
}