import { Icon } from "@mui/material"

const SideBar = ({ icon, title, color, onClick }) => {
  return (
    <div className='flex items-center p-2 mt-1 space-x-2 cursor-pointer hover:bg-gray-200 rounded-md' onClick={onClick}>
        <Icon component={icon} color={color}  sx={{ color: "#FFBF00" }} />
        <h1 className='hidden md:flex'>{title}</h1>
    </div>
  )
}

export default SideBar