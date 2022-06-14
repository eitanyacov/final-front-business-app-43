import SideBar from "./SideBar";
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router'

const SideBarPage = () => {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <div className="bg-gray-50 w-[80px] md:w-[200px] px-2 fixed min-h-screen border">
      <h1 className="text-gray-600 text-sm font-semibold">Main</h1> 
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
      <SideBar icon={DescriptionIcon} color="secondary" title="Invoice" onClick={()=> router.push("/invoice")}/>
      </div>
      <div className={router.asPath == "/workers" ? "active" : ""}>
      <SideBar icon={PeopleOutlineIcon} color="secondary" title="Workers" onClick={()=> router.push('/workers')}/> 
      </div>
      <h1 className="text-gray-600 text-sm font-semibold">Services</h1>
      <div className={router.asPath == "/scheduler" ? "active" : ""}>
      <SideBar icon={CalendarMonthIcon} color="secondary" title="Calendar" onClick={()=> router.push("/scheduler")}/>
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
      
    </div>
  );
};

export default SideBarPage;

      // <Link href="/agents">
      //   <h1 className="cursor-pointer">Watch all agents</h1>
      // </Link> 