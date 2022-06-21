import { Icon } from "@mui/material"

const TopBox = ({ title, amount, link, icon, color, onClick, bgIcon }) => {
  return (
    <div className="flex flex-col justify-between text-center bg-white w-[100px] md:w-[250px] h-[140px] shadow-xl border mt-3 rounded-2xl p-1">
        <h1 className='text-gray-600 font-bold text-md md:text-3xl'>{title}</h1>
        <h1 className='text-gray-500 text-md md:text-2xl'>{amount}</h1>
        <div>

        </div>
            <div className='flex items-center justify-between'>
                <div className="hidden lg:block ml-1 cursor-pointer" onClick={onClick}>
                  <h1 className='text-gray-800 text-md md:text-xl'>{link}</h1>
                  <div className='w-[100px] h-[0.5px] bg-black'/>
                </div>
                <div className={`flex items-center justify-center m-[2px] h-10 w-10 rounded-lg ${bgIcon} cursor-pointer`} onClick={onClick}>
                    <Icon component={icon} color={color}/>
                </div> 
            </div>
            
          
    </div>
  )
}

export default TopBox