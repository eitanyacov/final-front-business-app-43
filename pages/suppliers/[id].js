import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import { DataGrid } from "@mui/x-data-grid";
import SideBarPage from '../../components/SideBarPage';

export async function getStaticPaths() {
    // const response = await fetch("http://localhost:8080/api/user/get-suppliers-by-user/" + id);
    const response = await fetch("http://localhost:8080/api/admin/all-suppliers");
    const data = await response.json();
    const paths = data.map(a => {
        return {
            params: {
                id: a.id.toString()
            }
        }
    })

    return {
      // paths: [
      //         { params: { id: '1'} },
      //         { params: { id: '2'} },
      //         { params: { id: '3'} },
      //         { params: { id: '4'} },
      //         { params: { id: '5'} },
      //         { params: { id: '6'} },
      //         { params: { id: '7'} },
      //         { params: { id: '8'} },
      //         { params: { id: '9'} },
      //         { params: { id: '10'} },
      //         { params: { id: '11'} },
      //         { params: { id: '12'} },
      //         { params: { id: '13'} },
      //         { params: { id: '14'} },
            
            // ],
        paths,
        fallback: false // false or 'blocking'
        
    }

    // return {
    //     paths: [
    //       { params: { id: '1'} },
    //       { params: { id: '2'} },
        
    //     ],
    //     fallback: false // false or 'blocking'
    //   };
}

const SupplierPage = ({ id }) => {
    const [user, setUser] = useState({})
    const [supplier, setSupplier] = useState({})
    const [invoices, setInvoices] = useState([])
    const router = useRouter()

    const clients = []
    
    
    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        axios.get('http://localhost:8080/api/user/supplier-by-user-id/' + user?.id + '/' + id)
        .then(res => {console.log(res.data), setSupplier(res.data)})
        .catch(err => console.log(err))
    }, [user?.id])

    useEffect(()=> {
        axios.get(`http://localhost:8080/api/user/get-invoices-by-supplier-per-user/${id}`)
        .then(res => {console.log(res.data), setInvoices(res.data)})
        .catch(err => console.log(err))
    }, [id])

    const columns = [
      { field: "id", headerName: "ID", width: 70 },
      {
        field: "supplierName",
        headerName: "Supplier Name",
        width: 150,          
        editable: true,
      },
      {
        field: "date",
        headerName: "Date",
        width: 180,
        editable: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 150,
        editable: true,
      },
      {
        field: "invoiceId",
        headerName: "Invoice Id",
        // type: 'number',
        width: 180,
        editable: true,
      },
  
      {
        field: "paymentMethod",
        headerName: "Payment Method",
        width: 130,
        editable: true,
      },
      {
        field: "paidOrNo",
        headerName: "Is Paid?",
        width: 130,
        editable: true,
      },
    ];

    console.log(user?.id)
    console.log("id from getstaticprops: " + id)
    if(!user) router.push('/login')
    return (
        <>
        <SideBarPage />
        <div className='flex justify-around ml-[80px] md:ml-[200px] space-x-4 mt-2'>
            <h1 className='text-lg font-semibold'>Name: <span className='text-sm'>{supplier?.name}</span></h1>
            <h1 className='text-lg font-semibold'>Email: <span className='text-sm'>{supplier?.email}</span></h1>
            <h1 className='text-lg font-semibold'>Phone: <span className='text-sm'>{supplier?.phoneNumber}</span></h1>
            <h1 className='text-lg font-semibold'>Address: <span className='text-sm'>{supplier?.address}</span></h1>
            <h1 className='text-lg font-semibold'>Info: <span className='text-sm'>{supplier?.description}</span></h1>
            <div className="flex space-x-3">
            <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
              Disable Supplier
            </h1>
          </div>
        </div>
        <div className="h-[500px] w-[82%] ml-[80px] md:ml-[205px] mt-2">
        <DataGrid
          rows={invoices}
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

export default SupplierPage

export async function getStaticProps(context) {
    const { params } = context;

    const id = params.id
    
   return {
       props: {
           id
       },
   }
}

// export async function getStaticPaths() {
//     const response = await fetch("http://localhost:8080/api/user/get-suppliers-by-user/10");
//     const data = await response.json();

   
//     const paths = data.map(a => {
//         return {
//             params: {
//                 id: a.id.toString()
//             }
//         }
//     })

//     return {
//         paths,
//         fallback: false // false or 'blocking'








// // import { DataGrid } from '@mui/x-data-grid';
// import { getDataGridUtilityClass } from '@mui/x-data-grid';
// import { useRouter } from 'next/router'
// import React, { useState, useEffect } from 'react';

//     // const getData = async () => {
//     //     await fetch("http://localhost:8080/api/user/get-suppliers-by-user/10")
//     // }

//     // useEffect(()=> {
//     //     getData();
//     // })

// export async function getStaticPaths() {
//     const response = await fetch("http://localhost:8080/api/user/get-suppliers-by-user/10");
//     const data = await response.json();

   
//     const paths = data.map(a => {
//         return {
//             params: {
//                 id: a.id.toString()
//             }
//         }
//     })

//     return {
//         paths,
//         fallback: false // false or 'blocking'
        
//     }

//     // return {
//     //     paths: [
//     //       { params: { id: '1'} },
//     //       { params: { id: '2'} },
        
//     //     ],
//     //     fallback: false // false or 'blocking'
//     //   };
// }

// const AgentProfile = ({ supplier  }) => {
//     const [user, setUser] = useState({})

   
//     useEffect(()=> {
//         const res = localStorage.getItem("user")
//         const result = JSON.parse(res)
//         setUser(result)
        
//     }, [])

     
//     // const columns = [
//     //     { field: 'id', headerName: 'ID', width: 90 },
//     //     {
//     //       field: 'name',
//     //       headerName: 'Name',
//     //       width: 150,
//     //       editable: true,
//     //     },
//     //     {
//     //       field: 'email',
//     //       headerName: 'Email',
//     //       width: 150,
//     //       editable: true,
//     //     },
//     //     {
//     //       field: 'signedAt',
//     //       headerName: 'Signed At',
//     //       // type: 'number',
//     //       width: 110,
//     //       editable: true,
//     //     },
//     //     {
//     //       field: 'phoneNumber',
//     //       headerName: 'Phone Number',
//     //       width: 110,
//     //       editable: true,
//     //     },
//     //     {
//     //       field: 'agentName',
//     //       headerName: 'Agent Name',
//     //       width: 110,
//     //       editable: true,
//     //     },
//     //     {
//     //       field: 'action',
//     //       headerName: 'Action',
//     //       width: 200,
//     //       renderCell:() => {
//     //         return (
//     //           <div className='flex space-x-3'>
//     //             <h1 className='bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer'>view</h1>
//     //             <h1 className='bg-slate-100 rounded-md px-4 py-2 text-red-700 hover:text-red-400 cursor-pointer'>delete</h1>
//     //           </div>
//     //         )
//     //       }
//     //     },

        
//     //   ];
//       // console.log("the clients are: " + clients)
//         return (
//             <>
//             <div key={supplier.id} className='flex space-x-8 justify-center mt-5 mb-5 ml-10'>
//                 <h1><span className="font-semibold text-gray-800">Supplier Name:</span> {supplier.name}</h1>
//                 <h1><span className="font-semibold text-gray-800">Email:</span> {supplier.email}</h1>
//                 <h1><span className="font-semibold text-gray-800">Phone Number:</span> {supplier.phoneNumber}</h1>
//                 <h1><span className="font-semibold text-gray-800">Description:</span> {supplier.description}</h1>
//             </div>
//             <div className='ml-[200px]'>
//                 {/* <h1 className="ml-5 mt-3 mb-3 text-2xl font-semibold underline">Clients of {agent.name}</h1>
//             {clients.map(client => (
//                     <div key={client.id} className='ml-5 mt-4 shadow-md w-fit p-3 rounded-lg cursor-pointer'>
//                         <h1>- {client.name}</h1>
//                         <h1>- {client.email}</h1>
//                         <h1>- {client.phoneNumber}</h1>
//                         <h1>- {client.signedAt}</h1>
//                         <h1>- {client.agent.id}</h1>
//                     </div>
//                 ))} */}
//                 <div style={{ height: 400, width: '98%' }}>
//       {/* <DataGrid
//         rows={clients}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//         disableSelectionOnClick
//         className='cursor-pointer'
//       /> */}
//     </div>
//             </div>
//             </>
//         )
    
        
// }

// export default AgentProfile

// export async function getId() {
//     return 10;
// }


// export async function getStaticProps(context) {
//     const { params } = context;

//     const id = await getId();
//     const response = await fetch(`http://localhost:8080/api/user/supplier-by-user-id/${id}/${params.id}`);
//     const data = await response.json();

//     // const res = await fetch(`http://localhost:8080/api/manger/get-clients-by-agent-id/${params.id}`);
//     // const result = await res.json();
//     // console.log(result);
    

//    return {
//        props: {
//            supplier: data,
//           //  clients: result
//        },
//    }
// }

