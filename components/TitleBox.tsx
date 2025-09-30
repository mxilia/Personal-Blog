'use client';

function TitleBox({ classStr, clickHandler, title, sub_topics } : { classStr: string, clickHandler : () => void, title : string, sub_topics : string[] }) {
  return (
    <>
      <div className={classStr} onClick={clickHandler}>{ title }</div>
      <div className="ml-2">
        {
          sub_topics.map((e) => (<div key={e} className="border-l-[1px] border-neutral-700 pl-2.5 transition-all duration-200 origin-left hover:text-neutral-400">{ e }</div>))
        }
      </div>
    </>
  )
}

export default TitleBox