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
  const [supplierName, setSupplierName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [paidOrNo, setIsPaidOrNo] = useState("");
  const [submit, setSubmit] = useState(false);
  const [supplierId, setSupplierId] = useState();
  const [supplier, setSupplier] = useState({});
  const inputRef = useRef(null);

  const [user, setUser] = useState({})
  const router = useRouter();

  const arr = ["True", "False"];
  const arr2 = ["Cash", "Check", "Credit Card", "Bank Transfer", "Other"];

  useEffect(()=> {
      const id = user?.id;
      axios.get(`http://localhost:8080/api/user/get-suppliers-by-user/${id}`)
      .then(res => setSuppliers(res.data))
      .catch(err => console.log(err))
      
  }, [user?.id])
  
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
  
  }, [user?.id])

//   useEffect(()=> {
//     const res = localStorage.getItem("user")
//     const result = JSON.parse(res)
//     setUser(result)
//     getSuppliers()
    
// }, [user?.id])

// const getSuppliers = async () => {
//   const id = user?.id;
  // const response = await fetch(`http://localhost:8080/api/user/get-suppliers-by-user/${id}`);
  // const data = await response.json();
  // setSuppliers(JSON.stringify(data))
  // setSuppliers(data)
// }
  

  // useEffect(()=> {
  //   getSupplier();
  // }, [val])

  // const getSupplier = async () => {
  //   const response = await fetch("http://localhost:8080/api/user/" + val);
  //   const data = await response.json();
  //   // console.log(data);
  //   setSupplier(data);
    
  // }
  
  const addInvoice = () => {
    // axios.post(`http://localhost:8080/api/user/add-invoice-to-user/${user?.id}/18`, {
      axios.post("http://localhost:8080/api/user/add-invoice-to-user/" + user?.id + "/" + supplierId , {
      paidOrNo,
      date,
      supplierName,
      invoiceId,
      amount,
      paymentMethod
    }).then(res => console.log(res)) 
      .catch(err=> console.log(err))

      setDate("");
      setAmount("");
      setSupplier({});
      setSupplierName("");
      setIsPaidOrNo("")
      setInvoiceId("")
      setPaymentMethod("")
      setSubmit(false)

      router.push('/invoice')
  }
  
  const closeFormValidation = () => {
    setDate("");
    setAmount("");
    setSupplier({});
    setSupplierName("");
    setIsPaidOrNo("")
    setInvoiceId("")
    setPaymentMethod("")
    setSubmit(false)
  }


  const handleChange = (e) => {
    console.log("the value is: " + e.target.value);
    setSupplierName(e.target.value)
    // setVal(e.target.value);

  }

  const handleChange2 = (e) => {
    console.log("the value is: " + e.target.value);
    setIsPaidOrNo(e.target.value)
    // setVal(e.target.value);

  }

  const handleChange3 = (e) => {
    console.log("the value is: " + e.target.value);
    setPaymentMethod(e.target.value)
    // setVal(e.target.value);

  }

  const saveSupplierId = event => {
    const { myValue } = event.currentTarget.dataset;
    console.log(myValue) // --> 123
    const x = parseInt(myValue)
    setSupplierId(myValue)

}

  
  // console.log(supplier)
  // console.log(val)
  console.log("name: " + supplierName)

  console.log("supplier Id: " + supplierId)
  console.log(suppliers)
  if(!user) router.push('login')
  const x = parseInt("11")
  console.log(x)
  return (
    <>
  
    <SideBarPage/>
    <div className='flex justify-center ml-[80px] md:ml-[205px] mt-10'>
 { !submit && <FormControl className='w-96'>
  <InputLabel id="demo-simple-select-label" >Supplier</InputLabel>
  <Select
    // labelId="demo-simple-select-label"
    // id="demo-simple-select"
    value={supplierName}
    label="Supplier"
    onChange={handleChange}
  >
    {suppliers.map((supplier)=> (
        // <MenuItem value={supplier.id} title={supplier.name}>{supplier.name}</MenuItem>
        <MenuItem value={supplier.name} data-my-value={supplier.id} onClick={saveSupplierId}>{supplier.name}</MenuItem>
    ))}
  </Select>
   
  <Input type='date' value={date} placeholder='add date' onChange={e => setDate(e.target.value)}/>
  <Input type='number' value={amount} placeholder='add amount' onChange={e => setAmount(e.target.value)}/>
  <InputLabel id="demo-simple-select-label" className='mt-32'>Is Paid?</InputLabel>
        <Select onChange={handleChange2} className='mt-2' value={paidOrNo} label="Is Paid?">
        
            {arr.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
         <InputLabel id="demo-simple-select-label" className='mt-48'>Paiment Method</InputLabel>
        <Select onChange={handleChange3} className='mt-2' value={paymentMethod} label="Is Paid?">
        
            {arr2.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
         <Input type='number' value={invoiceId} placeholder='invice id' onChange={e => setInvoiceId(e.target.value)}/>

  <Button disabled={date == "" || !amount || supplierName == "" || paidOrNo == "" || paymentMethod == ""} onClick={() => setSubmit(true)}>Click to watch before submit</Button>
</FormControl>}

   {
     submit && (
      <div className='flex bg-gray-100 rounded-lg max-w-5xl mx-auto h-[350px] mt-3 p-3'>
      <div className='flex flex-col justify-around px-5 w-full'>
        <div className='flex justify-between'>
        <h1 className='text-gray-700 text-2xl font-semibold '>Supplier : <span className='text-4xl font-bold ml-2 text-gray-600'>{supplierName}</span></h1>
        <h1 className='text-3xl hover:text-red-700 cursor-pointer hover:transition-all hover:scale-125' onClick={closeFormValidation}>X</h1>
      </div>
        <h1 className='text-gray-700 text-2xl font-semibold'>Amount: <span className='text-4xl font-bold ml-2 text-gray-600'>{amount}</span></h1>
        <h1 className='text-gray-700 text-2xl font-semibold'>Date :<span className='text-4xl font-bold ml-2 text-gray-600'>{date}</span></h1>
        <h1 className='text-gray-700 text-2xl font-semibold'>Is Paid? :<span className='text-4xl font-bold ml-2 text-gray-600'>{paidOrNo}</span></h1>
        <h1 className='text-gray-700 text-2xl font-semibold'>Payment Method :<span className='text-4xl font-bold ml-2 text-gray-600'>{paymentMethod}</span></h1>
        { invoiceId && <h1 className='text-gray-700 text-2xl font-semibold'>Invoice Id :<span className='text-4xl font-bold ml-2 text-gray-600'>{invoiceId}</span></h1>}
        <button className='bg-blue-400 rounded-full text-white font-bold mb-2 mt-2 py-1 hover:bg-blue-300' onClick={addInvoice} >Add Invoice</button>
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