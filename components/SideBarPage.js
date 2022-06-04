// import Link from "next/link";
import SideBar from "./SideBar";
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const SideBarPage = () => {
  return (
    <div className="bg-gray-50 w-[80px] md:w-[200px] p-2 fixed min-h-screen border">
      <h1 className="text-gray-600 font-semibold mt-2">Main</h1>
        <a href="/">
      <SideBar icon={DashboardIcon} color="secondary" title="Dashboard" />
        </a>
      <h1 className="text-gray-600 font-semibold mt-2">Lists</h1>
        <a href="/agents">
      <SideBar icon={PeopleAltIcon} color="secondary" title="Agents"/>
        </a>
        <a href="/clients">
      <SideBar icon={PeopleOutlineIcon} color="secondary" title="Clients"/>
        </a>
      <h1 className="text-gray-600 font-semibold mt-2">Services</h1>
      <SideBar icon={HomeIcon} color="secondary" title="Home"/>
      <SideBar icon={HomeIcon} color="secondary" title="Home"/>
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