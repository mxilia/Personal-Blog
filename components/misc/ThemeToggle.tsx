'use client';

import { useBlogContext } from '@/context/BlogContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useBlogContext()
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="text-[var(--text)] text-[15px]"
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  )
}