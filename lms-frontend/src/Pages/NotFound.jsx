import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()
  return (
    <div className='h-screen bg-[#1A2238] w-full flex flex-col justify-center items-center'>
      <h1 className='text-9xl font-extrabold text-white tracking-widest'>
        404
      </h1>
      <div className="bg-black text-white px-2 text-sm rotate-12 absolute">
        page not found ...
      </div>
      <button className='mt-5 border-[#ff6a3d]'>
        <a className='relative inline-block text-sm font-medius text-[#ff6a3d]  group active:text-yellow-500 focus:outline-none focus:ring' href="">
        <span onClick={()=>navigate(-1)} className='relative block px-8 py-3 border-current  '>
            Go Back
        </span>
        </a>
      
      </button>
    </div>
  )
}
