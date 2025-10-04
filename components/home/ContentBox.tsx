import Link from "next/link"

function TagBox( { text } : { text : string } ){
  return (
    <>
      <div className="border-[1px] p-[4px] pt-[1px] pb-[1px] border-amber-300 rounded-[6px] text-[12px] text-amber-300">
        { text }
      </div>
    </>
  )
}


function ContentBox({ date, href, topic_text, tags, desc } : { date : string, href : string, topic_text : string, tags : string[], desc : string, key : string }){
  return (
    <Link href={"blog/"+href+"/overview"}>
      <div className="border-b-[1px] border-neutral-700 pb-2 pt-2 pl-1.5 transition-colors duration-300 ease-in-out hover:bg-neutral-900">
        <div className="h-[14px] pl-0.5 text-[12px] text-neutral-400">{ date }</div>
        <div className="h-[22px] font-bold text-[18px]">{ topic_text }</div>
        <div className="text-[14px] text-neutral-300 mb-1.5"> { desc } </div>
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