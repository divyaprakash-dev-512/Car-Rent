import About from "./components/About";
import Car from "./components/Car";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import Profile from "./pages/Profile";
import ProfileSetting from "./pages/ProfileSetting";
import UpdatePassword from "./pages/UpdatePassword";
import Mybooking from "./pages/Mybooking";
import PostTestimonial from "./pages/PostTestimonial";
import MyTestimonial from "./pages/MyTestimonial";
import Userlayout from "./pages/Userlayout";
import Adminlayout from "./Admin/Adminlayout";
import Admindash from "./Admin/Admindash";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import AdminPostVehicle from "./Admin/AdminPostVehicle";
import RgUsers from "./Admin/RgUsers";
import CarDetails from "./pages/CarDetails";
import AdminBooking from "./Admin/AdminBooking";
import ProtectedRoot from "./Admin/ProtectedRoot";
import AllVehicle from "./pages/AllVehicle";
import AdminBrand from "./Admin/AdminBrand";
import ManageContact from "./Admin/ManageContact";
import ManageSubscriber from "./Admin/ManageSubscriber";
import ProfileUpdate from "./components/ProfileUpdate";
import Vecheledata from "./components/Vecheledata";


function App() {
  return (
    <Routes>
          <Route element={<UserLayout></UserLayout>}>
      <Route path="/" element={<Home> </Home>} />

      <Route path="/about" element={<About></About>} />

      <Route path="/cars" element={<Car></Car>} />

      <Route path="/faqs" element={<Faq></Faq>} />

      <Route path="/contact" element={<Contact></Contact>} />
      
      <Route path="/profile" element={<Profile></Profile>}></Route>
      

      <Route element={<Userlayout></Userlayout>}>
      <Route path="/profileseting" element={<ProfileSetting/>}></Route>
      <Route path="/updatepassword" element={<UpdatePassword/>}></Route>
      <Route path="/mybooking" element={<Mybooking/>}></Route>
      <Route path="/posttestimonial" element={<PostTestimonial/>}></Route>
      <Route path="/mytestimonial" element={<MyTestimonial/>}></Route>
      

      </Route>
      <Route path="/carview/:id" element={<CarDetails/>}></Route>
      </Route>



    <Route element={<AdminDashboard/> }>
    <Route path="/admin" element={<Adminlayout/>}></Route>
    <Route path="adminuser-dash" element={<Admindash/>}></Route>
  <Route path="/vehicles" element={<AdminPostVehicle/>}/>
  <Route path="/reguser" element={<RgUsers/>}/>
  <Route path="/booking" element={<AdminBooking/>}/> 
  <Route path="/car" element={<AllVehicle/>}></Route>
  <Route path="/brand" element={<AdminBrand/>}></Route>
  <Route path="/updatecontact" element={<ManageContact/>}></Route>
  <Route path="/managesubscribers" element={<ManageSubscriber/>}></Route>
  <Route path="/update-Profile/:id" element={<ProfileUpdate/>}></Route>
  <Route path="/vechele" element={<Vecheledata></Vecheledata>}></Route>
  </Route>



  
    </Routes>
  );
}

export default App;