import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import SideBarPage from '../../components/SideBarPage';

const Workers = ({ clients }) => {
  const [user, setUser] = useState({})
  const router = useRouter();
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      
  }, [])

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    {
      field: "signedAt",
      headerName: "Signed At",
      // type: 'number',
      width: 180,
      editable: true,
    },

    {
      field: "agentName",
      headerName: "Agent Name",
      width: 130,
      editable: true,
    },
  ];
  
  if(!user) router.push('login')
  return (
    // <div>
    //     {
    //         clients.map((client => (
    //             <div key={client.id}>
    //                     <h1>{client.name}</h1>
    //             </div>
    //         )))
    //     }
    // </div>
    <>
      <SideBarPage />

      <div className="h-[500px] w-[80%] ml-[80px] md:ml-[205px] mt-2">
        <DataGrid
          rows={clients}
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
