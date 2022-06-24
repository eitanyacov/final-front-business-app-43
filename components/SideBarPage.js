import SideBar from "./SideBar";
import React, { useState, useEffect } from "react";
import Switch from '@mui/material/Switch';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";
import { useRouter } from 'next/router'


const SideBarPage = () => {
  const [checked, setChecked] = useState(false)
  const [schedulers, setSchedulers] = useState([])
  const [counter, setCounter] = useState() // not include schedulers before today
  const [numsOfSchedulers, setNumsOfSchedulers] = useState()  // all the schedulars, even those in the past(not always we delete the past schedulers)
  const router = useRouter()

  
  useEffect(()=> {
    axios.get(`http://localhost:8080/api/user/schedulers-by-user/38`)
    .then(res => {setSchedulers(res.data), setNumsOfSchedulers(res.data.length)})
    .catch(err => console.log(err))
  }, [numsOfSchedulers])

//  useEffect(()=> {
//       const count = 0;
//       schedulers.map(s => {
//         if(s.id > 50) {
//           count++
//           setCounter(count)
//         }
        
//       })
//       console.log('count is: ' + counter)
//  }, [schedulers])

 useEffect(()=> {
  const count = 0;
  const todayScheduler = 0;
  const now = new Date().getDate()
  schedulers.map(s => {
    if(now <= new Date(s.endDate).getDate()) {
      count++
      setCounter(count)
    }
    
  })
  console.log('count is: ' + counter)
}, [schedulers])


  const handleChange = () => {
    setChecked(!checked)

  }
  
  console.log(counter)
  console.log(router.pathname)
  return (
    <div className="bg-gray-50 w-[80px] md:w-[200px] px-2 fixed min-h-screen border">
     {checked ? ( 
      <>
      <div className="flex justify-between py-1">
     <h1 className="text-gray-600 text-sm font-semibold">Main</h1> 
      <Switch
          checked={checked}
          onChange={handleChange}
          size='small'
          inputProps={{ 'aria-label': 'controlled' }}/>
     </div>
      <div className={router.asPath == "/" ? "active" : ""}>
      <SideBar icon={DashboardIcon} color="secondary" title="Dashboard" onClick={()=> router.push('/')}/>
      </div>
      <h1 className="text-gray-600 text-sm font-semibold">Lists</h1>
      <div className={router.asPath == "/suppliers" ? "active" : ""}>
      <SideBar icon={PeopleAltIcon} color="secondary" title="Suppliers" onClick={()=> router.push('/suppliers')}/>
      </div>
      <div className={router.asPath == "/daily-income" ? "active" : ""}>
      <SideBar icon={MonetizationOnIcon} color="secondary" title="Daily Income" onClick={()=> router.push('/daily-income')}/>
      </div>
      <div className={router.asPath == "/invoice" ? "active" : ""}>
      <SideBar icon={DescriptionIcon} color="secondary" title="Invoices" onClick={()=> router.push("/invoice")}/>
      </div>
      <div className={router.asPath == "/workers" ? "active" : ""}>
      <SideBar icon={PeopleOutlineIcon} color="secondary" title="Workers" onClick={()=> router.push('/workers')}/> 
      </div>
      <h1 className="text-gray-600 text-sm font-semibold">Services</h1>
      <div className={router.asPath == "/scheduler" ? "active1" : "flex items-center justify-between pr-3"}>
      <SideBar icon={CalendarMonthIcon} color="secondary" title="Calendar" onClick={()=> router.push("/scheduler")}/>
      <div className="flex w-6 h-6 bg-blue-400 animate-pulse rounded-full justify-center items-center">
        <h1 className="text-white font-mono">{counter}</h1>
      </div>
      </div>
      <div className={router.asPath == "/tasks" ? "active" : ""}>
      <SideBar icon={AssignmentIcon} color="secondary" title="Tasks" onClick={()=> router.push("/tasks")}/>
      </div>
      <div className={router.asPath == "/reports" ? "active" : ""}>
      <SideBar icon={AssessmentIcon} color="secondary" title="All Reports" onClick={()=> router.push("/reports")}/>
      </div>
      <h1 className="text-gray-600 text-sm font-semibold">User</h1>
      <div className={router.asPath == "/profile" ? "active" : ""}>
      <SideBar icon={PersonIcon} color="secondary" title="Profile" onClick={()=> router.push("/profile")}/>
      </div>
      <a href="/login">
      <div onClick={()=> {localStorage.removeItem("user")}}>
      <SideBar icon={LogoutIcon} color="secondary" title="Logout"/> 
      </div>   
      </a>
      </>
     ) : (<>
     <div className="flex justify-between py-1">
     <h1 className="text-gray-600 text-sm font-semibold">ראשי</h1> 
      <Switch
          checked={checked}
          onChange={handleChange}
          size='small'
          inputProps={{ 'aria-label': 'controlled' }}/>
     </div>
      <div className={router.asPath == "/" ? "active" : ""}>
      <SideBar icon={DashboardIcon} color="secondary" title="דף הבית" onClick={()=> router.push('/')}/>
      </div>
      <h1 className="text-gray-600 text-sm font-semibold">רשימות</h1>
      <div className={router.asPath == "/suppliers" ? "active" : ""}>
      <SideBar icon={PeopleAltIcon} color="secondary" title="ספקים" onClick={()=> router.push('/suppliers')}/>
      </div>
      <div className={router.asPath == "/daily-income" ? "active" : ""}>
      <SideBar icon={MonetizationOnIcon} color="secondary" title="דו''ח הכנסות יומי" onClick={()=> router.push('/daily-income')}/>
      </div>
      <div className={router.asPath == "/invoice" ? "active" : ""}>
      <SideBar icon={DescriptionIcon} color="secondary" title="חשבוניות" onClick={()=> router.push("/invoice")}/>
      </div>
      <div className={router.asPath == "/workers" ? "active" : ""}>
      <SideBar icon={PeopleOutlineIcon} color="secondary" title="עובדים" onClick={()=> router.push('/workers')}/> 
      </div>
      <h1 className="text-gray-600 text-sm font-semibold">שירותים</h1>
      <div className={router.asPath == "/scheduler" ? "active1" : "flex items-center justify-between pr-3"}>
      <SideBar icon={CalendarMonthIcon} color="secondary" title="יומן פגישות" onClick={()=> router.push("/scheduler")}/>
      <div className="flex w-6 h-6 bg-blue-400 animate-pulse rounded-full justify-center items-center">
        <h1 className="text-white font-mono">{counter}</h1>
      </div>
      </div>
      <div className={router.asPath == "/tasks" ? "active" : ""}>
      <SideBar icon={AssignmentIcon} color="secondary" title="משימות / תזכורות" onClick={()=> router.push("/tasks")}/>
      </div>
      <div className={router.asPath == "/reports" ? "active" : ""}>
      <SideBar icon={AssessmentIcon} color="secondary" title="כל הדוחות" onClick={()=> router.push("/reports")}/>
      </div>
      <h1 className="text-gray-600 text-sm font-semibold">משתמש</h1>
      <div className={router.asPath == "/profile" ? "active" : ""}>
      <SideBar icon={PersonIcon} color="secondary" title="פרופיל משתמש" onClick={()=> router.push("/profile")}/>
      </div>
      <a href="/login">
      <div onClick={()=> {localStorage.removeItem("user")}}>
      <SideBar icon={LogoutIcon} color="secondary" title="יציאה"/> 
      </div>   
      </a>
     </>)}
    </div>
  );
};

export default SideBarPage;

      // <Link href="/agents">
      //   <h1 className="cursor-pointer">Watch all agents</h1>
      // </Link> 