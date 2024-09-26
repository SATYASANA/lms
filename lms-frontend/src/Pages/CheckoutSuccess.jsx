import React, { useEffect } from 'react'
import {TiTick} from "react-icons/ti"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HomeLayout from '../Layouts/HomeLayout';
import { getUserData } from '../Redux/Slices/AuthSlice';

export default function CheckoutSuccess() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserData());
    })
    return (
        <HomeLayout>
           
                <div className='min-h-[90vh] items-center justify-center flex'>
                <div className="w-80 h-[26rem] flex flex-col items-center justify-center shadow-[0_0_10px_black] rounded-lg relative">
                    <h1 className="bg-green-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl0lg rounded-tr-lg">Payment Successful</h1>
                    <div className="px-4 space-y-5 text-center">
                        <p className="text-[17px]">
                        welcome to the pro bundle{" "} 
                            <span className="text-green-500 font-bold">
                                <br />
                                Now you can enjoy all the courses
                            </span> { " " }
                       
                        </p>

                        <p className="flex items-center justify-center gap-1 text-2xl font-bold text-black p-4 rounded-full bg-green-500 w-12 h-12 text-center mx-auto">
                            < TiTick className='text-xl'/>
                        </p>
                        <div className="text-gray-200">
                            <p>100% refund on cancellation</p>
                            <p>* Terms and conditions applied *</p>
                        </div>
                        <button onClick={()=>{navigate("/")}} className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                          Go to Dashboard
                        </button>
                    </div>
                </div>
                </div>

       
        </HomeLayout>
    );
}
