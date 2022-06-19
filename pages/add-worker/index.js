import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import SideBarPage from '../../components/SideBarPage';
import { Select, MenuItem, InputLabel} from '@mui/material'
import { Snackbar, Alert } from "@mui/material";


const AddWorker = () => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [startedAt, setStarttedAt] = useState("");
    const [salaryPerHour, setSalaryPerHour] = useState("");
    // const [email, setEmail] = useState("");
    const [isPermanentModel, setIsPermanentModel] = useState();
    const [address, setAddress] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [status, setStatus] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    const [error, setError] = useState([]);

    const arr = [ "נשוי", "גרוש" , "אלמן", "רווק"];

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        
        
    }, [])

    const postData = (e) => {
        e.preventDefault();
          axios.post("http://localhost:8080/api/user/add-worker/" + user?.id, {
            firstName,
            lastName,
            fullName,
            dob,
            startedAt,
            idNumber,
            salaryPerHour,
            // email,
            address,
            status,
            phoneNumber
            
          }).then(res => {console.log(res.data), setOpen(true), router.push('/workers')})
          .catch(error => setError(error.response.data))
          setFirstName("")
          setSalaryPerHour("")
          setStarttedAt("")
          setDob("")
          setLastName("")
          setAddress("")
          setFullName("")
        //   setEmail("")
          setPhoneNumber("")
          setStatus("")
          setError("")
          // router.push('/suppliers')
    }

    const handleChange = (e) => {
        setStatus(e.target.value)
    }

    const handleClose = () => {
      setOpen(false);
    };

    console.log('====================================');
    console.log(user?.id);
    console.log('====================================');
    if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className='flex flex-col mx-auto h-fit border-t-4 border-gray-400 border-l border-r border-b items-center mt-2 bg-gray-100 rounded-lg w-fit'>
         {/* <h1 className='text-2xl font-semibold'>הכנס עובד חדש</h1> */}
         <form onSubmit={postData} className='flex flex-col border px-5 py-2 rounded-lg'>
           <input type="text" value={firstName} placeholder='first name' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setFirstName(e.target.value)}/>
           <input type="text" value={lastName} placeholder='last name' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setLastName(e.target.value)}/>
           <input type="text" value={fullName} placeholder='full name' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setFullName(e.target.value)}/>
           <input type="text" value={address} placeholder='address' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setAddress(e.target.value)}/>
           {/* <input type="email" value={email} placeholder='email' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setEmail(e.target.value)}/> */}
           <input type="text" value={idNumber} placeholder='id number' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setIdNumber(e.target.value)}/>
           <label htmlFor="" className='text-xs text-gray-600 font-semibold'>date of birth</label>
           <input type="date" value={dob} placeholder='date of birth' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setDob(e.target.value)}/>
           <input type="text" value={salaryPerHour} placeholder='salary(hour)' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setSalaryPerHour(e.target.value)}/>
           <input type="text" value={phoneNumber} placeholder='phone number' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setPhoneNumber(e.target.value)}/>
           <label htmlFor="" className='text-xs text-gray-600 font-semibold'>start date</label>
           <input type="date" value={startedAt} placeholder='started date' className='bg-white my-1 rounded-full px-2 py-1 w-72' onChange={(e)=> setStarttedAt(e.target.value)}/>
           {/* <input type="text" value={isPermanent} placeholder='is Permanent' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setIsPermanent(e.target.value)}/> */}
           <InputLabel id="demo-simple-select-label" >סטטוס</InputLabel>
        <Select onChange={handleChange}
        labelId="demo-select-small"
        id="demo-select-small">
            {arr.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
           <button type='submit' className='bg-blue-500 px-20 py-1 mt-2 rounded-full text-white font-semibold hover:bg-blue-400'>הכנס עובד חדש</button>
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

export default AddWorker