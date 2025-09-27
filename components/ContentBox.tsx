function TagBox( { text } : { text : string } ){
  return (
    <>
      <div className="border-2 w-12 pl-1 pr-1 border-neutral-400 rounded-[8px] text-[14px]">
        { text }
      </div>
    </>
  )
}


function ContentBox({ date, topic_text, tags, desc} : { date : string, topic_text : string, tags : string[], desc : string}){
  return (
    <div className="border-b-2 border-neutral-500 pb-2 pt-2">
      <div className="h-4 pl-0.5 text-sm text-neutral-400">{ date }</div>
      <div className="h-6.5 font-bold text-[20px]">{ topic_text }</div>
      <div className="text-[14px] text-neutral-300 mb-2"> { desc } </div>
      <div className="flex gap-1.5">
        { 
          tags.map(e => (<TagBox key={e} text={e}></TagBox>)) 
        }
      </div>
    </div>
  )
}

export default ContentBox