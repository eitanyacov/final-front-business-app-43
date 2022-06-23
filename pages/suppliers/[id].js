import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import { Select, MenuItem, InputLabel} from '@mui/material'
import SideBarPage from '../../components/SideBarPage';
import axios from 'axios';


export async function getStaticPaths() {
  
// option one is to get all the suppliers in the system, cause i cannot get the user id inside the getStaticPathes
    // const response = await fetch("http://localhost:8080/api/admin/all-suppliers");
    // const data = await response.json();
    // const paths = data.map(a => {
    //     return {
    //         params: {
    //             id: a.id.toString()
    //         }
    //     }
    // })

    //option two is to prerender big number (maybe option one is better, cause if you will have more suppliers than the number it will be a problem)
    const arr = []
    for(let i = 0; i < 50000; i++) {
      arr.push(i)
    }
    const paths = arr.map(a => {
   
    return {
      params: {
          id: a.toString()
      }
  }
})

    return {
      // paths: [
      //         { params: { id: '1'} },
      //         { params: { id: '2'} },
      //         { params: { id: '3'} },
      //         { params: { id: '4'} },
      //         { params: { id: '5'} },
      //         { params: { id: '6'} },
      //         { params: { id: '7'} },
      //         { params: { id: '8'} },
      //         { params: { id: '9'} },
      //         { params: { id: '10'} },
      //         { params: { id: '11'} },
      //         { params: { id: '12'} },
      //         { params: { id: '13'} },
      //         { params: { id: '14'} },
            
            // ],
        paths,
        fallback: false // false or 'blocking'
        
    }

}

const SupplierPage = ({ invoices, supplier }) => {
    const [user, setUser] = useState({})
    const [invoice, setInvoice] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState();
    const [invoiceId, setInvoiceId] = useState("")
    const [amount, setAmount] = useState()
    const [paidOrNo, setPaidOrNo] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [date, setDate] = useState("")
    const [field, setField] = useState("")
    // const [supplier, setSupplier] = useState({})
    // const [invoices, setInvoices] = useState([])
    const router = useRouter()

    const arr2 = ["Cash", "Check", "Credit Card", "Bank Transfer", "Other"];

    const arr = ["True", "False"];
    
    
    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
    }, [])


    // useEffect(()=> {
    //     axios.get(`http://localhost:8080/api/user/get-invoices-by-supplier-per-user/${id}`)
    //     .then(res => {console.log(res.data), setInvoices(res.data)})
    //     .catch(err => console.log(err))
    // }, [id])

    const editCell = (params) => {
      setId(params.id)
      if(params.field == 'supplierName') return
      if(params.field == 'id') return
      axios.get("http://localhost:8080/api/user/get-invoice-by-id/" + params.id)
      .then(res => {setInvoice(res.data), setEditMode(true)})
      .catch(err => console.log(err))
      setField(params.field)
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

    const handleChange2 = (e) => {
      console.log("the value is: " + e.target.value);
      setPaymentMethod(e.target.value)
      
    }
  
    const handleChange1 = (e) => {
      console.log("the value is: " + e.target.value);
      setPaidOrNo(e.target.value)
      
    }

    const columns = [
      { field: "id", headerName: "ID", headerAlign: 'center', width: 70 },
      {
        field: "supplierName",
        headerName: "שם ספק (לא ניתן לערוך)",
        width: 170,
        align: "center",
        headerAlign: 'center',          
        editable: true,
      },
      {
        field: "date",
        headerName: "תאריך חשבונית",
        width: 150,
        headerAlign: 'center',
        align: "center",
        editable: true,
      },
      {
        field: "amount",
        headerName: "סכום חשבונית",
        headerAlign: 'center',
        width: 140,
        align: "center",
        editable: true,
      },
      {
        field: "invoiceId",
        headerName: "מס' חשבונית",
        headerAlign: 'center',
        // type: 'number',
        width: 160,
        align: "center",
        editable: true,
      },
  
      {
        field: "paymentMethod",
        headerName: "צורת תשלום",
        headerAlign: 'center',
        align: "center",
        width: 130,
        editable: true,
      },
      {
        field: "paidOrNo",
        headerName: "?שולם",
        headerAlign: 'center',
        align: "center",
        width: 130,
        editable: true,
      },
    ];

  
    if(!user) router.push('/login')
    return (
        <>
        <SideBarPage />
        <div className='flex justify-around ml-[80px] md:ml-[200px] space-x-4 mt-2'>
            <h1 className='text-lg font-semibold'>כתובת : <span className='text-sm'>{supplier?.address}</span></h1>
            <h1 className='text-lg font-semibold'>תיאור : <span className='text-sm'>{supplier?.description}</span></h1>
            <h1 className='text-lg font-semibold'>טלפון : <span className='text-sm'>{supplier?.phoneNumber}</span></h1>
            <h1 className='text-lg font-semibold'><span className='text-sm'>{supplier?.email}</span> : אימייל</h1>
            <h1 className='text-lg font-semibold'>שם ספק : <span className='text-sm'>{supplier?.name}</span></h1>
            <div className="flex space-x-3" onClick={()=> router.back()}>
            <h1 className="bg-slate-100 mr-3 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
               חזרה לספקים
            </h1>
          </div>
        </div>
        <div className="h-[490px] w-[82%] ml-[80px] md:ml-[205px] mt-1">
        {!editMode ? (
          <Box
          sx={{
            height: 535,
            width: '100%',
            '& .cold': {
              backgroundColor: 'white',
              color: 'red',
              fontWeight: '500',
              borderRadius: '25%'
            },
            '& .hot': {
              backgroundColor: 'white',
              color: 'green',
              fontWeight: 'bold',
              borderRadius: '25%'
            },
          }}
        >
          <DataGrid
          rows={invoices}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          disableSelectionOnClick
          onCellDoubleClick={(params)=> editCell(params)}
          // onRowClick={(params) => goToPage(params.id)}
          className="cursor-pointer"
          getCellClassName={(params) => {
            if (params.field == 'paidOrNo') {
              return params.value == "True" ? 'hot' : 'cold';
            }
            return '';
          }}
        />
        </Box>
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
            <input type="number" value={amount} placeholder="עדכן סכום " className='bg-white rounded-full px-2 py-1' onChange={e => setAmount(e.target.value)}/>
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

export default SupplierPage

export async function getStaticProps(context) {
    const { params } = context;
    const id = params.id
    const response = await fetch(`http://localhost:8080/api/user/get-invoices-by-supplier-per-user/${id}`);
        const data = await response.json();
    
        const res = await fetch(`http://localhost:8080/api/user/supplier-by-id/${id}`);
        const result = await res.json();


   return {
       props: {
           invoices: data,
           supplier: result
       },
   }
}






    
        



