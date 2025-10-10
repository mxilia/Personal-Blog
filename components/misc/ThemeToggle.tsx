'use client';

import { useBlogContext } from '@/context/BlogContext';
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useBlogContext()
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-[var(--text)] text-[15px]"
    >
    {
      theme !== 'light' ? 
      <Image alt="img not available" width={18} height={18} className="invert-100" src="/sun_icon.png"/> : 
      <Image alt="img not available" width={18} height={18} src="/moon_icon.png"/>
    }
    </button>
  )
}