import React from "react";
import { DataGrid, GridValueGetterParams  } from "@mui/x-data-grid";

const ReportsBar = () => {
  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
      email: "xxx@gmail.com",
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      email: "xxx@gmail.com",
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      email: "xxx@gmail.com",
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      age: 16,
      email: "arya@gmail.com",
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      email: "xxx@gmail.com",
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      email: "xxx@gmail.com",
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      email: "xxx@gmail.com",
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      email: "xxx@gmail.com",
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      age: 65,
      email: "xxx@gmail.com",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
      editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
    ];
 
  return (
    <div className="ml-[80px] md:ml-[205px] mt-3">
        <h1 className="text-2xl text-gray-700 font-semibold ml-3">Reports</h1>
      <div
        style={{
          height: 500,
          width: "95%",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          onCellEditCommit={(paramas)=> console.log(paramas.value)}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ReportsBar;
