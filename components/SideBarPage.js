// import Link from "next/link";
import SideBar from "./SideBar";
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router'

const SideBarPage = () => {
  const router = useRouter()
  return (
    <div className="bg-gray-50 w-[80px] md:w-[200px] p-2 fixed min-h-screen border">
      <h1 className="text-gray-600 font-semibold mt-2">Main</h1> 
      <SideBar icon={DashboardIcon} color="secondary" title="Dashboard" onClick={()=> router.push('/')}/>
      <h1 className="text-gray-600 font-semibold mt-2">Lists</h1>
      <SideBar icon={PeopleAltIcon} color="secondary" title="Agents" onClick={()=> router.push('/agents')}/>  
      <SideBar icon={PeopleOutlineIcon} color="secondary" title="Clients" onClick={()=> router.push('/clients')}/> 
      <h1 className="text-gray-600 font-semibold mt-2">Services</h1>
      <SideBar icon={CalendarMonthIcon} color="secondary" title="Calendar" onClick={()=> router.push("/scheduler")}/>
      <SideBar icon={HeadsetMicIcon} color="secondary" title="Chat"/>
      <h1 className="text-gray-600 font-semibold mt-2">User</h1>
      <SideBar icon={PersonIcon} color="secondary" title="Profile"/>
      <SideBar icon={LogoutIcon} color="secondary" title="Logout"/>
    </div>
  );
};

export default SideBarPage;

      // <Link href="/agents">
      //   <h1 className="cursor-pointer">Watch all agents</h1>
      // </Link> 