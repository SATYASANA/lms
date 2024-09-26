import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { resetPassword } from '../Redux/Slices/AuthSlice';

export default function ResetPassword() {
    const dispatch = useDispatch()
    const [resetingPassword,setResetingPassword] = useState({
        email:''

    })

    function handleInput(e){
        const {name,value} = e.target;
        setResetingPassword({
            ...resetingPassword,
            [name]:value
        })
    }

    async function formSubmit(e){
        e.preventDefault();
        if(!resetingPassword.email){
            toast.error("Email is required")
            return
        }
        console.log(resetingPassword)
        await dispatch(resetPassword(resetingPassword))

    }
  return (
    <div>
      <form onSubmit={formSubmit}>
        <input type="mail" name ="email" value={resetingPassword.email} onChange={handleInput} />
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
