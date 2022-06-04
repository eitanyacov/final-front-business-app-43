// import Link from "next/link";
// import { Agent } from "../../components/Agent";
import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router'

function UserList({ agents }) {
  const router = useRouter();
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, email: 'xxx@gmail.com' },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, email: 'xxx@gmail.com' },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, email: 'xxx@gmail.com' },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, email: "arya@gmail.com" },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, email: 'xxx@gmail.com' },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150, email: 'xxx@gmail.com' },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, email: 'xxx@gmail.com' },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, email: 'xxx@gmail.com' },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, email: 'xxx@gmail.com' },
  // ];

  // const columns = [
  //   { field: 'id', headerName: 'ID', width: 90 },
  //   {
  //     field: 'firstName',
  //     headerName: 'First name',
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: 'lastName',
  //     headerName: 'Last name',
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: 'age',
  //     headerName: 'Age',
  //     type: 'number',
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: 'email',
  //     headerName: 'Email',
  //     width: 110,
  //     editable: true,
  //   },
    
  // ];

   const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 180,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
      editable: true,
    },
    {
      field: 'startedAt',
      headerName: 'Started At',
      // type: 'number',
      width: 180,
      editable: true,
    },
    {
      field: 'numberOfClients',
      headerName: 'Clients',
      width: 80,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 80,
      editable: true,
    },
    
  ];

  const goToPage = (id) => {
  
    // agents.map(a => router.push(`agents/${a.id}`))
      router.push(`agents/${id}`)
   
   
  }

  return (
    
    <div>
      <h1 className="text-3xl font-semibold mb-3 mt-3 text-center">Agents list</h1>
       <div style={{ height: 500, width: '100%', marginLeft: '10px', marginTop: '10px' }}>
      <DataGrid
        rows={agents}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(params) => goToPage(params.id)}
        className='cursor-pointer'
      />
    </div>
      {/* <h1 className="text-3xl font-bold ml-3 mt-3 text-center">List of Agents</h1>
      {agents.map(a => (
          <Link href={`agents/${a.id}`} passHref>
           <div key={a.id}>
              <Agent name={a.name} email={a.email} date={a.startedAt} clients={a.numberOfClients} />
           </div>
          </Link>
        ))} */}
     
     
    </div>
  );
}

export default UserList;

export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/api/manger/all/agents");
  const data = await response.json();

  return {
    props: {
      agents: data,
    },
  };
}
