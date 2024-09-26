import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout'
import { changePassword } from '../../Redux/Slices/AuthSlice';


export default function ChangePassword() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newlyPassword,setNewlyPassword] = useState({
        oldPassword:"",
        newPassword:"",
        userId:useSelector((state)=>state?.auth?.data?._id)
    })

    function handleUserInput(e){
  
        const {name,value} = e.target;
        setNewlyPassword({
            ...newlyPassword,
            [name]:value
       
        })
     

    }
    async function onFormSubmit(e){
        e.preventDefault();
        if(!newlyPassword.newPassword && !newlyPassword.oldPassword){
            toast.error("All fields are mandatory");
            return;
        }
        const formData = new FormData();
        formData.append('oldPassword',newlyPassword.oldPassword);
        formData.append('newPassword',newlyPassword.newPassword);
        console.log(newlyPassword)
        await dispatch(changePassword(newlyPassword))
        navigate('/profile')

    }
  return (
    <div>
      <HomeLayout>
       <div className='min-h-[90vh] flex items-center justify-center  w-[400px] m-auto '>
       <form className='flex flex-col  gap-1 w-[90%] shadow-[0_0_10px_black] p-10 rounded-xl' onSubmit={onFormSubmit}>
        <label htmlFor="oldPassword">Old Password</label>
        <input className='p-1' type="text"  value={newlyPassword.oldPassword} name='oldPassword' onChange={handleUserInput} />
        <label htmlFor="newPassword">New Password</label>
        <input className='p-1' type="text" name='newPassword' value={newlyPassword.newPassword} onChange={handleUserInput} />
        <button type='submit' className='p-2 py-3 rounded-xl w-[220px] bg-yellow-500 m-auto text-white mt-5'>Submit</button>
       </form>
       </div>
      </HomeLayout>
    </div>
  )
}
