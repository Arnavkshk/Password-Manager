const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="flex justify-between items-center px-3 py-1 mycontainer">

        <div className="logo font-bold text-2xl">
          <span className="text-green-600"> &lt;</span>
          Password 
          <span className="text-green-600"> Manager/&gt;</span>
          </div>
        <button className="text-white flex border border-white rounded-md gap-3 px-8 py-1 hover:text-green-300">
          <img className="w-8" src="/icons/github.png" alt="gitHub" />
          <span className="font-bold m-auto">GitHub</span>
        </button>
        
      </div>
    </nav>
  )
}

export default Navbar

