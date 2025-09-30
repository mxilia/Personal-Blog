'use client';
import TopicText from "./TopicText";

function ProfileContainer(){
  return (
    <div className="w-full h-fit p-5 pt-10 pb-0">
      <div className="flex gap-2 justify-evenly items-center mb-5">
        <img className="w-17 h-17 border-2 border-neutral-400 rounded-[50px] object-cover" src="/kuromi.jpg"></img>
        <span className="w-135 border-2 border-neutral-600 p-2 rounded-2xl font-[monospace]">
          This app is made as a platform to share my knowledge on certain things, I'm certain about. I hope you enjoy it!
        </span>
      </div>
      <TopicText text="About Me"></TopicText>
      <div>
        Hello, my name is Ravint Kosol. I love coding, so I created this site to share what I’ve learned and what I’m interested in with others.
        If you wish to know more about me, you can checkout my <a className="text-blue-400 hover:underline" href="https://symoney.vercel.app/" target="_blank">portfolio website</a>.
      </div>
    </div>
  )
}

export default ProfileContainer