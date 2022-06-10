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
        <h1 className='ml-[250px]'>Profile Page</h1>
    </div>
    

  )
}

export default Profile