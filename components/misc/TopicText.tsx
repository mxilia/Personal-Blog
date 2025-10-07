function TopicText({ text } : { text : string}){
  return (
    <>
      <h1 className="text-[22px] font-bold text-[var(--text)]"> {text} </h1>
    </>
  )
}

export default TopicText