import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";


const Invoice = () => {
  const [user, setUser] = useState({})
  const [invoices, setInvoices] = useState([])
  const router = useRouter();

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

  // useEffect(()=> {
  //   const id = user?.id
  //   axios.get(`http://localhost:8080/api/user/get-invoices-per-user/${id}`)
  //   .then(res => setInvoices(res.data))
  //   .catch(err => console.log(err))
  // }, [])

  const clients = [{id: 1, supplierName: "xxx"}, {id: 2, name: "yyy"}, {id: 3, name: "fff"},]
  // paidOrNo,
  // date,
  // supplierName,
  // invoiceId,
  // amount,
  // paymentMethod
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "supplierName",
      headerName: "שם ספק",
      width: 150,          
      editable: true,
    },
    {
      field: "date",
      headerName: "תאריך חשבונית",
      width: 180,
      editable: true,
    },
    {
      field: "amount",
      headerName: "סכום חשבונית",
      width: 150,
      editable: true,
    },
    {
      field: "invoiceId",
      headerName: "מס' חשבונית",
      // type: 'number',
      width: 180,
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
      width: 130,
      editable: true,
    },
  ];
  
  if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className="h-[500px] w-[80%] ml-[80px] md:ml-[205px] mt-1">
        <DataGrid
          rows={invoices}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[7]}
          checkboxSelection
          disableSelectionOnClick
          // onRowClick={(params) => goToPage(params.id)}
          className="cursor-pointer"
        />
      </div>
    </>
  )
}

export default Invoice