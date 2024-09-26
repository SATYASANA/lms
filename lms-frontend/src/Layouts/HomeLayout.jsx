
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Footer from "../Components/Footer"
import { logout } from "../Redux/Slices/AuthSlice";
export default function HomeLayout({children}) {  
    
    const dispatch  = useDispatch();
    const navigate = useNavigate();
const isLoggedIn = useSelector((state)=>state?.auth?.isLoggedIn)
const role = useSelector((state)=>state?.auth?.role)
    function changeWidth(){
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto"
    }
    function hideDrawer(){
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
   const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = '0'
    }

    async function handleLogout(e){
        e.preventDefault();
        const res = await dispatch(logout())
        if(res?.payload?.success){
            navigate("/")
        }
    }
  return (
    <div className="min-h-[90vh]">
   <div className="drawer absolute left-0 z-50 w-fit">
    <input className="drawer-toggle" id="my-drawer" type="checkbox" name=""  />
    <div className="drawer-content">
        <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu onClick={changeWidth} size={"32px"} className="font-bold m-4"/>
        </label>
    </div>
    <div className="drawer-side">
<label htmlFor="my-drawer" className="drawer-overlay"></label>
<ul  className="menu p-4 w-48 sm:w-80 bg-base-600 text-base-content relative min-h-[100vh] bg-[#00000008] backdrop-blur-md" >
    <li className="w-fit  absolute right-2 z-50">
        <button onClick={hideDrawer}>
        <AiFillCloseCircle size={24} />
        </button>
    </li>
    {isLoggedIn && role === "ADMIN" &&(
    <li>
        <Link to="/admin/dashboard">Admin Dashboard</Link>
    </li>
    
    )}
    <li>
        <Link to = "/">Home</Link>
    </li>
    <li>
        <Link to = "/courses">All Courses</Link>
    </li>
    <li>
        <Link to = "/contact">Contact Us</Link>
    </li>
    <li>
        <Link to = "/about">About Us</Link>
    </li>
    {isLoggedIn && role==='ADMIN' && (
        <li>
        <Link to="/course/create">Create Course</Link>
        </li>
    )}
    {!isLoggedIn &&(
     <li className="absolute bottom-0 w-[100%]">
           <div className="w-full flex items-center justify-start my-3">
            <button className="bg-[#F1CD85] px-4 py-2 w-1/3 text-black font-bold">
                <Link className="p-0 h-fit" to='/login'>Login</Link>
            </button>
            <button className="bg-gray-600  ml-2   w-1/3 px-4 py-2 text-white font-bold">
                <Link to='/signup'>Sign up</Link>
            </button>
        </div>
     </li>
    )}
    {isLoggedIn &&(<li className="absolute  left-0 bottom-0 w-[100%]">
        <div className="w-full flex items-center justify-center my-3">
             <button className="bg-[#F1CD85]  ml-2 text-center w-1/2 px-4 py-2 text-white font-bold">
             <Link to="/profile">Profile</Link>
            </button>
            <button className="bg-gray-600  ml-2 text-center w-1/2 px-4 py-2 text-white font-bold">
             <Link onClick={handleLogout}>Log out</Link>
            </button>
          
</div>
<div className="w-full flex items-center justify-center my-3">
             
          
</div>
    </li>

    )}
</ul>
    </div>
   </div>
   {children}
   <Footer/>
    </div>
  )
}
