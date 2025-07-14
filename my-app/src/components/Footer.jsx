import React from 'react'

const Footer = () => {
  return (
    <div className=' flex flex-col justify-center items-center bg-blue-900 text-white text-center fixed bottom-0 w-full '>
    <div className='logo font-bold text-2xl text-white '>
    <span className='text-green-700'>&lt;</span>
   <span className='text-2xl text-white'>Pass</span>
    <span className=' text-green-700'>OP/&gt;</span>
    </div>
     <div>&copy; PassOp 2025</div>
    
    </div>
  )
}

export default Footer