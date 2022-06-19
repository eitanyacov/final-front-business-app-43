import React, { useState, useEffect, useRef } from 'react'
import { FormControl, Select, MenuItem, InputLabel, Input, Button } from '@mui/material'
// import { DataGrid } from '@mui/x-data-grid';
import SideBarPage from '../../components/SideBarPage';
import axios from 'axios'
import { useRouter } from 'next/router'

const Reports = () => {
  const [val, setVal] = useState();
  const [suppliers, setSuppliers] = useState([]);
  const [amount, setAmount] = useState();
  const [month, setMonth] = useState("");
  const [hours, setHours] = useState();
  const [extraHours, setExtraHours] = useState();
  const [workerFullName, setWorkerFullname] = useState("");
  const [workers, setWorkers] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [workerId, setWorkerId] = useState();
  const inputRef = useRef(null);
  const [user, setUser] = useState({})
  const router = useRouter();

  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

 
  useEffect(()=> {
      const id = user?.id;
      axios.get(`http://localhost:8080/api/user/all-workers/${id}`)
      .then(res => setWorkers(res.data))
      .catch(err => console.log(err))
      
  }, [user?.id])
  
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
  
  }, [user?.id])


  
  const addSalary = () => {
    // axios.post(`http://localhost:8080/api/user/add-invoice-to-user/${user?.id}/18`, {
      axios.post("http://localhost:8080/api/user/add-salary-to-user/" + user?.id + "/" + workerId , {
      workerFullName,
      hours,
      extraHours,
      month,
      amount,
    }).then(res => console.log(res)) 
      .catch(err=> console.log(err))

      setWorkerFullname("");
      setAmount("");
      setHours("");
      setExtraHours("")
      setMonth("")
      setSubmit(false)

      router.push('/salaries')
  }
  
  const closeFormValidation = () => {
    setWorkerFullname("");
    setAmount("");
    setHours("");
    setExtraHours("")
    setMonth("")
    setSubmit(false)
  }
  const handleMonths = (e) => {
        setMonth(e.target.value)
  }

  const handleChange = (e) => {
    console.log("the value is: " + e.target.value);
    setWorkerFullname(e.target.value)
    // setVal(e.target.value);

  }


  const saveWorkerId = event => {
    const { myValue } = event.currentTarget.dataset;
    console.log(myValue) // --> 123
    const x = parseInt(myValue)
    setWorkerId(myValue)

}


  if(!user) router.push('/login')
 
  return (
    <>
  
    <SideBarPage/>
    <div className='flex flex-col mx-auto h-fit items-center justify-center mt-4 w-fit'>
 { !submit && <FormControl className='w-96'>
  <InputLabel id="demo-simple-select-label" >בחר עובד/ת</InputLabel>
  <Select
    value={workerFullName}
    label="Supplier"
    onChange={handleChange}
  >
    {workers.map((worker)=> (
        // <MenuItem value={supplier.id} title={supplier.name}>{supplier.name}</MenuItem>
        <MenuItem value={worker.fullName} data-my-value={worker.id} onClick={saveWorkerId}>{`${worker.fullName} ${worker.idNumber}`}</MenuItem>
    ))}
  </Select>
       
           <Input type="number" value={amount} placeholder='סכום' className='bg-white-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setAmount(e.target.value)}/>
           <InputLabel id="demo-simple-select-label" className='mt-[112px]'>עבור חודש</InputLabel>
           <Select onChange={handleMonths}>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
           <Input type="number" value={hours} placeholder='מספר שעות' className='bg-white-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setHours(e.target.value)}/>
           <Input type="number" value={extraHours} placeholder='שעות נוספות' className='bg-white-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setExtraHours(e.target.value)}/>
       
  {/* <Input type='number' value={amount} placeholder='add amount' onChange={e => setAmount(e.target.value)}/> */}
 
  <Button disabled={workerFullName == "" || !amount || month == ""} onClick={() => setSubmit(true)}>Click to watch before submit</Button>
</FormControl>}

   {
     submit && (
      <div className='flex bg-gray-100 rounded-lg max-w-5xl mx-auto h-[350px] mt-3 p-3'>
      <div className='flex flex-col justify-around px-5 w-full'>
        <div className='flex justify-between'>
        <h1 className='text-gray-700 text-2xl font-semibold '>עובד : <span className='text-4xl font-bold ml-2 text-gray-600'>{workerFullName}</span></h1>
        <h1 className='text-3xl hover:text-red-700 cursor-pointer hover:transition-all hover:scale-125' onClick={closeFormValidation}>X</h1>
      </div>
        <h1 className='text-gray-700 text-2xl font-semibold'>סכום : <span className='text-4xl font-bold ml-2 text-gray-600'>{amount}</span></h1>
        <h1 className='text-gray-700 text-2xl font-semibold'>עבור חודש :<span className='text-4xl font-bold ml-2 text-gray-600'>{month}</span></h1>
        {hours &&<h1 className='text-gray-700 text-2xl font-semibold'>מספר שעות :<span className='text-4xl font-bold ml-2 text-gray-600'>{hours}</span></h1>}
        {extraHours &&<h1 className='text-gray-700 text-2xl font-semibold'>שעות נוספות :<span className='text-4xl font-bold ml-2 text-gray-600'>{extraHours}</span></h1>}
        <button className='bg-blue-400 rounded-full text-white font-bold mb-2 mt-2 py-1 hover:bg-blue-300' onClick={addSalary} >Add Invoice</button>
      </div>
   </div>
     )
   }
    </div>
    </>

   
  )
}

export default Reports

// export async function getStaticProps() {
 
//   const response = await fetch(`http://localhost:8080/api/user/get-suppliers-by-user/10`);
//   const data = await response.json();

//   return {
//     props: {
//       suppliers: data,
//     },
//   };
// }