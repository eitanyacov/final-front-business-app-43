import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import MarkunreadIcon from '@mui/icons-material/Markunread';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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
        <div className='flex ml-[220px] max-w-[1200px] bg-white min-h-screen px-3 py-2'>
              <div className='w-fit  bg-white shadow-2xl h-fit p-10 space-y-5 rounded-lg fixed'>
                  <div className='flex justify-between items-center'>
                  <div className='flex space-x-3 items-center'>
                  <PersonIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>First Name :</h1>
                  </div>
                  <h1 className='text-[#333] text-2xl'>{user?.firstName}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <div className='flex space-x-3 items-center'>
                  <PersonOutlineIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>Last Name :</h1>
                  </div>
                  <h1 className='text-[#333] text-2xl'>{user?.lastName}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                    <MarkunreadIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>Email :</h1>
                  <h1 className='text-[#333] text-2xl'>{user?.email}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <div className='flex space-x-3 items-center'>
                  <BusinessIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>Company : </h1>
                  </div>
                  <h1 className='text-[#333] text-2xl'>{user?.companyName}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <div className='flex space-x-3 items-center'>
                  <PhoneIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>Phone : </h1>
                  </div>
                  <h1 className='text-[#333] text-2xl'>{user?.phoneNumber}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <div className='flex space-x-3 items-center'>
                  <HomeIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>Address : </h1>
                  </div>
                  <h1 className='text-[#333] text-2xl'>{user?.address}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <div className='flex space-x-3 items-center'>
                  <CalendarMonthIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>Joind Date :</h1>
                  </div>
                  <h1 className='text-[#333] text-2xl'>{user?.joinDate}</h1>
                  </div>
                  <div className='flex justify-between items-center'>
                  <div className='flex space-x-3 items-center'>
                  <AppRegistrationIcon />
                  <h1 className='text-[#333] text-2xl font-semibold'>Dealer licensed :</h1>
                  </div>
                  <h1 className='text-[#333] text-2xl'>{user?.dealerlicensed}</h1>
                  </div>
              </div>
        </div>
    </div>
    

  )
}

export default Profile