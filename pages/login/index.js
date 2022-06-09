import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Alert } from '@mui/material';


const Login = () => {
  // const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [user, setUser] = useState({});
  const [sessionName, setSessionName] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/admin/login", {
      email,
      password
    }).then(res => {console.log(res.data), setUser(res.data), localStorage.setItem("user", JSON.stringify(res.data)), window.location.href = '/';})
    // }).then(res => {console.log(res.data), setUser(res.data), localStorage.setItem("firstName", res.data.firstName), window.location.href = '/';})
    .catch(error => setError(error.response.data))
    setEmail("")
    setPassword("")
    setError("")
    // localStorage.setItem("firstName", user.firstName)
    // localStorage.setItem("lastName", user.lastName)
    localStorage.removeItem("lastName")
    
  }

  return (
        <div className='flex flex-col max-w-[1200px] mx-auto min-h-screen items-center mt-10 fixed ml-96'>
         <h1>Login</h1>
         <form onSubmit={handleSubmit} className='flex flex-col border px-5 py-3 rounded-lg'>
         <input type="email" value={email} placeholder='email' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setEmail(e.target.value)}/>
         <input type="password" value={password} placeholder='password' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setPassword(e.target.value)}/>
           <button type='submit' className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400'>Login</button>
         </form>
         <button className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400' onClick={()=> router.push("/register")}>Register</button>
         {error != "" && <Alert severity="error">{error}</Alert>}
         <h1>{sessionName}</h1>
      </div>
   
  )
}

export default Login

 



    
    