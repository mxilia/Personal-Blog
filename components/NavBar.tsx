
function NavBar(){
  return (
    <nav className="flex justify-between w-full p-5 pl-10 pr-30 bg-[#090909] border-b-[1px] z-10 border-neutral-700 fixed top-0 left-0">
      <div> symoney </div>
      <div className="flex gap-15"> 
        <a href="/"><div> Home </div></a>
        <a href="https://github.com/mxilia" target="_blank"><div> Github </div> </a>
      </div>
    </nav>
  )
}

export default NavBar