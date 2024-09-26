import {BsFacebook,BsInstagram,BsLinkedin, BsTwitter } from 'react-icons/bs'

export default function Footer() {
    const currentDate = new Date()

    const year = currentDate.getFullYear();
  return (
    <>
    <footer className='relative left-0 bottom-0 h-[10vh] py-5 sm:px-20 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 '>
        <section className='text-lg'>
            copyright {year} | All rights reserved

        </section>
        <section className='flex items-center justify-center gap-5 text-2xl text-white'>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="">
                <BsFacebook/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="">
                <BsLinkedin/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="">
                <BsInstagram/>
            </a>
            <a className='hover:text-yellow-500 transition-all ease-in-out duration-300' href="">
                <BsTwitter/>
            </a>
        </section>
    </footer>
    </>
  )
}
