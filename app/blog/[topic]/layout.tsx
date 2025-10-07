import NavBar from "@/components/blog/NavBar";
import TitleList from "@/components/blog/TitleList";

export default function RootLayout({ children, } : Readonly<{ children: React.ReactNode; }>){
  return (
    <>
      <NavBar/>
      <TitleList/>
      {children}
    </>
  )
}
