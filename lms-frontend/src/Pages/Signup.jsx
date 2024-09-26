import React, { useState } from 'react'
import {toast,Toaster} from 'react-hot-toast'
import { BsPersonCircle } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
import { createAccount } from '../Redux/Slices/AuthSlice'

export default function Signup() {
    const [previewImage, setPreviewImage] = useState("") 

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [signupData,setSignupData] = useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    })

    function handleUserInput(e){
        const {name,value} = e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }
   function getImage(event){
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];
    if(uploadedImage){
        setSignupData({
            ...signupData,
            avatar:uploadedImage
        });
        const fileReader = new FileReader();

        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",function(){
            // console.log(this.result)
            setPreviewImage(this.result)
        })
    }
   }
   async function  createNewAccount(event){
event.preventDefault();
if(!signupData.email || !signupData.fullName || !signupData.password || !signupData.avatar){
    toast.error("please fill all the details")
    return;
}
// checking name field length
if(signupData.fullName.length<5){
    toast.error("fullname should be more than five characters");
    return
}
//checking email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(signupData.email)){
    toast.error("invalid email id")
    return
}
//checking password validation
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!passwordPattern.test(signupData.password)) {
    toast.error("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.");
    return
}
const formData = new FormData();
formData.append("fullName",signupData.fullName);
formData.append("email",signupData.email);
formData.append("password",signupData.password);
formData.append("avatar",signupData.avatar);

//dispatch create account action
const response = await dispatch(createAccount(formData))
console.log(response.formData)
if(response?.payload?.success){
    navigate("/")
}

setSignupData({
    fullName:"",
        email:"",
        password:"",
        avatar:""
})
setPreviewImage("");
   }
  return (
<HomeLayout>
<div className='flex items-center justify-center h-[90vh]'>
    <form onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]' noValidate >
        <h1 className='text-center text-2xl font-bold'>Registration Page</h1>
    <label htmlFor='image_uploads' className='cursor-pointer'>
        {previewImage ?(
            <img className='w-24 h-24 rounded-full m-auto' src={previewImage}/>
        ):<BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>}
    </label>
    <input
    onChange={getImage}
    className='hidden'
    type='file'
    id="image_uploads"
    name="image_uploads"
    accept=".jpg, .jpeg, .png, .svg"
     />
     <div className='flex flex-col gap-1'>
<label htmlFor="fullName" className='font-semibold'>Name</label>
<input 
type="text" 
required 
name="fullName" 
id='fullName' 
placeholder='Enter your name..' 
className='bg-transparent px-2 py-1  border'
onChange={handleUserInput}
value={signupData.fullName}
 />

</div>
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
value={signupData.email}
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
value={signupData.password}
 />


</div>
<button type='submit' className=' bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm pt-2 pb-3 mt-1 font-semibold cursor-pointer text-xl '>Create Account</button>
<p className="text-center">
    Already have an account?&nbsp;
    <Link className='text-accent link cursor-pointer' to='/signin'> Login</Link>
</p>
    </form>

</div>
</HomeLayout>
     
   
  )
}
