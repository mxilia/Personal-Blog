import NavBar from "@/components/NavBar";
import TitleList from "@/components/TitleList";
import { BlogContextProvider } from "@/context/BlogContext";

export default function RootLayout({ children, } : Readonly<{ children: React.ReactNode; }>){
  return (
    <BlogContextProvider>
      {children}
    </BlogContextProvider>
  );
}
