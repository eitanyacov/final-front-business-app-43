import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import { useRouter } from 'next/router'
import { Select, MenuItem, InputLabel} from '@mui/material'
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';


const Invoice = () => {
  const [user, setUser] = useState({})
  const [id, setId] = useState();
  const [invoice, setInvoice] = useState({})
  const [invoiceId, setInvoiceId] = useState("")
  const [amount, setAmount] = useState()
  const [paidOrNo, setPaidOrNo] = useState("")
  const [date, setDate] = useState("")
  const [paid, setPaid] = useState("")
  const [field, setField] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [invoices, setInvoices] = useState([])
  const [editMode, setEditMode] = useState(false)
  const router = useRouter();

  const arr2 = ["מזומן", "צ'ק", "כרטיס אשראי", "העברה בנקאית", "ביט", "אחר", "-"];

  const arr = ["True", "False"];

  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
     
      
  }, [user?.id])

  useEffect(()=> {
    getInvoices()
  }, [user?.id])

  // const getXxx = () => {
  //   axios.get("`http://localhost:8080/api/user/get-suppliers-by-user/13")
  //   .then(res => {console.log(res.data), setInvoices(res.data)})
  //       .catch(err => console.log(err))
  // }


  const getInvoices = async () => {
    const id = user?.id;
    const response = await fetch(`http://localhost:8080/api/user/get-invoices-per-user/${id}`);
    const data = await response.json()
    console.log(data)
    setInvoices(data)
  }

  const printValues = (e)=> {
    e.preventDefault()
    console.log(amount, date, invoiceId, paidOrNo, paymentMethod)
    axios.post("http://localhost:8080/api/user/update-invoice/" + id, {
      amount: amount != null ? amount : invoice.amount,
      date: date != "" ? date : invoice.date,
      invoiceId: invoiceId != "" ? invoiceId : invoice.invoiceId,
      paidOrNo: paidOrNo != "" ? paidOrNo : invoice.paidOrNo,
      paymentMethod: paymentMethod != "" ? paymentMethod : invoice.paymentMethod,
    }).then(res => {console.log(res.data), setEditMode(false), router.reload()})
    .catch(err => console.log(err))
  }

  // useEffect(()=> {
  //   const id = user?.id
  //   axios.get(`http://localhost:8080/api/user/get-invoices-per-user/${id}`)
  //   .then(res => setInvoices(res.data))
  //   .catch(err => console.log(err))
  // }, [])

  const handleChange2 = (e) => {
    console.log("the value is: " + e.target.value);
    setPaymentMethod(e.target.value)
    
  }

  const handleChange1 = (e) => {
    console.log("the value is: " + e.target.value);
    setPaidOrNo(e.target.value)
    
  }

  const editCell = (params) => {
    setId(params.id)
    if(params.field == 'supplierName') return
    if(params.field == 'id') return
    axios.get("http://localhost:8080/api/user/get-invoice-by-id/" + params.id)
    .then(res => {setInvoice(res.data), setEditMode(true)})
    .catch(err => console.log(err))
    setField(params.field)
  }

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "supplierName",
      headerName: "(לא ניתן לערוך) שם ספק",
      width: 170,          
      // editable: true,
    },
    {
      field: "date",
      headerName: "תאריך חשבונית",
      width: 140,
      editable: true,
    },
    {
      field: "amount",
      headerName: "סכום חשבונית",
      width: 130,
      editable: true,
    },
    {
      field: "invoiceId",
      headerName: "מס' חשבונית",
      // type: 'number',
      width: 150,
      editable: true,
    },

    {
      field: "paymentMethod",
      headerName: "צורת תשלום",
      width: 130,
      editable: true,
    },
    {
      field: "paidOrNo",
      headerName: "?שולם",
      width: 110,
      editable: true,
    },
  ];
  
  if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className="h-[525px] w-[82%] ml-[80px] md:ml-[205px] mt-2">
      {!editMode ? (
        <DataGrid
          rows={invoices}
          columns={columns}
          pageSize={50}
          rowsPerPageOptions={[50]}
          checkboxSelection
          disableSelectionOnClick
          onCellDoubleClick={(params)=> editCell(params)}
          // onRowClick={(params) => goToPage(params.id)}
          className="cursor-pointer"
        />
      ) : (
        <div className='flex justify-center items-center mt-1 h-fit'>
        <form onSubmit={printValues} className='flex flex-col w-[300px] border px-3 py-1 bg-gray-200 rounded-3xl border-t-4 border-gray-500'>
          <div className='text-right'>
          <button className='hover:text-red-600 hover:scale-150 text-2xl text-red-500' onClick={()=> setEditMode(false)}>X</button>
          </div>
          {field == "date" && <>
            <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> תאריך:  </span>{invoice.date}</label>
            <input type="date" value={date} placeholder="עדכן תאריך " className='bg-white rounded-full px-2 py-1' onChange={e => setDate(e.target.value)}/>
          </>
            
          }
          {field == "amount" &&
            <>
            <label className='text-center mb-3'>{invoice.amount} <span className='font-semibold text-xl text-gray-600'> :סכום  </span></label>
            <input type="number" step={0.01} value={amount} placeholder="עדכן סכום " className='bg-white rounded-full px-2 py-1' onChange={e => setAmount(e.target.value)}/>
          </>
  
          }
          {field == "invoiceId" &&
            <>
            <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> מס' חשבונית:  </span> {invoice.invoiceId}</label>
          <input type="text" value={invoiceId} placeholder="עדכן מס' חשבונית" className='bg-white rounded-full px-2 py-1' onChange={e => setInvoiceId(e.target.value)}/>
            </>
          }

       {field == "paymentMethod" &&
        <>
        <InputLabel className='text-center mb-3' id="demo-simple-select-label" >{invoice.paymentMethod} <span className='font-semibold text-xl text-gray-600'> : צורת תשלום </span></InputLabel>
      <Select onChange={handleChange2}>
          {arr2.map(a => (
              <MenuItem value={a}>{a}</MenuItem>
          ))}
       </Select>
        </>
       }
        {field == "paidOrNo" &&
        <>
        <InputLabel className='text-center mb-3' id="demo-simple-select-label" >{invoice.paidOrNo} <span className='font-semibold text-xl text-gray-600'> : ?שולם </span></InputLabel>
      <Select onChange={handleChange1}>
          {arr.map(a => (
              <MenuItem value={a}>{a}</MenuItem>
          ))}
       </Select>
        </>
       }
          <button type='submit' className='bg-blue-400 rounded-full px-2 py-1 my-4 hover:bg-blue-300'>עדכן חשבונית</button>
        </form>
        </div>
      )}
        
      </div>
    </>
  )
}

export default Invoice