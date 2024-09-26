import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from "./Slices/CourseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import razorPaySliceReducer from "./Slices/RazorPaySlice";
import statSliceReducer from "./Slices/StatSlice"



const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:razorPaySliceReducer,
        lecture:LectureSliceReducer,
        stat:statSliceReducer

   
    }
})

export default store;