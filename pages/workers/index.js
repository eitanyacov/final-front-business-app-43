import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import SideBarPage from '../../components/SideBarPage';



const Workers = ({ clients }) => {
  const [user, setUser] = useState({})
  const [workers, setWorkers] = useState([])
  
  const router = useRouter();
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      getWorkers()
      
  }, [user?.id])

  const goToPage = (id) => {
    router.push('/workers/' + id)
  }

 
  const getWorkers = async () => {
    const id = user?.id;
    const response = await fetch(`http://localhost:8080/api/user/all-workers/${id}`);
    const data = await response.json();
    setWorkers(data)
  }

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "fullName",
      headerName: "שם מלא",
      width: 105,
      editable: true,
    },
    
    {
      field: "phoneNumber",
      headerName: "מספר טלפון",
      width: 115,
      editable: true,
    },
    {
      field: "startedAt",
      headerName: "התחלת עבודה",
      // type: 'number',
      width: 105,
      editable: true,
    },
    {
      field: "address",
      headerName: "כתובת",
      // type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: "dob",
      headerName: "תאריך לידה",
      // type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: "idNumber",
      headerName: "ת.ז",
      // type: 'number',
      width: 100,
      editable: true,
    },

    {
      field: "salaryPerHour",
      headerName: "שכר שעתי",
      width: 80,
      editable: true,
    },
    {
      field: "active",
      headerName: "?פעיל",
      width: 60,
      editable: true,
    },
    {
      field: "action",
      headerName: "משכורות",
      width: 150,
      renderCell: () => {
        return (
          <div className="flex space-x-3">
            <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
               משכורות עובד
            </h1>
          </div>
        );
      },
    },
  ];
  
  if(!user) router.push('/login')
  return (
   
    <>
      <SideBarPage />
      
      <div className="h-[530px] w-[82%] ml-[80px] md:ml-[205px] mt-2">
        <DataGrid
          rows={workers}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          disableSelectionOnClick
          onRowClick={(params) => goToPage(params.id)}
          className="cursor-pointer"
        />
      </div>
    </>
  );
};

export default Workers;

export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/api/manger/all-clients");
  const data = await response.json();

  return {
    props: {
      clients: data,
    },
  };
}
