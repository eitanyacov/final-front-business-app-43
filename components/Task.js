import React, { useState } from "react";
import { Icon } from "@mui/material"
import Switch from '@mui/material/Switch';

const Task = ({ title, date, icon, color }) => {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  return (
    <div className='flex flex-col justify-between w-[90px] md:w-[220px] h-[100px] bg-white shadow-xl border mt-5 rounded-2xl p-3 cursor-pointer'>
        <div className="flex justify-between">
        <h1 className='text-gray-500 text-md md:text-sm'>{title}</h1>
        <Switch
          checked={checked}
          onChange={handleChange}
          size='small'
          inputProps={{ 'aria-label': 'controlled' }}/>  
        </div>
        
        <div>

        </div>
            <div className='flex items-center justify-between'>
                <div className="hidden lg:block cursor-pointer" >
                <div className='w-[100px] h-[0.5px] bg-black'/>
                <h1 className='text-gray-700 text-md font-semibold md:text-sm'>{date}</h1>
                </div>
                <div className="flex items-center justify-center h-5 w-5 bg-gray-100 rounded-lg cursor-pointer">
                    <Icon component={icon} color={color}/>
                </div> 
            </div>
            
          
    </div>
  )
}

export default Task