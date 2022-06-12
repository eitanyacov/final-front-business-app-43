import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import { useRouter } from 'next/router'


const Profile = () => {
  const [user, setUser] = useState({})
  const router = useRouter();
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      
      
  }, [])

  
  if(!user) router.push('login')

  return (
    <div>
        <SideBarPage />
        <div className='flex ml-[220px] max-w-[1200px] bg-white min-h-screen p-3 '>
              <div className='w-[350px] bg-[#f3d3d3] h-[500px] p-3 space-y-5 rounded-lg fixed'>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>First Name :</h1>
                  <h1 className='text-[#333] text-2xl'>{user?.firstName}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>Last Name :</h1>
                  <h1 className='text-[#333] text-2xl'>{user?.lastName}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>Email :</h1>
                  <h1 className='text-[#333] text-2xl'>{user?.email}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>Company : </h1>
                  <h1 className='text-[#333] text-2xl'>{user?.companyName}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>Phone : </h1>
                  <h1 className='text-[#333] text-2xl'>{user?.phoneNumber}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>Address : </h1>
                  <h1 className='text-[#333] text-2xl'>{user?.address}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>Joind Date :</h1>
                  <h1 className='text-[#333] text-2xl'>{user?.joinDate}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <h1 className='text-[#333] text-2xl font-bold'>Dealer licensed :</h1>
                  <h1 className='text-[#333] text-2xl'>{user?.dealerlicensed}</h1>
                  </div>
              </div>
        </div>
    </div>
    

  )
}

export default Profile