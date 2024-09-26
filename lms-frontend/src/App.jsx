
import './App.css'

import { Link, Route,Routes } from 'react-router-dom'

import AboutUs from './Components/AboutUs'
import RequiredAuth from './Components/Auth/RequiredAuth'
import HomePage from './Components/HomePage'
import CheckoutSuccess from './Pages/CheckoutSuccess'
import Contact from './Pages/Contact'
import CourseDescription from './Pages/Course/CourseDescription'
import CourseList from './Pages/Course/CourseList'
import CreateCourse from './Pages/Course/CreateCourse'
import AddLecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
import DisplayLecture from './Pages/Dashboard/DisplayLecture'
import Denied from './Pages/Denied'
import Login from './Pages/Login'
import NotFound from './Pages/NotFound'
import Checkout from './Pages/payment/Checkout'
import ResetLink from './Pages/ResetLink'
import ResetPassword from './Pages/ResetPassword'
import Signup from './Pages/Signup'
import ChangePassword from './Pages/UserProfile/ChangePassword'
import EditProfile from './Pages/UserProfile/EditProfile'
import Profile from './Pages/UserProfile/Profile'

function App() {
 

  return (
    <>
  <Routes>
  <Route path = '/' element={<HomePage/>}></Route>
  <Route path = '/about' element={<AboutUs/>}></Route>
  <Route path='/courses' element={<CourseList/>}></Route>
  <Route path = '/signup' element={<Signup/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path = '*' element={<NotFound/>}></Route>
  <Route path = '/denied' element={<Denied/>}></Route>
  <Route path = '/contact' element={<Contact/>}></Route>
  <Route path = '/course/description' element={<CourseDescription/>}/>
<Route element={<RequiredAuth allowedRoles={["ADMIN"]}/>}>
<Route path='/course/create' element={<CreateCourse/>}/>


</Route>
<Route element={<RequiredAuth allowedRoles={["ADMIN","USER"]}/>}>
<Route path='/profile' element={<Profile/>}/>
</Route>
<Route path="/user/editprofile" element={<EditProfile/>}/>
<Route path="/changepassword" element={<ChangePassword/>}/>
<Route path="/user/reset" element={<ResetPassword/>}/>
<Route path="/reset-password/:Token" element={<ResetLink />} />
<Route path = "/checkout" element={<Checkout/>}/>
<Route path= "/checkout/success" element={<CheckoutSuccess/>}/>
<Route path = "/course/displayLecture" element={<DisplayLecture/>}/>
<Route path = "/course/addLecture" element={<AddLecture/>}/>

<Route path="/admin/dashboard" element={<AdminDashboard />} />
  </Routes>



    </>
  )
}

export default App
