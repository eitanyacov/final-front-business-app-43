import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';

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
        <div className="flex items-center space-x-10">
          <a href="/">
            <div className="flex space-x-1 items-center">
                <DashboardIcon color="secondary"/>
            <h1 className="font-semibold cursor-pointer">Dashboard</h1>
            </div>
          </a>
          <div className="flex items-center space-x-2 cursor-pointer">
            <h1 className="font-semibold cursor-pointer">user</h1>
            <div className="flex h-10 w-10 border border-gray-500 justify-center items-center rounded-full">
              <PersonIcon color="info" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
