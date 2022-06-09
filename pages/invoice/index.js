import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import { useRouter } from 'next/router'


const Invoice = () => {
  const [user, setUser] = useState({})
  const router = useRouter();
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      
  }, [])
  
  if(!user) router.push('login')
  return (
    <>
    <SideBarPage />
    <div className='ml-[250px]'>
        <h1>Invoices</h1>
    </div>
    </>
  )
}

export default Invoice