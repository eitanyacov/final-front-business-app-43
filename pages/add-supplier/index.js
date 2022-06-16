import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import SideBarPage from '../../components/SideBarPage';
import { Select, MenuItem, InputLabel} from '@mui/material'
import { Snackbar, Alert } from "@mui/material";


const AddSupplier = () => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isPermanentModel, setIsPermanentModel] = useState();
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState([]);

    const arr = ["True", "False"];

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        
        
    }, [])

    const postData = (e) => {
        e.preventDefault();
          axios.post("http://localhost:8080/api/user/add-supplier/" + user?.id, {
            name,
            email,
            address,
            isPermanentModel,
            phoneNumber,
            description,
          }).then(res => {console.log(res.data), setOpen(true), router.push('/suppliers')})
          .catch(error => setError(error.response.data))
          setName("")
          setAddress("")
          setDescription("")
          setEmail("")
          setPhoneNumber("")
          setIsPermanentModel("")
          setError("")
          // router.push('/suppliers')
    }

    const handleChange = (e) => {
        setIsPermanentModel(e.target.value)
    }

    const handleClose = () => {
      setOpen(false);
    };

    console.log('====================================');
    console.log(user?.id);
    console.log('====================================');
    if(!user) router.push('login')
  return (
    <>
    <SideBarPage />
    <div className='flex flex-col max-w-[1200px] mx-auto min-h-screen items-center mt-3 fixed ml-96'>
         <h1 className='text-2xl font-semibold'>ADD NEW SUPPLIER</h1>
         <form onSubmit={postData} className='flex flex-col border px-5 py-3 rounded-lg'>
           <input type="text" value={name} placeholder='name' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setName(e.target.value)}/>
           <input type="email" value={email} placeholder='email' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setEmail(e.target.value)}/>
           <input type="text" value={phoneNumber} placeholder='phone number' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setPhoneNumber(e.target.value)}/>
           <input type="text" value={address} placeholder='address' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setAddress(e.target.value)}/>
           <input type="text" value={description} placeholder='description' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setDescription(e.target.value)}/>
           {/* <input type="text" value={isPermanent} placeholder='is Permanent' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setIsPermanent(e.target.value)}/> */}
           <InputLabel id="demo-simple-select-label" >isPermanent</InputLabel>
        <Select onChange={handleChange}>
            {arr.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
           <button type='submit' className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400'>ADD SUPPLIER</button>
         </form>
         {error != "" && <Alert severity="error">{error}</Alert>}
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Addede a success message!
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert> */}
         
      </div> 
    </>
  )
}

export default AddSupplier