import React from 'react'
import '../styling/updatepass.css'
export default function UpdatePassword() {
  return (
    <div>
        
          <h1 className='up-h1'> You Can Change Your Password Here</h1>

          <div className='up-up'>
            <br />
            <label htmlFor="">Current Password</label>
            <input type="password" name='currentpassword' placeholder='Your Current Password'/>
            
            <br />
             <label htmlFor=""> New Password</label>
            <input type="password" name='newpassword' placeholder='New Password'/>
            
             <label htmlFor="">Confirm Password</label> 
            <input type="password" name='confirmpassword'  placeholder='Confirm Password'/>
            
            <button>Change Password</button>
          </div>
       
    </div>
  )
}
