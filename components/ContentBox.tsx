import Link from "next/link"

function TagBox( { text } : { text : string } ){
  return (
    <>
      <div className="border-[1px] pl-1 pr-1 pb-0.5 pt-0.5 border-amber-300 rounded-[6px] text-[14px] text-amber-300">
        { text }
      </div>
    </>
  )
}


function ContentBox({ date, href, topic_text, tags, desc } : { date : string, href : string, topic_text : string, tags : string[], desc : string, key : string }){
  return (
    <Link href={"blog/"+href+"/overview"}>
      <div className="border-b-[1px] border-neutral-700 pb-2 pt-2 pl-1.5 transition-colors duration-300 ease-in-out hover:bg-neutral-900">
        <div className="h-4 pl-0.5 text-sm text-neutral-400">{ date }</div>
        <div className="h-6.5 font-bold text-[20px]">{ topic_text }</div>
        <div className="text-[14px] text-neutral-300 mb-2"> { desc } </div>
        <div className="flex gap-1.5">
          { 
            tags.map(e => (<TagBox key={e} text={e}></TagBox>)) 
          }
        </div>
      </div>
    </Link>
  )
}

export default ContentBox