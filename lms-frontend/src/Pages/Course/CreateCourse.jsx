import { useState } from 'react'
import toast from 'react-hot-toast';
// import { BsPersonCircle } from 'react-icons/bs';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import HomeLayout from '../../Layouts/HomeLayout';
import { createNewCourse } from '../../Redux/Slices/CourseSlice';

export default function CreateCourse() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userInput,setUserInput] = useState({
        title:"",
        category: "",
        createdBy: "",
        description:"",
        thumbnail: null,
        previewImage:""

    })

    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setUserInput({
                    ...userInput,
                    previewImage:this.result,
                    thumbnail:uploadedImage
                })
            })
        }
    }
    function handleUserInput(e){
        const {name,value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.title ||!userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail || !userInput.previewImage){
            toast.error("All fileds are required");
            return;
        }
        const response = await dispatch(createNewCourse(userInput))
       if(response?.payload?.success){
       setUserInput({
            title:"",
            category: "",
            createdBy: "",
            description:"",
            thumbnail: null,
            previewImage:""
    
        })
    navigate("/courses")

       }
    
    }
  return (
  <HomeLayout>
   <div className='flex justify-center h-[90vh] items-center'>
   <form  onSubmit={onFormSubmit} className='flex flex-col justify-center p-5 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative rounded-2xl'>
    <label htmlFor='image_uploads' className='cursor-pointer'>
        {userInput.previewImage ?(
            <img className='w-full h-44  m-auto' src={userInput.previewImage}/>
        ):(
            <div className='w-full h-44 m-auto flex items-center justify-center border'>

            </div>
        )}
    </label>
    <input
    onChange={handleImageUpload}
    className='hidden'
    type='file'
    id="image_uploads"
    name="image_uploads"
    accept=".jpg, .jpeg, .png, .svg"
     />
        
        <label htmlFor="title" className='mb-2 '>Title</label>
        <input  name="title" type="text" onChange={handleUserInput} value={userInput.title} className='py-3' />
        <label htmlFor="category" className='mb-2 '>Category</label>
        <input type="text" name='category' value={userInput.category} onChange={handleUserInput} className='py-3' />
        <label htmlFor="createdBy" className='mb-2 '>Created By</label>
        <input type="text" name="createdBy" value = {userInput.createdBy} onChange={handleUserInput} className='py-3' />
        <label htmlFor="description" className='mb-2 '>Description</label>
       <textarea name="description" id="" value={userInput.description} onChange={handleUserInput} className='py-3'/>
     
     <button className='bg-yellow-500 w-[200px] m-auto mt-5 py-3 rounded-2xl' type='submit'>Submit</button>
    </form>
   </div>
  </HomeLayout>
  )
}
