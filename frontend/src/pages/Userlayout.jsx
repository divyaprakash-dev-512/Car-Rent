import React from 'react'
import { Outlet } from 'react-router-dom'
import Profile from './Profile'

export default function Userlayout() {
  return (
    <div>
      <div style={{display:'flex'}}>

        <div>
          <Profile />
        </div>

        <div className="content">
          <Outlet />
        </div>

      </div>
      

    </div>
  )
}