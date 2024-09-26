import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
import { login } from '../Redux/Slices/AuthSlice'

export default function Login() {
  

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({

        email:"",
        password:"",
  
    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }
  
   async function  onLogin(event){
event.preventDefault();
if(!loginData.email ||  !loginData.password ){
    toast.error("please fill all the details")
    return;
}




//dispatch create account action
const response = await dispatch(login(loginData))

if(response?.payload?.success){
    navigate("/")
}

setLoginData({
   
        email:"",
        password:"",
       
})

   }
  return (
<HomeLayout>
<div className='flex items-center justify-center h-[90vh]'>
    <form onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]' noValidate >
        <h1 className='text-center text-2xl font-bold'>Login Page</h1>
 

<div className='flex flex-col gap-1'>
<label htmlFor="email" className='font-semibold'>Email</label>
<input 
type="email" 
required 
name="email" 
id='email' 
placeholder='Enter your email..' 
className='bg-transparent px-2 py-1  border'
onChange={handleUserInput}
value={loginData.email}
 />

</div>

<div className='flex flex-col gap-1'>
<label htmlFor="password" className='font-semibold'>Password</label>
<input 
type="password" 
required name="password" 
id='password' 
placeholder='Enter your password..' 
className='bg-transparent px-2 py-1  border'
onChange={handleUserInput}
value={loginData.password}
 />


</div>
<button type='submit' className=' bg-yellow-600
 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm pt-2 pb-3 mt-1 font-semibold cursor-pointer text-xl '>Login</button>
<p className="text-center">
    Do not have an account?&nbsp;
    <Link className='text-accent link cursor-pointer' to='/signup'> Sign Up</Link>
</p>
<p className='text-center'>
    Forgot password?&nbsp;
    <Link className='text-accent link cursor-pointer' to="/user/reset">Reset Password</Link>

</p>
    </form>

</div>
</HomeLayout>
     
   
  )
}
