import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "./CourseCard";

export default function CourseList() {
    const dispatch = useDispatch();
const {courseData} = useSelector((state)=>state?.course);

async function loadCourses(){
    await dispatch(getAllCourses());
}
useEffect(()=>{
    loadCourses()
},[])
console.log("course data",courseData)
  return (
   <HomeLayout>
    <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white w-[90%] m-auto">
        <h1>Explore the courses made by <span className="font-bold text-yellow-500">Industry expersts</span> </h1>
        <div className="mb-10 flex flex-wrap gap-14">
            {courseData.map((element)=>{
                return <CourseCard key={element._id} data={element}/>
            })}
        </div>
    </div>
   </HomeLayout>
  )
}
