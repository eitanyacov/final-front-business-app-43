import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import SideBarPage from '../../components/SideBarPage';
// import { useSelector } from "react-redux";
// import { selectUser } from '../../public/src/features/UserSlice';




export async function getStaticPaths() {
  
// option one is to get all the suppliers in the system, cause i cannot get the user id inside the getStaticPathes
    // const response = await fetch("http://localhost:8080/api/admin/all-suppliers");
    // const data = await response.json();
    // const paths = data.map(a => {
    //     return {
    //         params: {
    //             id: a.id.toString()
    //         }
    //     }
    // })

    //option two is to prerender big number (maybe option one is better, cause if you will have more suppliers than the number it will be a problem)
    const arr = []
    for(let i = 0; i < 50000; i++) {
      arr.push(i)
    }
    const paths = arr.map(a => {
   
    return {
      params: {
          id: a.toString()
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

}

const SupplierPage = ({ invoices, supplier }) => {
    const [user, setUser] = useState({})
    // const [supplier, setSupplier] = useState({})
    // const [invoices, setInvoices] = useState([])
    const router = useRouter()
    
    
    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
    }, [])


    // useEffect(()=> {
    //     axios.get(`http://localhost:8080/api/user/get-invoices-by-supplier-per-user/${id}`)
    //     .then(res => {console.log(res.data), setInvoices(res.data)})
    //     .catch(err => console.log(err))
    // }, [id])

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
    const response = await fetch(`http://localhost:8080/api/user/get-invoices-by-supplier-per-user/${id}`);
        const data = await response.json();
    
        const res = await fetch(`http://localhost:8080/api/user/supplier-by-id/${id}`);
        const result = await res.json();


   return {
       props: {
           invoices: data,
           supplier: result
       },
   }
}






    
        



