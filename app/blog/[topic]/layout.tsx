import NavBar from "@/components/blog/NavBar";
import TitleList from "@/components/blog/TitleList";
import { BlogContextProvider } from "@/context/BlogContext";

export default function RootLayout({ children, } : Readonly<{ children: React.ReactNode; }>){
  return (
    <BlogContextProvider>
      <NavBar/>
      <TitleList/>
      {children}
    </BlogContextProvider>
  );
}
