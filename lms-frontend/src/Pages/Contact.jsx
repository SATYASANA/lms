import React, { useState } from 'react'

import HomeLayout from '../Layouts/HomeLayout'
import toast from 'react-hot-toast'
import { isValidEmail } from '../Helpers/regexMatcher'
import axiosInstance from '../Helpers/axiosInstance'

export default function Contact() {
    const [userInput,setUserInput] = useState({
        name:"",
        email:"",
        message:""
    })

    function handleUserInput(e){
        const {name,value} = e.target
        setUserInput({
            ...userInput,
            [name]:value
        })

    }

    async function  onFormSubmit(e) {
        e.preventDefault()
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("please fill all the field");
            return
        }
        if(!isValidEmail(userInput.email)){
            toast.error("Invalid email id");
            return
        }
        if(userInput.name.length<5){
            toast.error("Name should be more than or equal to five character long ");
            return;
        }
        try {
            const response = axiosInstance.post("/contact",userInput);
            toast.promise(response,{
                loading:"submitting the message",
                success:"message submitted successfully",
                error:"failed to submit form"
            })
            const contactResponse = await response
            if(contactResponse?.data?.success){
                setUserInput({
                    name:"",
                    email:"",
                    message:""
                })
            }

        } catch (error) {
            
            toast(error?.response?.data?.message)
        }
        
    }
  return (
    <HomeLayout>
    <div className="flex items-center justify-center h-[100vh]">
        <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 w-[22rem] rounded-md text-white shadow-[0_0_10px_black] ">
            <h1 className="text-3xl font-semibold">Contact form</h1>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="name" className="text-xl font-semibold">
                    Name
                </label>
                <input 
                    id="name"
                    className="bg-transparent border px-2 py-1 rounded-sm text-white"
                    type="text"
                    placeholder="enter your name"
                    name="name"
                    onChange={handleUserInput}
                    value={userInput.name}
                   
                />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="email" className="text-xl font-semibold">
                    Email
                </label>
                <input 
                    id="email"
                    className="bg-transparent border px-2 py-1 rounded-sm text-white"
                    type="email"
                    placeholder="enter your email"
                    name="email"
                    onChange={handleUserInput}
                    value={userInput.email}
                 
                />
            </div>
            <div className="flex flex-col gap-1 w-full">
                <label htmlFor="message" className="text-xl font-semibold">
                    Message
                </label>
                <textarea 
                    id="message"
                    className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40 text-white"
                    type="text"
                    placeholder="enter your message"
                    name="message"
                    onChange={handleUserInput}
                    value={userInput.message}
                />
            </div>
            <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                Submit
            </button>
        </form>
    </div>
</HomeLayout>
  )
}
