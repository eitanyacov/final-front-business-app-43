import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router'

const Reports = () => {
  const [user, setUser] = useState({})
  const router = useRouter();
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      
  }, [])

 
 
  
  if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className='ml-[205px] mt-10 text-3xl'>
     
    </div>
    </>
  )
}

export default Reports