import React from 'react'
import { Link } from 'react-router-dom'

import HomePageImage from "../Assets/homePageMainImage.png"
import HomeLayout from '../Layouts/HomeLayout'
export default function HomePage() {
  return (
    <HomeLayout>
        <div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
            <div className='w-1/2 space-y-6'>
            <h1 className='text-5xl font-semibold'>
                Find out best <span className='text-yellow-500 font-bold'>
                     Online Courses </span>
            </h1>
            <p className='text-xl text-gray-200 '>
                We have a large library of courses taught by
                highly skilled and qualified faculties at  affordable price 
            </p>
            <div className='space-x-6'>
                <Link to="/courses">
                <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer transition-all ease-in-out hover:bg-yellow-600 duration-200'>
                    Explore courses
                </button>
                </Link>
                <Link to="/contact">
                <button className='hover:bg-yellow-600 border-solid border-[1px] border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer transition-all ease-in-out hover:bg-yellow-600 duration-200'>
                    Contact Us
                </button>
                </Link>

            </div>
            </div>
            <div className='w-1/2 flex items-center justify-center'>
            <img src={HomePageImage} alt="home page image" />
            </div>
        </div>
    </HomeLayout>
  )
}
