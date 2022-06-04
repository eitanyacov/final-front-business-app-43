import { Icon } from "@mui/material"

const SideBar = ({ icon, title, color }) => {
  return (
    <div className='flex items-center p-3 mt-1 space-x-2 cursor-pointer hover:bg-gray-200 rounded-md'>
        <Icon component={icon} color={color}/>
        <h1 className='hidden md:flex'>{title}</h1>
    </div>
  )
}

export default SideBar