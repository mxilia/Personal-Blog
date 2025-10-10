'use client';

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../misc/ThemeToggle";

function NavBar(){
  return (
    <nav className="select-none flex items-center justify-between w-full p-[18px] pl-18 pr-27 bg-[var(--nav-bg)] backdrop-blur-lg border-b-[1px] z-10 transition-background border-[var(--border-block)] fixed top-0 left-0 [@media(max-width:676px)]:pl-8 [@media(max-width:676px)]:pr-10">
      <Link href="/" className="gap-5 flex items-center" prefetch>
        <Image alt="img not available" width={32} height={32} className="rounded-[50px] object-cover" src="/kuromi.jpg"/>
        <div className="font-serif font-medium text-lg hover-bigger text-[var(--text)]"> mxilia </div>
      </Link>
      <div className="flex gap-15 [@media(max-width:676px)]:gap-7"> 
        <ThemeToggle/>
        <Link href="/" prefetch><div className="hover-bigger text-[15px] text-[var(--text)]"> Home </div></Link>
        <a href="https://github.com/mxilia" target="_blank"><div className="hover-bigger text-[var(--text)] text-[15px]"> Github </div> </a>
      </div>
    </nav>
  )
}

export default NavBar