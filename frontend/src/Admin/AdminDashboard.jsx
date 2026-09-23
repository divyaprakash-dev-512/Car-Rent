import React from 'react'
import { Outlet} from 'react-router-dom';
import Adminlayout from './Adminlayout';


export default function AdminDashboard() {
  return (
    <div style={{display:'flex'}}>
           
       <div>
       <Adminlayout/>
       </div>
       
        <div style={{marginLeft:'140px'}}>
       <Outlet></Outlet>
       </div> 
    </div>
  )
}
