import React from 'react'

const Navbar = () => {
  return (
    <>
    <div className="box flex  h-8 bg-red-500  justify-around items-center  ">
    <div className="logo py-[34px]">
        iTask
    </div>
    <div className="tag">
        <ul className='flex gap-8'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>Your Tasks</li>
        </ul>
    </div>
    </div>
    </>
  )
}

export default Navbar