import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import SideBarPage from "../../components/SideBarPage";

// function UserList({ suppliers }) {
  function UserList() {
  const [user, setUser] = useState({})
  const [suppliers, setSuppliers] = useState([])
  const router = useRouter();

  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      getSuppliers()
      
  }, [user?.id])

  const getSuppliers = async () => {
    const id = user?.id;
    const response = await fetch(`http://localhost:8080/api/user/get-suppliers-by-user/${id}`);
    const data = await response.json();
    setSuppliers(data)
  }

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "name",
      headerName: "Name",
      width: 120,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 140,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 110,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      // type: 'number',
      width: 90,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 120,
      editable: true,
    },
    {
      field: "active",
      headerName: "Active",
      width: 60,
      editable: true,
    },
    {
      field: "isPermanent",
      headerName: "isPermanent",
      width: 85,
      editable: true,
    },
    // {
    //   field: "isActive",
    //   headerName: "isActive",
    //   width: 85,
    //   editable: true,
    // },
    {
      field: "action",
      headerName: "Disable Supplier",
      width: 200,
      renderCell: () => {
        return (
          <div className="flex space-x-3">
            <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
              Disable Supplier
            </h1>
          </div>
        );
      },
    },
  ];

  const goToPage = (id) => {
    // agents.map(a => router.push(`agents/${a.id}`))
    router.push(`suppliers/${id}`);
  };

  if(!user) router.push('login')
  return (
    <>
      <SideBarPage />
      {/* <div className="flex space-x-3">
        <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
          Disable Agent
        </h1>
      </div> */}
      <div className="h-[540px] w-[80%] ml-[80px] md:ml-[205px] mt-2">
        <DataGrid
          rows={suppliers}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          disableSelectionOnClick
          onRowClick={(params) => goToPage(params.id)}
          className="cursor-pointer"
        />
        {/* <h1 className="text-3xl font-bold ml-3 mt-3 text-center">List of Agents</h1>
      {agents.map(a => (
          <Link href={`agents/${a.id}`} passHref>
           <div key={a.id}>
              <Agent name={a.name} email={a.email} date={a.startedAt} clients={a.numberOfClients} />
           </div>
          </Link>
        ))} */}
        
      </div>
    </>
  );
}

export default UserList;

export async function getStaticProps() {
  // const response = await fetch("http://localhost:8080/api/user/get-suppliers-by-user/10");
  // const data = await response.json();
  

  return {
    props: {
      // suppliers: data,
    },
  };
}
