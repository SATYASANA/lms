import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toFormData } from "axios";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !=='undefined'? JSON.parse(localStorage.getItem('data')) : {}
}
export const createAccount = createAsyncThunk("/auth/signup",async (data)=>{
    try{
        console.log("trying")
        const res = axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:'Wait! creating your account',
            success: (data) =>{
                return data?.data?.message;
            },
            error:"failed to create account"
        })
        console.log(res)
        return (await res).data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/signin",async (data)=>{
    try{
        console.log("trying")
        const res = axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading:'Wait! authentication in progress',
            success: (res) =>{
                return res?.data?.message;
            },
            error:"failed to login"
        })
        console.log(res)
        return (await res).data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const logout = createAsyncThunk('/auth/logout',async ()=>{
   try {
    const res = axiosInstance.post("user/logout");
    toast.promise(res,{
        loading:'Wait logout in progress ...',
        success:(data)=>{
            return data?.data?.message;
        },
        error:"Failed to logout "
    })
    return (await res).data;
   } catch (error) {
    toast.error(error?.response?.data?.message);
   }
})



export const changePassword = createAsyncThunk('/user/update/password',async (data)=>{
    const res = axiosInstance.post('/user/change-password',data)
   try {
    toast.promise(res,{
        loading:'Password is changing',
        success:(data)=>{
            return data?.data?.message
        },
        error:'Failed to update profile'
    })
    console.log(await res.data)
    return (await res).data
   } catch (error) {
    toast.error(error?.response?.data?.message)
   }
} )

export const resetPassword = createAsyncThunk('/user/reset-password', async(data)=>{
    const res = axiosInstance.post('/user/reset',data)
    try {
        toast.promise(res,{
            loading:'password is reseting',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Failed to reset the password'
        })
        console.log(await res.data)
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        
    }

})
export const updateProfile = createAsyncThunk('/user/update/profile', async (data) => {
    try {
    
     const res = axiosInstance.put(`user/update/${data[0]}`,data[1]);
     toast.promise(res,{
         loading:"Profile is updating",
         success:(data)=>{
             return data?.data?.message
         }
         ,
         error:"Failed to update profile"
     })
     console.log(await res.data)
     return (await res).data
    } 
    catch (error) {
     toast.error(error?.response?.data?.message)
    } 
 })
export const resetPasswordByEmail = createAsyncThunk('/user/reset/',async (data,{ rejectWithValue })=>{
    const res =  axiosInstance.post(`/user/reset/${data[1]}`,data[0])

    try {
        console.log("password",data[0])
        console.log(data[1])
        toast.promise(res,{
            
            loading:'Password is changing',
            success:(data)=>{
                return data?.data?.message
            },
            error:'Error in changing password'
        })
        
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error.response.data);
        
    }
})
export const getUserData = createAsyncThunk("/user/details",async ()=>{
    try{
        const res = axiosInstance.get("user/me");
        return (await res).data;

    }
    catch(error){
        toast.error(error?.response?.data?.message)
    }
})
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled, (state, action)=>{
            console.log(action)
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
        localStorage.setItem("isLoggedIn",true);
        localStorage.setItem("role",action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.data = action?.payload?.user?.role;

        
        
        
        }).addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = "";
        }).addCase(getUserData.fulfilled,(state,action)=>{
            if(!action.payload.user)
                return;
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
        state.data = action?.payload?.user?.role;

        }) 
    }
})


// export const {} = authSlice.actions;

export default authSlice.reducer;