import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Alert } from '@mui/material';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [sessionName, setSessionName] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/admin/login", {
      email,
      password
    }).then(res => {localStorage.setItem("user", JSON.stringify(res.data)), window.location.href = '/';})
    .catch(error => setError(error.response.data))
    setEmail("")
    setPassword("")
    setError("")
   
  }

  return (
        <div className='flex justify-center h-fit mt-10'>
          <form onSubmit={handleSubmit} className='flex flex-col bg-gray-100 border px-5 py-3 rounded-lg'>
          <h1 className='text-center text-2xl font-semibold text-gray-500'>LOGIN FORM</h1>
         <div className='flex flex-col mb-6 mt-1'>
         <input type="email" value={email} placeholder='email' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setEmail(e.target.value)}/>
         <div className='flex justify-end mt-2'>
          <a href="/">
          <p className='text-sm text-blue-500'>Forget Password?</p>
          </a>
         </div>
         <input type="password" value={password} placeholder='password' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setPassword(e.target.value)}/>
         <div className='flex items-center space-x-1 mt-2 ml-1'>
         <input type="checkbox"/>
         <p className='text-xs font-semibold'>Remember me</p>
         </div>
         </div>
           <button type='submit' className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400'>Login</button>
           <button className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400' onClick={()=> router.push("/register")}>Register</button>
           {error != "" && <div className='mt-2'><Alert severity="error">{error}</Alert></div>}
         </form>
         
         <h1>{sessionName}</h1>
      </div>
   
  )
}

export default Login

 



    
    