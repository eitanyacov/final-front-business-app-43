import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import SideBarPage from '../../components/SideBarPage'
import { useRouter } from "next/router";
import { Select, MenuItem, InputLabel} from '@mui/material'
import axios from 'axios';

const salaries = () => {
    const [user, setUser] = useState({})
    const [salaries, setSaleries] = useState([])
    const [id, setId] = useState();
    const [amount, setAmount] = useState()
    const [month, setMonth] = useState("")
    const [hours, setHours] = useState()
    const [extraHours, setExtraHours] = useState()
    const [workerFullName, setWorkerFullName] = useState("")
    const [salary, setSalary] = useState({})
    const [field, setField] = useState("")
    const [editMode, setEditMode] = useState(false)

    const router = useRouter();

    const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        getSalaries()
        
    }, [user?.id])
  
   
    const getSalaries = async () => {
      const id = user?.id;
      const response = await fetch(`http://localhost:8080/api/user/all-workers-salaries/${id}`);
      const data = await response.json();
      setSaleries(data)
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

    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        {
          field: "workerFullName",
          headerName: "שם עובד/ת",
          width: 110,
          editable: true,
        },
        
        {
          field: "month",
          headerName: "עבור חודש",
          width: 110,
          editable: true,
        },
        {
          field: "hours",
          headerName: "מספר שעות",
          // type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: "extraHours",
          headerName: "שעות נוספות",
          // type: 'number',
          width: 110,
          editable: true,
        },
        {
          field: "amount",
          headerName: "סכום משכורת מלא",
          // type: 'number',
          width: 120,
          editable: true,
        },
        // {
        //   field: "מס הכנסה",
        //   headerName: "מס הכנסה",
        //   // type: 'number',
        //   width: 100,
        //   editable: true,
        // },
    
        // {
        //   field: "ביטוח לאומי",
        //   headerName: "ביטוח לאומי",
        //   width: 100,
        //   editable: true,
        // },
        // {
        //     field: "משכורת נטו",
        //     headerName: "משכורת נטו",
        //     width: 100,
        //     editable: true,
        //   },
        
        // {
        //   field: "action",
        //   headerName: "משכורות",
        //   width: 200,
        //   renderCell: () => {
        //     return (
        //       <div className="flex space-x-3">
        //         <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
        //           משכורות
        //         </h1>
        //       </div>
        //     );
        //   },
        // },
      ];

      if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className="h-[500px] w-[80%] ml-[80px] md:ml-[205px] mt-1">
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

export default salaries