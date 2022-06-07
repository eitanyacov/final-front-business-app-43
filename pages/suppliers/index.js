import { DataGrid } from '@mui/x-data-grid';
import { useRouter } from 'next/router'

function UserList({ suppliers }) {
  const router = useRouter();
  
   const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'name',
      headerName: 'Name',
      width: 130,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 160,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 115,
      editable: true,
    },
    {
      field: 'address',
      headerName: 'Address',
      // type: 'number',
      width: 90,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 120,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      width: 60,
      editable: true,
    },
    {
      field: 'permanent',
      headerName: 'Permanent',
      width: 85,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Disable Agent',
      width: 200,
      renderCell:() => {
        return (
          <div className='flex space-x-3'>
            <h1 className='bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer'>Disable Agent</h1>
          </div>
        )
      }
    },
    
  ];

  const goToPage = (id) => {
    // agents.map(a => router.push(`agents/${a.id}`))
      router.push(`suppliers/${id}`)
   
  }

  return (
  
    <div className='h-[540px] w-[80%] ml-[80px] md:ml-[205px] mt-2'> 
        <DataGrid
        rows={suppliers}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        disableSelectionOnClick
        onRowClick={(params) => goToPage(params.id)}
        className='cursor-pointer'
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
  );
}

export default UserList;

export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/api/supplier/all-suppliers");
  const data = await response.json();

  return {
    props: {
      suppliers: data,
    },
  };
}
