import React, { useState } from 'react'
import { useRouter } from 'next/router'


const Login = () => {
  const [login, setLogin] = useState(true);
  const router = useRouter();
  return (
        <div className='flex flex-col max-w-[1200px] mx-auto min-h-screen items-center mt-10 fixed ml-96'>
         <h1>Login</h1>
         <form action="" className='flex flex-col border px-5 py-3 rounded-lg'>
           <input type="email" placeholder='email' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72'/>
           <input type="password" placeholder='password' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72'/>
           <button className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400'>Login</button>
         </form>
         <button className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400' onClick={()=> router.push("/register")}>Register</button>
      </div>
   
  )
}

export default Login

 



    
    