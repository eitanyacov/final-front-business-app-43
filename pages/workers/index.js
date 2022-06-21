import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import { Select, MenuItem, InputLabel} from '@mui/material'
import SideBarPage from '../../components/SideBarPage';
import axios from 'axios';



const Workers = ({ clients }) => {
  const [user, setUser] = useState({})
  const [workers, setWorkers] = useState([])
  const [id, setId] = useState();
  const [worker, setWorker] = useState({})
  const [field, setField] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [fullName, setFullname] = useState("")
  const [idNumber, setIdNumber] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [startedAt, setStartedAt] = useState("")
  const [active, setActive] = useState("")
  const [salaryPerHour, setSalaryPerHour] = useState("")
  
  const arr = ["True", "False"];

  const router = useRouter();


  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      getWorkers()
      
  }, [user?.id])

  const cellClick = (e) => {
    // console.log(e)
    if(e.field == 'action') {
      goToPage(e.id)
    }
  }

  const editCell = (param) => {
    setId(param.id)
    if(param.field == 'action') return
    if(param.field == 'id') return
    axios.get("http://localhost:8080/api/user/get-worker-by-id/" + param.id)
    .then(res => {setWorker(res.data), setEditMode(true)})
    .catch(err => console.log(err))
    setField(param.field)
    console.log(param.field)
    
  }

  const goToPage = (id) => {
    router.push('/workers/' + id)
  }

  const handleChange2 = (e) => {
    setActive(e.target.value)
  }

  const getWorkers = async () => {
    const id = user?.id;
    const response = await fetch(`http://localhost:8080/api/user/all-workers/${id}`);
    const data = await response.json();
    setWorkers(data)
  }

  const printValues = (e)=> {
    e.preventDefault()
    axios.post("http://localhost:8080/api/user/update-worker/" + id, {
      fullName: fullName != "" ? fullName : worker.fullName,
      idNumber: idNumber != "" ? idNumber : worker.idNumber,
      phoneNumber: phoneNumber != "" ? phoneNumber : worker.phoneNumber,
      address: address != "" ? address : worker.address,
      dob: dob != "" ? dob : worker.dob,
      active: active != null ? active : worker.active,
      salaryPerHour: salaryPerHour != "" ? salaryPerHour : worker.salaryPerHour,
      startedAt: startedAt != "" ? startedAt : worker.startedAt
    }).then(res => {console.log(res.data), setEditMode(false), router.reload()})
    .catch(err => console.log(err))
  }

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    {
      field: "fullName",
      headerName: "שם מלא",
      width: 105,
      editable: true,
    },
    
    {
      field: "phoneNumber",
      headerName: "מספר טלפון",
      width: 115,
      editable: true,
    },
    {
      field: "startedAt",
      headerName: "התחלת עבודה",
      // type: 'number',
      width: 105,
      editable: true,
    },
    {
      field: "address",
      headerName: "כתובת",
      // type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: "dob",
      headerName: "תאריך לידה",
      // type: 'number',
      width: 100,
      editable: true,
    },
    {
      field: "idNumber",
      headerName: "ת.ז",
      // type: 'number',
      width: 100,
      editable: true,
    },

    {
      field: "salaryPerHour",
      headerName: "שכר שעתי",
      width: 80,
      editable: true,
    },
    {
      field: "active",
      headerName: "?פעיל",
      width: 60,
      editable: true,
    },
    {
      field: "action",
      headerName: "משכורות",
      width: 150,
      renderCell: () => {
        return (
          <div className="flex space-x-3">
            <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
               משכורות עובד
            </h1>
          </div>
        );
      },
    },
  ];

  if(!user) router.push('/login')
  return (
   
    <>
      <SideBarPage />
      <div className="h-[530px] w-[82%] ml-[80px] md:ml-[205px] mt-2">
        <div className='flex justify-between items-center'>
        <h1>{worker.fullName}</h1>
        <h1>{worker.phoneNumber}</h1>
        <h1>{worker.dob}</h1>
        <h1>{worker.active}</h1>
        <h1>{worker.idNumber}</h1>
        <h1>{worker.address}</h1>
        <h1>{worker.status}</h1>
        <h1>{worker.salaryPerHour}</h1>
        <h1>{worker.startedAt}</h1>
        </div>
        {!editMode ?(
          <DataGrid
          rows={workers}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          onCellClick={(e)=> cellClick(e)}
          onCellDoubleClick={param => editCell(param)}
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
            {field == "fullName" && <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'>  שם מלא:   </span>{worker.fullName}</label>
              <input type="text" value={fullName} placeholder="עדכן שם " className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setFullname(e.target.value)}/>
            </>
              
            }
            {field == "phoneNumber" &&
              <>
              <label className='text-center mb-3'>{worker.phoneNumber} <span className='font-semibold text-xl text-gray-600'> :מס' טלפון   </span></label>
              <input type="text" value={phoneNumber} placeholder="עדכן מס' טלפון" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setPhoneNumber(e.target.value)}/>
            </>
    
            }
            {field == "address" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'>  כתובת:   </span> {worker.address}</label>
            <input type="text" value={address} placeholder="עדכן כתובת" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setAddress(e.target.value)}/>
              </>
            }

            {field == "startedAt" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> תחילת עבודה :  </span> {worker.startedAt}</label>
            <input type="date" value={startedAt} placeholder="עדכן תחילת עבודה" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setStartedAt(e.target.value)}/>
              </>
            }
            
            {field == "dob" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> תאריך לידה :  </span>{worker.dob}</label>
            <input type="date" value={dob} placeholder="עדכן תאריך לידה" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setDob(e.target.value)}/>
              </>
            }

            {field == "idNumber" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> מס' ת.ז:  </span>{worker.idNumber}</label>
            <input type="text" value={idNumber} placeholder="עדכן ת.ז" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setIdNumber(e.target.value)}/>
              </>
            }

            {field == "salaryPerHour" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'>  שכר שעתי :  </span>{worker.salaryPerHour}</label>
            <input type="text" value={salaryPerHour} placeholder="עדכן שכר שעתי" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setSalaryPerHour(e.target.value)}/>
              </>
            }

            {/* {field == "isPermanentModel" &&
              <>
              <InputLabel id="demo-simple-select-label" >?ספק קבוע</InputLabel>
              <Select onChange={handleChange1}>
            {arr.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
             </Select>
              </>
            } */}
            
         {field == "active" &&
          <>
          <InputLabel className='text-center mb-3' id="demo-simple-select-label" >{worker.active == true ? "True" : "False" } <span className='font-semibold text-xl text-gray-600'> ?פעיל </span></InputLabel>
        <Select onChange={handleChange2}>
            {arr.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
          </>
         }
            <button type='submit' className='bg-blue-400 rounded-full px-2 py-1 my-4 hover:bg-blue-300'>עדכן עובד</button>
          </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Workers;

// export async function getStaticProps() {
//   const response = await fetch("http://localhost:8080/api/manger/all-clients");
//   const data = await response.json();

//   return {
//     props: {
//       clients: data,
//     },
//   };
// }
