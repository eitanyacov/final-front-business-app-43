import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import SideBarPage from '../../components/SideBarPage';
import { Select, MenuItem, InputLabel} from '@mui/material'
import axios from 'axios';
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

const WorkerPage = ({ salaries, worker }) => {
    const [user, setUser] = useState({})
    const [id, setId] = useState();
    const [salary, setSalary] = useState({})
    const [field, setField] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [amount, setAmount] = useState()
    const [month, setMonth] = useState("")
    const [hours, setHours] = useState()
    const [extraHours, setExtraHours] = useState()
    const [workerFullName, setWorkerFullName] = useState("")
    // const [supplier, setSupplier] = useState({})
    // const [invoices, setInvoices] = useState([])
    const router = useRouter()

    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]
    
    
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
      { field: "id", headerName: "ID", headerAlign: 'center', width: 70 },
      {
        field: "workerFullName",
        headerName: "שם עובד",
        width: 120,
        align: "center",
        headerAlign: 'center',          
        editable: true,
      },
      {
        field: "month",
        headerName: "עבור חודש",
        align: "center",
        headerAlign: 'center',
        width: 100,
        editable: true,
      },
      {
        field: "hours",
        headerName: "מס' שעות",
        width: 90,
        align: "center",
        headerAlign: 'center',
        editable: true,
      },
      {
        field: "extraHours",
        headerName: "שעות נוספות",
        align: "center",
        headerAlign: 'center',
        // type: 'number',
        width: 90,
        editable: true,
      },
  
      {
        field: "amount",
        headerName: "סכום מלא",
        align: "center",
        headerAlign: 'center',
        width: 80,
        editable: true,
      },
      // {
      //   field: "irs",
      //   headerName: "מס הכנסה",
      //   width: 90,
      //   editable: true,
      // },
      // {
      //   field: "soicel insurince",
      //   headerName: "ביטוח לאומי",
      //   width: 90,
      //   editable: true,
      // },
      // {
      //   field: "neto",
      //   headerName: "משכורת נטו",
      //   width: 90,
      //   editable: true,
      // },
    ];

    const printValues = (e)=> {
      e.preventDefault()
      axios.post("http://localhost:8080/api/user/update-salary/" + id, {
        amount: amount != null ? amount : salary.amount,
        hours: hours != null ? hours : salary.hours,
        extraHours: extraHours != null ? extraHours : salary.extraHours,
        workerFullName: workerFullName != "" ? workerFullName : salary.workerFullName,
        month: month != "" ? month : salary.month,
      }).then(res => {console.log(res.data), setEditMode(false), router.reload()})
      .catch(err => console.log(err))
    }

    const handleChange1 = (e) => {
      setMonth(e.target.value)
    }

    const editCell = (param) => {
      setId(param.id)
      if(param.field == 'workerFullName') return
      if(param.field == 'id') return
      axios.get("http://localhost:8080/api/user/salary-by-id/" + param.id)
      .then(res => {setSalary(res.data), setEditMode(true)})
      .catch(err => console.log(err))
      setField(param.field)
      console.log(param.field)
      
    }

  
    if(!user) router.push('/login')
    return (
        <>
        <SideBarPage />
        <div className='flex justify-around ml-[80px] md:ml-[200px] space-x-4 mt-2'>
            <h1 className='text-lg font-semibold'>שם מלא : <span className='text-sm'>{worker?.fullName}</span></h1>
            <h1 className='text-lg font-semibold'>ת.ז : <span className='text-sm'>{worker?.idNumber}</span></h1>
            <h1 className='text-lg font-semibold'>טלפון : <span className='text-sm'>{worker?.phoneNumber}</span></h1>
            <h1 className='text-lg font-semibold'>התחלת עבודה : <span className='text-sm'>{worker?.startedAt}</span></h1>
            <h1 className='text-lg font-semibold'>שכר שעתי : <span className='text-sm'>{worker?.salaryPerHour}</span></h1>
            <div className="flex space-x-3" onClick={()=> router.back()}>
            <h1 className="bg-slate-100 rounded-md mr-3 px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
              חזרה לעובדים
            </h1>
          </div>
        </div>
        <div className="h-[490px] w-[82%] ml-[80px] md:ml-[205px] mt-1">
       {!editMode ? (
         <DataGrid
         rows={salaries}
         columns={columns}
         pageSize={8}
         rowsPerPageOptions={[8]}
         onCellDoubleClick={(params)=> editCell(params)}
         checkboxSelection
         disableSelectionOnClick
         // onRowClick={(params) => goToPage(params.id)}
         className="cursor-pointer"
       />
       ) : (
        <div className='flex justify-center items-center mt-1 h-fit'>
          <form onSubmit={printValues} className='flex flex-col w-[300px] border px-3 py-1 bg-white rounded-3xl border-t-4 border-gray-500'>
            <div className='text-right'>
            <button className='hover:text-red-600 hover:scale-150 text-2xl text-red-500' onClick={()=> setEditMode(false)}>X</button>
            </div>
            {field == "amount" && <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> סכום:  </span>{salary.amount}</label>
              <input type="number" step={0.01} value={amount} placeholder="עדכן סכום" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setAmount(e.target.value)}/>
            </>
              
            }
            {field == "hours" &&
              <>
              <label className='text-center mb-3'>{salary.hours} <span className='font-semibold text-xl text-gray-600'> :שעות   </span></label>
              <input type="number" step={0.01} value={hours} placeholder="עדכן שעות" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setHours(e.target.value)}/>
            </>
    
            }
            {/* {field == "month" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> חודש:  </span> {salary.month}</label>
            <input type="text" value={month} placeholder="עדכן חודש" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setMonth(e.target.value)}/>
              </>
            } */}

            {field == "extraHours" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> שעות נוספות:  </span> {salary.extraHours}</label>
            <input type="number" step={0.01} value={extraHours} placeholder="עדכן שעות נוספות" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setExtraHours(e.target.value)}/>
              </>
            }
            
            {/* {field == "workerFullName" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> שם עובד:  </span>{salary.workerFullName}</label>
            <input type="text" value={workerFullName} placeholder="עדכן שם עובד" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setWorkerFullName(e.target.value)}/>
              </>
            } */}

            {field == "month" &&
              <>
              <InputLabel className='text-center mb-3' id="demo-simple-select-label" >
                <div>
                <span className='text-gray-700 text-xl'>חודש</span> : {salary.month}
                <h1>עדכן חודש</h1>
                </div></InputLabel>
              <Select onChange={handleChange1}>
            {months.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
             </Select>
              </>
            }
            
         {/* {field == "active" &&
          <>
          <InputLabel className='text-center mb-3' id="demo-simple-select-label" >{supplier.active == true ? "True" : "False" } <span className='font-semibold text-xl text-gray-600'> ?פעיל </span></InputLabel>
        <Select onChange={handleChange2}>
            {arr.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
          </>
         } */}
            <button type='submit' className='bg-blue-400 rounded-full px-2 py-1 my-4 hover:bg-blue-300'>עדכן משכורת</button>
          </form>
          </div>
       )}
      </div>
        </>
        
    )
}

export default WorkerPage

export async function getStaticProps(context) {
    const { params } = context;
    const id = params.id
    const response = await fetch(`http://localhost:8080/api/user/worker-salaries/${id}`);
        const data = await response.json();
    
        const res = await fetch(`http://localhost:8080/api/user/get-worker-by-id/${id}`);
        const result = await res.json();


   return {
       props: {
           salaries: data,
           worker: result
       },
   }
}






    
        



