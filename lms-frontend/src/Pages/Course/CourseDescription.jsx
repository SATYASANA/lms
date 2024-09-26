import  { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout';

export default  function CourseDescription() {
  const navigate = useNavigate()
  const {role,data} = useSelector((state)=>state.auth)
    const {state} = useLocation();

    
  return (
   
   <HomeLayout>
    <div className='min-h-[90vh] pt-12 px-20 flex-col items-center justify-center text-white'>
        <div className="grid grid-cols-2 gap-10 py-10 relative">
         <div className="space-y-5">
         <img className='h-[22rem] object-cover object-center block mx-auto my-0' src={state?.thumbnail?.secure_url} alt="" />
       
       <div className="space-y-4">
       <div className="flex items-center justify-center gap-3 text-xl">
       <p className='font-semibold'>
        <span className='text-yellow-500 font-bold'>Total Lectures: </span>
       {state?.numberOfLectures}
       </p>
       <p className='font-semibold'>
        <span className='text-yellow-500 font-bold'>Instructor: </span>
       {state?.createdBy}
       </p>
       </div>
       {
        
         role === "ADMIN" || data?.subscription?.status === "active"?(
          <button onClick={()=>navigate('/course/displayLecture',{state: {...state}})} className='text-white block mx-auto text-xl rounded-md font-bold px-5 py-3 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out '>
          Watch lectures
        </button>
        ):(
         <button onClick={()=>navigate('/checkout')} className='text-white block mx-auto bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 pb-4 hover:bg-yellow-500 transition-all ease-in-out'>
          subscribe
         </button>
        )
       }
       </div>
         </div>
         <div className='space-y-2 text-xl'>
          <h1 className='text-3xl font-bold text-yellow-500 mb-5 text-center'>
            {state?.title}
          </h1>
          <p>
            <span className='text-yellow-500'>course description :</span> {state?.description}
          </p>
         </div>
       </div>
    </div>
   </HomeLayout>
  )
}
