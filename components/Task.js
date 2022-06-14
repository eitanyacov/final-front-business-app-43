import { Icon } from "@mui/material"

const Task = ({ title, date, icon, color, onClick }) => {
  return (
    <div className='flex flex-col justify-between w-[90px] md:w-[220px] h-[100px] bg-white shadow-xl border mt-5 rounded-2xl p-3 cursor-pointer'>
        <h1 className='text-gray-500 text-md md:text-xl'>{title}</h1>
        <h1 className='text-gray-700 text-md font-semibold md:text-xl'>{date}</h1>
        <div>

        </div>
            <div className='flex items-center justify-between'>
                <div className="hidden lg:block cursor-pointer" onClick={onClick}>
                  {/* <h1 className='text-gray-700 text-md md:text-lg'>{link}</h1> */}
                  <div className='w-[100px] h-[0.5px] bg-black'/>
                </div>
                {/* <div className="flex items-center justify-center h-10 w-10 bg-gray-100 rounded-lg cursor-pointer" onClick={onClick}>
                    <Icon component={icon} color={color}/>
                </div>  */}
            </div>
            
          
    </div>
  )
}

export default Task