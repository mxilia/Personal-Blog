'use client';
import TopicText from "../misc/TopicText";
import Image from "next/image";

function ProfileContainer(){
  return (
    <div className="h-fit p-5 pt-10 pb-0">
      <div className="flex gap-2 items-center mb-5">
        <Image alt="img not available" width={48} height={48} className="border-2 border-neutral-400 rounded-[50px] object-cover" src="/kuromi.jpg"/>
        <span className="flex flex-1 border-2 border-neutral-600 p-2 rounded-2xl text-xs font-[monospace]">
          {"This app is made as a platform to share my knowledge on certain things, I'm certain about. I hope you enjoy it!"}
        </span>
      </div>
      <TopicText text="About Me"></TopicText>
      <div className="text-sm">
        {"Hello, my name is Ravint Kosol. I love coding, so I created this site to share what I’ve learned and what I’m interested in with others. If you wish to know more about me, you can checkout my"} 
        <a className="text-blue-400 hover:underline" href="https://symoney.vercel.app/" target="_blank"> {"portfolio website."} </a>
      </div>
    </div>
  )
}

export default ProfileContainer