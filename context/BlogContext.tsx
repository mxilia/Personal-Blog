'use client'
import { type Post } from "@/types/Post"
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";

type BlogContextType = {
  hrefTitle: string,
  setTitle: (val: string) => void,
  contentHTML : string,
  setContentHTML : (val: string) => void,
  allPosts: Post[],
  setPosts : (val: Post[]) => void,
  idx : number,
  setIdx : (val: number) => void
  curTopic : string,
  setTopic : (val: string) => void
  theme: string,
  setTheme: (val: 'light' | 'dark') => void,
  setShowSubTopics : (idx : number, val : boolean) => void
  
};

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogContextProvider({ children }: { children: ReactNode }){
  const [hrefTitle, setTitle] = useState<string>("overview")
  const [contentHTML, setContentHTML] = useState<string>("Loading")
  const [allPosts, setPosts] = useState<Post[]>([])
  const [idx, setIdx] = useState<number>(-100)
  const [curTopic, setTopic] = useState("")
  const [theme, setTheme] = useState<'light'|'dark'>('dark')
  const initialized = useRef(false)
  const setShowSubTopics = (idx : number, val : boolean) => {
    setPosts(prev => {
      if (idx < 0 || idx >= prev.length) return prev;
      return [
        ...prev.slice(0, idx),
        { ...prev[idx], showSubTopics: val },
        ...prev.slice(idx + 1),
      ]
    })
  }
  useEffect(() => {
    if(!initialized.current) return
    document.documentElement.setAttribute('data-theme', theme)
    sessionStorage.setItem('data-theme', theme)
  }, [theme])
  useEffect(() => {
    if(typeof window !== 'undefined'){
      const theme = sessionStorage.getItem('data-theme') ?? 'dark'
      if(theme !== 'dark' && theme !== 'light') setTheme('dark')
      else setTheme(theme)
    }
    initialized.current = true
  }, [])
  return (
    <BlogContext.Provider value={{ hrefTitle, setTitle, contentHTML, setContentHTML, allPosts, setPosts, idx, setIdx, curTopic, setTopic, theme, setTheme, setShowSubTopics }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext(){
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlogContext must be used inside BlogContextProvider.");
  return context;
}

function Ref(arg0: boolean) {
  throw new Error("Function not implemented.");
}
