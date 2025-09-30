import type { Post } from "@/types/Post"

function TitleList({ hrefTitleSetter, posts } : { hrefTitleSetter : (val: string) => void, posts : Post[] }){
  return (
    <>
      <div className="h-screen border-r-[1px] z-5 border-neutral-700 fixed top-[65px] w-50">

      </div>
    </>
  )
}

export default TitleList