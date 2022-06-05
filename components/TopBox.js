import { Icon } from "@mui/material"

const TopBox = ({ title, amount, link, icon, color, onClick }) => {
  return (
    <div className='flex flex-col justify-between w-[100px] md:w-[250px] h-[140px] bg-white shadow-xl border mt-5 rounded-2xl p-3'>
        <h1 className='text-gray-500 text-md md:text-xl'>{title}</h1>
        <h1 className='text-gray-700 text-md font-semibold md:text-2xl'>{amount}</h1>
        <div>

        </div>
            <div className='flex items-center justify-between'>
                <div className="hidden lg:block cursor-pointer" onClick={onClick}>
                  <h1 className='text-gray-700 text-md md:text-lg'>{link}</h1>
                  <div className='w-[100px] h-[0.5px] bg-black'/>
                </div>
                <div className="flex items-center justify-center h-10 w-10 bg-gray-100 rounded-lg cursor-pointer" onClick={onClick}>
                    <Icon component={icon} color={color}/>
                </div> 
            </div>
            
          
    </div>
  )
}

export default TopBox