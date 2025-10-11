import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import postService from "@/services/PostService";
import { WebContextProvider } from "@/context/WebContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of mxilia's blog website",
  icons: {
    icon: '/kuromi.ico',
  }
}

export default function RootLayout({ children, } : Readonly<{ children: React.ReactNode; }>){
  const load = (async () => {
    await postService.loadAll()
    console.log("Loaded Successfully")
  })
  load()
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>  
        <WebContextProvider>
          {children}
        </WebContextProvider>
      </body>
    </html>
  );
}
