import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios'



const Invoice = () => {
  const [user, setUser] = useState({})
  const [dailyIncomes, setDailyIncomes] = useState([])
  const router = useRouter();

  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
       
  }, [user?.id])

  useEffect(()=> {
    axios.get("http://localhost:8080/api/user/get-daily-income-by-user/" + user?.id)
    .then(res => setDailyIncomes(res.data))
    .catch(err => console.log(err))
    
  }, [user?.id])

 
  const clients = [{id: 1, supplierName: "xxx"}, {id: 2, name: "yyy"}, {id: 3, name: "fff"},]
  
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "date",
      headerName: "Date",
      width: 130,          
      editable: true,
    },
    {
      field: "cashMoney",
      headerName: "Cash",
      width: 100,
      editable: true,
    },
    {
      field: "creditCard",
      headerName: "Credit Card",
      width: 120,
      editable: true,
    },
    {
      field: "cheque",
      headerName: "Checks",
      // type: 'number',
      width: 90,
      editable: true,
    },

    {
      field: "cibus",
      headerName: "Cibus",
      width: 90,
      editable: true,
    },
    {
      field: "tenBis",
      headerName: "Ten Bis",
      width: 90,
      editable: true,
    },
    {
        field: "wallt",
        headerName: "Wallt",
        width: 90,
        editable: true,
      },
      {
        field: "other",
        headerName: "Other",
        width: 90,
        editable: true,
      },
      {
        field: "total",
        headerName: "Total",
        width: 100,
        editable: true,
      },
  ];
  
  if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className="h-[500px] w-[80%] ml-[80px] md:ml-[205px] mt-1">
        <DataGrid
          rows={dailyIncomes}
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