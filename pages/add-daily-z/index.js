import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Alert } from '@mui/material';
import { useRouter } from 'next/router'
import SideBarPage from '../../components/SideBarPage';
import { Input } from '@mui/material'


const DailiZ = () => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [date, setDate] = useState("")
    const [cashMoney, setCash] = useState();
    const [creditCard, setCreditCard] = useState();
    const [cheque, setChecks] = useState();
    const [cibus, setCibus] = useState();
    const [tenBis, setTenBis] = useState();
    const [wallt, setWallt] = useState();
    const [total, settotal] = useState();
    const [other, setOther] = useState();
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState([]);

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
    
    }, [])

    const postData = (e) => {
        e.preventDefault();
          axios.post("http://localhost:8080/api/user/add-daily-income-to-user/" + user?.id, {
            date,
            creditCard,
            cashMoney,
            cheque,
            cibus,
            tenBis,
            wallt,
            total,
            other
          }).then(res => console.log(res.data))
          .catch(error => setError(error.response.data))
          setCash("")
          setChecks("")
          setTenBis("")
          setCibus("")
          setCreditCard("")
          setDate("")
          setOther("")
          settotal("")
          setWallt("")
          setError("")
          setSubmit(false)
          router.push('/daily-income')
    }

    // const handleChange = (e) => {
    //     setIsPermanentModel(e.target.value)
    // }

    // const postDataX = (e) => {
    //     e.preventDefault()
    //     setSubmit(true)
    // }

    const closeFormValidation = () => {
        setSubmit(false);
    }

    console.log('====================================');
    console.log(user?.id);
    console.log('====================================');
    if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    {!submit && <div className='flex flex-col max-w-[1200px] mx-auto min-h-screen items-center mt-3 fixed ml-96'>
         <h1 className='text-2xl font-semibold'>ADD DAILY INCOME</h1>
         <form className='flex flex-col border px-5 py-3 rounded-lg'>
         <Input type='date' value={date} placeholder='add date' onChange={e => setDate(e.target.value)}/>
           <input type="number" value={cashMoney} placeholder='Cash' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setCash(e.target.value)}/>
           <input type="number" value={creditCard} placeholder='Credit Cards' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setCreditCard(e.target.value)}/>
           <input type="number" value={cheque} placeholder='Checks' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setChecks(e.target.value)}/>
           <input type="number" value={cibus} placeholder='Cibus' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setCibus(e.target.value)}/>
           <input type="number" value={tenBis} placeholder='Ten Bis' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setTenBis(e.target.value)}/>
           <input type="number" value={wallt} placeholder='Wallt' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setWallt(e.target.value)}/>
           <input type="number" value={other} placeholder='Other' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setOther(e.target.value)}/>
           <input type="number" value={total} placeholder='Total' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> settotal(e.target.value)}/>
           {/* <input type="text" value={isPermanent} placeholder='is Permanent' className='bg-gray-100 my-1 rounded-full px-2 py-2 w-72' onChange={(e)=> setIsPermanent(e.target.value)}/> */}
           <button type='submit' className='bg-blue-500 px-20 py-2 mt-4 rounded-full text-white font-semibold hover:bg-blue-400' onClick={()=> setSubmit(true)} >ADD INCOME</button>
         </form>
         {error != "" && <Alert severity="error">{error}</Alert>}
      </div> }
      // {
    submit && (
     <div className='flex bg-gray-100 rounded-lg max-w-[450px] mx-auto h-[600-px] mt-1 p-3'>
     <div className='flex flex-col justify-around px-5 w-full'>
       <div className='flex justify-between'>
       <h1 className='text-gray-700 text-2xl font-semibold '>Date : <span className='text-4xl font-bold ml-2 text-gray-600'>{date}</span></h1>
       <h1 className='text-3xl hover:text-red-700 cursor-pointer hover:transition-all hover:scale-125' onClick={closeFormValidation}>X</h1>
     </div>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Cash: <span className='text-4xl font-bold ml-2 text-gray-600'>{cashMoney}</span></h1>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Credit Card :<span className='text-4xl font-bold ml-2 text-gray-600'>{creditCard}</span></h1>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Checks :<span className='text-4xl font-bold ml-2 text-gray-600'>{cheque}</span></h1>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Cibus :<span className='text-4xl font-bold ml-2 text-gray-600'>{cibus}</span></h1>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Ten Bis :<span className='text-4xl font-bold ml-2 text-gray-600'>{tenBis}</span></h1>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Wallt :<span className='text-4xl font-bold ml-2 text-gray-600'>{wallt}</span></h1>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Other :<span className='text-4xl font-bold ml-2 text-gray-600'>{other}</span></h1>
       <h1 className='text-gray-700 text-2xl font-semibold mt-2'>Total :<span className='text-4xl font-bold ml-2 text-gray-600'>{total}</span></h1>
       {/* { invoiceId && <h1 className='text-gray-700 text-2xl font-semibold'>Invoice Id :<span className='text-4xl font-bold ml-2 text-gray-600'>{total}</span></h1>} */}
       <button className='bg-blue-400 rounded-full text-white font-bold mb-2 mt-2 py-1 hover:bg-blue-300'onClick={postData} >Add Invoice</button>
     </div>
  </div>
    )
  }
    </>
  )
}

export default DailiZ



