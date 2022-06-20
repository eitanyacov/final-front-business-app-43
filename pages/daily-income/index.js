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

 
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "date",
      headerName: "תאריך",
      width: 120,          
      editable: true,
    },
    {
      field: "cashMoney",
      headerName: "מזומן",
      width: 90,
      editable: true,
    },
    {
      field: "creditCard",
      headerName: "כרטיס אשראי",
      width: 120,
      editable: true,
    },
    {
      field: "cheque",
      headerName: "צ'קים",
      // type: 'number',
      width: 90,
      editable: true,
    },

    {
      field: "cibus",
      headerName: "סיבוס",
      width: 90,
      editable: true,
    },
    {
      field: "tenBis",
      headerName: "תן ביס",
      width: 90,
      editable: true,
    },
    {
        field: "wallt",
        headerName: "וולט",
        width: 90,
        editable: true,
      },
      {
        field: "other",
        headerName: "אחר",
        width: 90,
        editable: true,
      },
      {
        field: "total",
        headerName: 'סה"כ', 
        width: 100,
        editable: true,
      },
  ];
  
  if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className="h-[530px] w-[82%] ml-[80px] md:ml-[205px] mt-2">
        <DataGrid
          rows={dailyIncomes}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
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