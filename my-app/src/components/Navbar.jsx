import React from 'react'

const Navbar = () => {
  return (
  <nav className='bg-blue-950 text-white'>
  <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
   <div className='logo font-bold text-2xl text-white'>
    <span className='text-green-700'>&lt;</span>
   <span className='text-2xl text-white'>Pass</span>
    <span className=' text-green-700'>OP/&gt;</span>
    </div>
    <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold'  href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
        </li>
    </ul>
    <button className='text-black bg-white my-5 rounded-full flex
    justify-between items-center'>
<img className=' w-10 p1 rounded-full' src="/github.png" alt="" />
<span className='font-bold px-2'><a href="https://github.com/Janhavirase/passwordOP">Github</a></span>
    </button>
    </div>
   </nav>
  )
}

export default Navbar 