import SideBar from "./SideBar";
import AssessmentIcon from '@mui/icons-material/Assessment';import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router'

const SideBarPage = () => {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <div className="bg-gray-50 w-[80px] md:w-[200px] p-2 fixed min-h-screen border">
      <h1 className="text-gray-600 font-semibold mt-1">Main</h1> 
      <div className={router.asPath == "/" ? "active" : ""}>
      <SideBar icon={DashboardIcon} color="secondary" title="Dashboard" onClick={()=> router.push('/')}/>
      </div>
      <h1 className="text-gray-600 font-semibold mt-1">Lists</h1>
      <div className={router.asPath == "/suppliers" ? "active" : ""}>
      <SideBar icon={PeopleAltIcon} color="secondary" title="Suppliers" onClick={()=> router.push('/suppliers')}/>
      </div>
      <div className={router.asPath == "/clients" ? "active" : ""}>
      <SideBar icon={PeopleOutlineIcon} color="secondary" title="Workers" onClick={()=> router.push('/workers')}/> 
      </div>
      <h1 className="text-gray-600 font-semibold mt-1">Services</h1>
      <div className={router.asPath == "/scheduler" ? "active" : ""}>
      <SideBar icon={CalendarMonthIcon} color="secondary" title="Calendar" onClick={()=> router.push("/scheduler")}/>
      </div>
      <div className={router.asPath == "/chats" ? "active" : ""}>
      <SideBar icon={DescriptionIcon} color="secondary" title="Invoice" onClick={()=> router.push("/chats")}/>
      </div>
      <div className={router.asPath == "/reports" ? "active" : ""}>
      <SideBar icon={AssessmentIcon} color="secondary" title="All Reports" onClick={()=> router.push("/reports")}/>
      </div>
      <h1 className="text-gray-600 font-semibold mt-1">User</h1>
      <div className={router.asPath == "/profile" ? "active" : ""}>
      <SideBar icon={PersonIcon} color="secondary" title="Profile" onClick={()=> router.push("/profile")}/>
      </div>
      <div className={router.asPath == "/" ? "active" : ""} onClick={()=> router.push("/login")}>
      <SideBar icon={LogoutIcon} color="secondary" title="Logout"/> 
      </div>   
    </div>
  );
};

export default SideBarPage;

      // <Link href="/agents">
      //   <h1 className="cursor-pointer">Watch all agents</h1>
      // </Link> 