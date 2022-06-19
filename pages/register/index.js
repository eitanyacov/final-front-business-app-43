import React, { useState } from 'react'
import axios from 'axios'
import { Alert } from '@mui/material';
import { useRouter } from 'next/router'

const Register = () => {
    const router = useRouter()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [sucssesRegister, setSucssesRegister] = useState("");
    const [address, setAddress] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dealerlicensed, setDealerlicensed] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);

    const postData = (e) => {
        e.preventDefault();
          axios.post("http://localhost:8080/api/admin/add-user", {
            firstName,
            lastName,
            email,
            address,
            companyName,
            phoneNumber,
            dealerlicensed,
            password
          }).then(res => {console.log(res.data), setSucssesRegister("Welcome " + res.data.email +" go to login page")})
          .catch(err => setError(err.response.data))
          setFirstName("")
          setAddress("")
          setCompanyName("")
          setLastName("")
          setDealerlicensed("")
          setEmail("")
          setPhoneNumber("")
          setPassword("")
          // setError("")
          // router.push('/login')
        
    }
   
  return (
    <div className='flex flex-col mx-auto h-fit items-center mt-5 w-fit'>
         <form onSubmit={postData} className='flex flex-col border-t-4 bg-gray-100 border px-5 py-3 rounded-lg'>
           <input type="text" value={firstName} placeholder='first name' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setFirstName(e.target.value)}/>
           <input type="text" value={lastName} placeholder='last name' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setLastName(e.target.value)}/>
           <input type="email" value={email} placeholder='email' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setEmail(e.target.value)}/>
           <input type="text" value={phoneNumber} placeholder='phone number' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setPhoneNumber(e.target.value)}/>
           <input type="text" value={address} placeholder='address' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setAddress(e.target.value)}/>
           <input type="text" value={dealerlicensed} placeholder='dealerlicensed' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setDealerlicensed(e.target.value)}/>
           <input type="text" value={companyName} placeholder='company name' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setCompanyName(e.target.value)}/>
           <input type="password" value={password} placeholder='password' className='bg-white my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setPassword(e.target.value)}/>
           <button type='submit' className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400'>Register</button>
         </form>
         {error != "" && <Alert severity="error">{error}</Alert>}
         {sucssesRegister != "" && <div className='flex space-x-8'>
         <Alert severity="success">{sucssesRegister}</Alert>
         <button onClick={()=> router.push('/login')} className='bg-green-400 rounded-full px-4 hover:bg-green-300'>GO TO LOGIN PAGE</button>
         </div>}
      </div> 
  )
}

export default Register