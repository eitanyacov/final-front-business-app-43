import React, { useState, useEffect } from 'react'
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import { Snackbar, Alert } from "@mui/material";
import axios from 'axios';
import { useRouter } from 'next/router'


const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState({})
  const [open, setOpen] = useState(false)
  const [urgentTasks, setUrgentTasks] = useState()
  
  
  useEffect(()=> {
    const res = localStorage.getItem("user")
    res = JSON.parse(res)
    setUser(res)
  }, [])

  useEffect(()=> {
    axios.get("http://localhost:8080/api/user/count-user-urgent-tasks/" + user?.id)
    .then((res) => setUrgentTasks(res.data))
    .catch((err) => console.log(err));

  }, [user?.id])

  useEffect(()=> {
    if(urgentTasks > 0) {
      setOpen(true)
    }
  }, [urgentTasks])

  const handleClose = () => {
    setOpen(false)
  }
  
  
  console.log("the route is: " + router.asPath)
 
  
  return (
    <div className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="flex justify-between h-14 max-w-6xl mx-auto px-3">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img
              src="https://www.tobiipro.com/imagevault/publishedmedia/9f5pqmy21ou5wpmv3s9l/TobiiPro-Colorlogo-TransparentBackground-818x300.png?download=1"
              width={100}
            />
          </div>
          
        </Link>
        <div className="flex items-center justify-center space-x-5">
          {router.pathname == '/suppliers' && (
            <h1 className='mr-8 text-green-600'>לחץ לחיצה כפולה על השדה שברצונך לערוך</h1>
          )}
          {router.pathname == '/invoice' && (
            <h1 className='mr-8 text-green-600'>לחץ לחיצה כפולה על השדה שברצונך לערוך</h1>
          )}
          {/* <a href="/"> */}
             <div className="flex space-x-4 items-center">
                 {router.pathname == "/invoice" && (
                <div className="flex items-center space-x-2" onClick={()=> router.push("/add-invoice")}>
                   <div className="flex justify-center items-center bg-orange-400 h-8 w-8 rounded-full hover:scale-125 ease-out transition-all duration-125 hover:bg-orange-300">
                     <AddIcon color="primary" className="cursor-pointer"/>
                   </div>
                   <h1>הכנס חשבונית חדשה</h1>
                </div>
                 )}
                 {router.pathname == "/suppliers" && (
                <div className="flex items-center space-x-2" onClick={()=> router.push("/add-supplier")}>
                   <div className="flex justify-center items-center bg-orange-400 h-8 w-8 rounded-full hover:scale-125 ease-out transition-all duration-125 hover:bg-orange-300">
                     <AddIcon color="primary" className="cursor-pointer"/>
                   </div>
                   <h1>הכנס ספק חדש</h1>
                </div>
                 )}
                 {router.pathname == "/daily-income" && (
                <div className="flex items-center space-x-2" onClick={()=> router.push("/add-daily-z")}>
                   <div className="flex justify-center items-center bg-orange-400 h-8 w-8 rounded-full hover:scale-125 ease-out transition-all duration-125 hover:bg-orange-300">
                     <AddIcon color="primary" className="cursor-pointer"/>
                   </div>
                   <h1>הכנס דו"ח יומי</h1>
                </div>
                 )}
                 {router.pathname == "/workers" && (
                  <div className='flex items-center space-x-14'>
                  <div className='flex items-center justify-center bg-green-400 rounded-full px-3 py-1 cursor-pointer hover:bg-green-300' onClick={()=> router.push('/salaries')}>
                    <h1 className='text-blue-700 font-semibold'> משכורות כל העובדים</h1>
                  </div>
                <div className="flex items-center space-x-2" onClick={()=> router.push("/add-worker")}>
                   <div className="flex justify-center items-center bg-orange-400 h-8 w-8 rounded-full hover:scale-125 ease-out transition-all duration-125 hover:bg-orange-300">
                     <AddIcon color="primary" className="cursor-pointer"/>
                   </div>
                   <h1>הכנס עובד חדש</h1>
                </div>
                </div>
                 )}
                 {router.pathname == "/salaries" && (
                  <div className='mr-4'>
                <div className="flex items-center space-x-2" onClick={()=> router.push("/add-salary")}>
                   <div className="flex justify-center items-center bg-orange-400 h-8 w-8 rounded-full hover:scale-125 ease-out transition-all duration-125 hover:bg-orange-300">
                     <AddIcon color="primary" className="cursor-pointer"/>
                   </div>
                   <h1>הכנס משכורת חדשה</h1>
                </div>
                  </div>
                
               
                 )}
                 {/* {router.pathname == "/tasks" && (
                <div className="flex items-center space-x-2" onClick={()=> router.push("/")}>
                   <div className="flex justify-center items-center bg-orange-400 h-8 w-8 rounded-full hover:scale-125 ease-out transition-all duration-125 hover:bg-orange-300">
                     <AddIcon color="primary" className="cursor-pointer"/>
                   </div>
                   <h1>Add Task</h1>
                </div>
                 )} */}
                 <Link href="/">
                 <div className='flex items-center space-x-1'>
                 <DashboardIcon color="primary"/>
                 <h1 className="font-semibold cursor-pointer">Dashboard</h1>
                 </div>
                 </Link>
            </div>
          
          {/* </a> */}
          
          <div className="flex items-center space-x-8 cursor-pointer">
            {user?.id &&
              <div className="relative" onClick={()=> router.push('/tasks')}>
              {/* <div className="flex p-2 justify-center items-center h-4 w-4 bg-red-500 rounded-full absolute hover:scale-125 transition-all duration-150 ease-out">
                <p className="text-white text-xs">{urgentTasks}</p>
              </div> */}

              {/* this div is "flashing, flickering" because of the "animate-pulse" */}
              { urgentTasks > 0 &&
                <div className="flex absolute w-5 h-5 bg-red-500 animate-pulse rounded-full -top-2 -right-1 justify-center items-center">
                <h3 className="text-xs font-bold text-white">{urgentTasks}</h3>
                </div>
              }
              
              <AssignmentIcon fontSize='large' color='primary' className='cursor-pointer'/>
            </div>
            }
            <div className='flex items-center space-x-2'>
            {user?.id && 
            <div className="flex h-15 w-15 border justify-center items-center rounded-full">
              <img src="https://www.compassionpregnancy.com/images/smiling-man.jpg" alt="" width={40} height={40} className='rounded-full' />
            </div>}
            {/* <h1 className='font-semibold'>{userFirstName}</h1> */}
            <h1 className='font-semibold'>{user?.email}</h1>
            </div>
            
          </div>
          
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            There are {urgentTasks} Urgent tasks!
          </Alert>
        </Snackbar>
    </div>
  );
};

export default Header;
