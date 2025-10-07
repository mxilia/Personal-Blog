import Link from "next/link"

function TagBox( { text } : { text : string } ){
  return (
    <>
      <div className="border-[1px] p-[4px] pt-[1px] pb-[1px] border-[var(--yellow)] rounded-[6px] text-[12px] text-[var(--yellow)]">
        { text }
      </div>
    </>
  )
}


function ContentBox({ date, href, topic_text, tags, desc } : { date : string, href : string, topic_text : string, tags : string[], desc : string, key : string }){
  return (
    <Link href={"blog/"+href+"/overview"} prefetch>
      <div className="border-b-[1px] border-[var(--border-block)] pb-2 pt-2 pl-1.5 transition-colors duration-300 ease-in-out hover:bg-[var(--hover-bg)]">
        <div className="h-[14px] pl-0.5 text-[12px] text-[var(--sub-text2)]">{ date }</div>
        <div className="h-[22px] font-bold text-[18px] text-[var(--text)]">{ topic_text }</div>
        <div className="text-[14px] text-[var(--sub-text1)] mb-1.5"> { desc } </div>
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