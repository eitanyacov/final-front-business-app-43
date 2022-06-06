import { DataGrid } from '@mui/x-data-grid';

const Clients = ({ clients }) => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
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
          field: 'signedAt',
          headerName: 'Signed At',
          // type: 'number',
          width: 180,
          editable: true,
        },
        
        {
          field: 'agentName',
          headerName: 'Agent Name',
          width: 130,
          editable: true,
        },
        
      ];
    
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
         <div className='h-[500px] w-[80%] ml-[80px] md:ml-[205px] mt-2'>
      <DataGrid
        rows={clients}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
        disableSelectionOnClick
        // onRowClick={(params) => goToPage(params.id)}
        className='cursor-pointer'
      />
    </div>
  )
}

export default Clients

export async function getStaticProps() {
    const response = await fetch("http://localhost:8080/api/manger/all-clients");
    const data = await response.json();
    
    return {
      props: {
        clients: data,
      },
    };
  }