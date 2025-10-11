import NavBar from "@/components/blog/NavBar";
import TitleList from "@/components/blog/TitleList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Home page of mxilia's blog website",
  icons: {
    icon: '/kuromi.ico',
  }
}

export default function RootLayout({ children, } : Readonly<{ children: React.ReactNode; }>){
  return (
    <>
      <NavBar/>
      <TitleList/>
      {children}
    </>
  )
}
