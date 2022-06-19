import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import SideBarPage from '../../components/SideBarPage'

const salaries = () => {
    const [user, setUser] = useState({})
    const [salaries, setSaleries] = useState([])

    // useEffect(()=> {
    //     const res = localStorage.getItem("user")
    //     const result = JSON.parse(res)
    //     setUser(result)
    //     getWorkers()
        
    // }, [user?.id])
  
   
    // const getWorkers = async () => {
    //   const id = user?.id;
    //   const response = await fetch(`http://localhost:8080/api/user/all-workers/${id}`);
    //   const data = await response.json();
    //   setWorkers(data)
    // }

    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        {
          field: "שם עובד/ת",
          headerName: "שם עובד/ת",
          width: 110,
          editable: true,
        },
        
        {
          field: "עבור חודש",
          headerName: "עבור חודש",
          width: 120,
          editable: true,
        },
        {
          field: "מספר שעות",
          headerName: "מספר שעות",
          // type: 'number',
          width: 105,
          editable: true,
        },
        {
          field: "שעות נוספות",
          headerName: "שעות נוספות",
          // type: 'number',
          width: 100,
          editable: true,
        },
        {
          field: "סכום משכורת",
          headerName: "סכום משכורת מלא",
          // type: 'number',
          width: 120,
          editable: true,
        },
        {
          field: "מס הכנסה",
          headerName: "מס הכנסה",
          // type: 'number',
          width: 100,
          editable: true,
        },
    
        {
          field: "ביטוח לאומי",
          headerName: "ביטוח לאומי",
          width: 100,
          editable: true,
        },
        {
            field: "ביטוח לאומי",
            headerName: "משכורת נטו",
            width: 100,
            editable: true,
          },
        
        // {
        //   field: "action",
        //   headerName: "משכורות",
        //   width: 200,
        //   renderCell: () => {
        //     return (
        //       <div className="flex space-x-3">
        //         <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
        //           משכורות
        //         </h1>
        //       </div>
        //     );
        //   },
        // },
      ];


  return (
    <>
    <SideBarPage />
    <div className="h-[500px] w-[80%] ml-[80px] md:ml-[205px] mt-1">
        <DataGrid
          rows={salaries}
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

export default salaries