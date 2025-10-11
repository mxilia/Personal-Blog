'use client'
import { TopicMeta } from "@/types/TopicMeta";
import { createContext, useContext, useState, ReactNode, useEffect, useRef } from "react";

type WebContextType = {
  theme: string,
  setTheme: (val: 'light' | 'dark') => void,
  topics: TopicMeta[], 
  setTopics: (val: TopicMeta[]) => void
};

const WebContext = createContext<WebContextType | undefined>(undefined);

export function WebContextProvider({ children }: { children: ReactNode }){
  const [theme, setTheme] = useState<'light'|'dark'>('dark')
  const [topics, setTopics] = useState<TopicMeta[]>([])
  const initialized = useRef(false)
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
    <WebContext.Provider value={{ theme, setTheme, topics, setTopics }}>
      {children}
    </WebContext.Provider>
  );
}

export function useWebContext(){
  const context = useContext(WebContext);
  if (!context) throw new Error("useWebContext must be used inside WebContextProvider.");
  return context;
}