import React, { useState } from "react";
import { Icon } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Switch from '@mui/material/Switch';
import { useRouter } from "next/router";
import axios from "axios";


const Task = ({ title, date, icon, color, id, isChecked }) => {
  const [checked, setChecked] = useState(isChecked)
  const [user, setUser] = useState({});

  const router = useRouter();

 
  const handleChange = () => {
    setChecked(!checked)
    console.log(id)
    axios.get("http://localhost:8080/api/user/set-urgent-task/" + id)
    .then(res => {console.log(res.data), router.reload()})
    .catch(err => console.log(err))

  }



  const deleteTask = () => {
    axios.delete("http://localhost:8080/api/user/delete-task/" + id)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    router.reload()

  }


  
  return (
    <div className='flex flex-col border-l-4 border-green-500 justify-between w-[90px] md:w-[220px] h-fit bg-white shadow-xl border mt-4 rounded-2xl p-2 cursor-pointer'>
        <div className="flex justify-between">
        <h1 className='text-gray-500 text-sm md:text-sm'>{title}</h1>
        <div className="flex items-center">
        <div>
        <Switch
          checked={checked}
          onChange={handleChange}
          size='small'
          inputProps={{ 'aria-label': 'controlled' }}/>
        </div>
          <div onClick={deleteTask}>
          <DeleteForeverIcon className="text-red-400 hover:scale-125 transition-all duration-150 ease-out" fontSize="small" /> 
          </div>
        </div>
        
        </div>
        
        <div>

        </div>
            <div className='flex items-center justify-between'>
                <div className="hidden lg:block cursor-pointer" >
                  <div>
                  <div className='w-[100px] h-[0.5px] bg-black'/>
                  <div className="flex space-x-2">
                  <h1 className='text-gray-700 text-sm font-semibold md:text-xs'>{date}</h1>
                  {checked && <p className="text-xs font-semibold text-red-700">דחוף</p>}
                  </div>
                  
                  </div> 
                  
                </div>
                <div className="flex items-center justify-center h-5 w-5 bg-gray-100 rounded-lg cursor-pointer">
                    <Icon component={icon} color={color}/>
                </div> 
            </div>
            
          
    </div>
  )
}

export default Task