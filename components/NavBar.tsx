'use client';

function NavBar(){
  return (
    <nav className="select-none flex items-center justify-between w-full p-5 pl-20 pr-30 bg-[#090909] border-b-[1px] z-10 border-neutral-700 fixed top-0 left-0">
      <a href="/" className="gap-5 flex items-center">
        <img className="w-9 h-9 rounded-[50px] object-cover" src="/kuromi.jpg"></img>
        <div className="font-serif font-medium text-xl hover-bigger"> mxilia </div>
      </a>
      <div className="flex gap-15"> 
        <a href="/"><div className="hover-bigger"> Home </div></a>
        <a href="https://github.com/mxilia" target="_blank"><div className="hover-bigger"> Github </div> </a>
      </div>
    </nav>
  )
}

export default NavBar