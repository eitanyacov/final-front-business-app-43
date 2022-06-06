import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const Header = () => {
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
          {/* <a href="/"> */}
          <Link href="/">
             <div className="flex space-x-1 items-center">
                <DashboardIcon color="primary"/>
                <h1 className="font-semibold cursor-pointer">Dashboard</h1>
            </div>
          </Link>
            
          {/* </a> */}
          <ChatBubbleOutlineIcon fontSize="medium" className="cursor-pointer"/>
          <div className="flex items-center space-x-8 cursor-pointer">
            <div className="relative">
              <div className="flex justify-center items-center h-4 w-4 bg-red-600 rounded-full absolute hover:scale-125 transition-all duration-150 ease-out">
                <p className="text-white text-xs">3</p>
              </div>

              {/* this div is "flashing, flickering" because of the "animate-pulse" */}
              {/* <div className="flex absolute w-5 h-5 bg-red-500 animate-pulse rounded-full -top-2 -right-1 justify-center items-center">
                    <h3 className="text-xs font-bold text-white">3</h3>
              </div> */}
              
              <NotificationsNoneIcon />
      
            </div>
            <div className="flex h-15 w-15 border justify-center items-center rounded-full">
              <img src="https://www.compassionpregnancy.com/images/smiling-man.jpg" alt="" width={40} height={40} className='rounded-full' />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
