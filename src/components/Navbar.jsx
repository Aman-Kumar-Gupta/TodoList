import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 shadow-lg'>
      <div className="logo">
        <span className='font-extrabold text-2xl tracking-tight'>TaskManager</span>
      </div>
      <ul className="flex gap-8">
        <li className='cursor-pointer hover:text-blue-200 hover:scale-105 transform transition-all duration-200 font-medium'>Home</li>
        <li className='cursor-pointer hover:text-blue-200 hover:scale-105 transform transition-all duration-200 font-medium'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar