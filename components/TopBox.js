import { Icon } from "@mui/material"

const TopBox = ({ title, amount, link, icon, color, onClick, bgIcon }) => {
  const month = new Date().getMonth().toLocaleString()
  const xxx = parseInt(month) + 1
  const year = new Date().getFullYear().toLocaleString()
  
  return (
    <div className="flex flex-col justify-between text-center bg-white w-[100px] md:w-[250px] h-[140px] shadow-xl border mt-3 rounded-2xl p-1">
        <h1 className='text-gray-600 font-mono font-bold text-md md:text-3xl'>{title}</h1>
        <h1 className="text-md font-mono text-blue-900">{`${year}-${xxx} חודש`}</h1>
        <h1 className='text-gray-500 font-mono text-md md:text-2xl'>{amount}</h1>
        <div>

        </div>
            <div className='flex items-center justify-between'>
                <div className="hidden lg:block ml-1 cursor-pointer" onClick={onClick}>
                  <h1 className='text-gray-800 text-md md:text-xl'>{link}</h1>
                  <div className='w-[100px] h-[0.5px] bg-black'/>
                </div>
                <div className={`flex items-center relative right-1 bottom-1 justify-center h-10 w-10 rounded-lg ${bgIcon} cursor-pointer`} onClick={onClick}>
                    <Icon component={icon} color={color}/>
                </div> 
            </div>
            
          
    </div>
  )
}

export default TopBox