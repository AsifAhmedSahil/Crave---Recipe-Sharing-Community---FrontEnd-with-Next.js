/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
'use client'
import { useUser } from '@/src/context/user.provider'
import React from 'react'

const AdminDashboard = () => {
  const {user} = useUser()
  return (
    <div>
      <div className="w-full pt-6  h-[150px] lg:h-[200px] bg-black text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#A46EDB_100%)] flex-col text-center  items-center justify-center">
        
        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold capitalize pb-5">
          {user?.role} Dashboard
        </h2>
        <h2 className="text-sm lg:text-xl font-semibold">
          <p className="text-2xl">👋 Welcome, {user?.name}</p>
        </h2>
        
      </div>
    </div>
  )
}

export default AdminDashboard