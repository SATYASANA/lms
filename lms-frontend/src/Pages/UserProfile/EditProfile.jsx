import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BsPersonCircle } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice'

export default function EditProfile() {
    const navigate = useNavigate()
    // const userData = useSelector((state)=>state?.auth?.data)
    const dispatch = useDispatch()
    const [editProfile,setEditProfile] = useState({
        fullName:"",
      
      
        previewImage:"",
        avatar:undefined,
        userId:useSelector((state)=>state?.auth?.data?._id)
    })

    function handleInput(e){
        const {name,value} =e.target
        setEditProfile({
            ...editProfile,
            [name]:value

        })
    }

   function handleImageUpload(e){
    e.preventDefault();
    const uploadImage = e.target.files[0];
    const fileReader = new FileReader()
    if(uploadImage){
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load",function(){
            setEditProfile({
                ...editProfile,
                previewImage:this.result,
                avatar:uploadImage
            })
        })
    }
   }

  async function onFormSubmit(e){
    e.preventDefault();
    console.log(editProfile)
    if(!editProfile.fullName || !editProfile.avatar){
        toast.error("All fields are mandatory");
        return;
    }
    if(editProfile.fullName.length<5){
        toast.error("Name cannot be less than 5 characters")
    }
    const formData = new FormData();
    formData.append("fullName",editProfile.fullName)
    formData.append("avatar",editProfile.avatar)
    await dispatch(updateProfile([editProfile.userId,formData]))
    await dispatch(getUserData())
    navigate("/profile")
   }
  return (
    <HomeLayout>
    <div className='min-h-[90vh] flex justify-center items-center'>
    <form onSubmit={onFormSubmit} action="" className='py-20 rounded-xl flex w-[30rem] flex-col justify-center items-center shadow-[0_0_10px_black] '>
    <label htmlFor='image_uploads' className='cursor-pointer'>
        {editProfile.previewImage ?(
            <img className='w-24 h-24 rounded-full m-auto' src={editProfile.previewImage}/>
        ):<BsPersonCircle className='w-24 h-24 rounded-full m-auto'/>}
    </label>
    <input
    // onChange={getImage}
    className='hidden'
    type='file'
    id="image_uploads"
    name="image_uploads"
    accept=".jpg, .jpeg, .png, .svg" onChange={handleImageUpload}/>
    <div className='flex flex-col w-[85%]'>
        <label htmlFor="fullName">Name</label>
        <input className='w-100 py-3' type="text" value={editProfile.fullName} name='fullName' onChange={handleInput} />
    </div>
     <button className='bg-yellow-500 text-white py-2 px-4 w-[50%] rounded-xl mt-4'   type='submit'>Submit</button>
   </form>
    </div>
    </HomeLayout>
  )
}
