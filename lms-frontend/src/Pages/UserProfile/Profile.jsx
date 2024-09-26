import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"

import HomeLayout from "../../Layouts/HomeLayout"
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorPaySlice";

export default function Profile() {
  const userData = useSelector(state=>state?.auth?.data)
  const dispatch = useDispatch();
   async function handleSubmit(e){
    e.preventDefault()
    await dispatch(cancelCourseBundle())
    await dispatch(getUserData())
    toast.success("cancellation completed")

  }
  return (
  <HomeLayout>
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-[30rem] shadow-[0_0_10px_black]">
        <img className="w-40 m-auto rounded-full" src={userData?.avatar?.secure_url} alt="" />
        <h1 className="text-center text-2xl" style={{textTransform:"capitalize"}}>{userData?.fullName}</h1>
        <div className="flex justify-between">
          <p className="w-[50%]">Name</p>
          <p className="w-[50%]">{userData?.fullName}</p>
        </div>
        <div className="flex justify-between">
          <p className="w-[50%]">Role:</p>
          <p className="w-[50%] text-start">{userData.role}</p>
          
        </div>
        <div className="flex items-center justify-between gap-2">
          <Link to="/changepassword" className=" text-center w-1/2 bg-yellow-600 hover:bg-yellow-500 px-2 py-2 rounded-md">
          <button>Change Password</button>
          </Link>
          <Link to="/user/editprofile" className="text-center w-1/2 bg-yellow-600 hover:bg-yellow-500 px-2 py-2 rounded-md">
          <button>Edit Profile</button>
          </Link>
        </div>
        {userData?.subscription?.status === 'active' && (
          <form onSubmit={handleSubmit} className="width-[100%]">
            <button className="bg-red-600 p-2 rounded-md w-[100%]">Cancel Subscription</button>
          </form>
        )}

      </div>
    </div>
  </HomeLayout>
  )
}
