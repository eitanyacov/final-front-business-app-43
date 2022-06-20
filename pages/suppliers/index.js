import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { Select, MenuItem, InputLabel} from '@mui/material'
import SideBarPage from "../../components/SideBarPage";
import axios from 'axios';


// function UserList({ suppliers }) {
  function UserList() {
  const [user, setUser] = useState({})
  const [id, setId] = useState();
  const [supplier, setSupplier] = useState({})
  // const [isPermanentModel, setIsPermanentModel] = useState();
  const [active, setActive] = useState();
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [suppliers, setSuppliers] = useState([])
  const [field, setField] = useState("")
  const router = useRouter();

  const arr = ["True", "False"];

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
      headerName: "שם ספק",
      width: 140,
      editable: true,
    },
    {
      field: "email",
      headerName: "אימייל",
      width: 170,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "טלפון",
      width: 120,
      editable: true,
    },
    {
      field: "address",
      headerName: "כתובת",
      // type: 'number',
      width: 120,
      editable: true,
    },
    {
      field: "description",
      headerName: "תיאור",
      width: 140,
      editable: true,
    },
    {
      field: "active",
      headerName: "?פעיל",
      width: 60,
      editable: true,
    },
    // {
    //   field: "isPermanentModel",
    //   headerName: "?ספק קבוע",
    //   width: 80,
    //   editable: true,
    // },
    // {
    //   field: "isActive",
    //   headerName: "isActive",
    //   width: 85,
    //   editable: true,
    // },
    {
      field: "action",
      headerName: "חשבוניות ספק",
      width: 140,
      renderCell: () => {
        return (
          <div className="flex space-x-3">
            <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
              חשבוניות ספק
            </h1>
          </div>
        );
      },
    },
    // {
    //   field: "action2",
    //   headerName: "עריכה",
    //   width: 120,
    //   renderCell: () => {
    //     return (
    //       <div className="flex space-x-3">
    //         <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
    //           ערוך ספק
    //         </h1>
    //       </div>
    //     );
    //   },
    // },
  ];


  const editCell = (param) => {
    setId(param.id)
    if(param.field == 'action') return
    if(param.field == 'id') return
    axios.get("http://localhost:8080/api/user/supplier-by-id/" + param.id)
    .then(res => {setSupplier(res.data), setEditMode(true)})
    .catch(err => console.log(err))
    setField(param.field)
    console.log(param.field)
    
  }

//   const handleChange1 = (e) => {
//     setIsPermanentModel(e.target.value)
// }
const handleChange2 = (e) => {
  setActive(e.target.value)
}

  const cellClick = (e) => {
    // console.log(e)
    if(e.field == 'action') {
      goToPage(e.id)
    }
    // if(e.field == 'action2') {
    //   console.log(e)
    //   console.log(e.id)
    //   setId(e.id)
    //   axios.get("http://localhost:8080/api/user/supplier-by-id/" + e.id)
    //   .then(res => {setSupplier(res.data), setEditMode(true)})
    //   .catch(err => console.log(err))
    // }
  }

  const goToPage = (id) => {
    // agents.map(a => router.push(`agents/${a.id}`))
    router.push(`suppliers/${id}`);
  };

  // const showRowId = (id) => {
  //   console.log("row id is: " + id)
  //   return id;
  // }
  const printValues = (e)=> {
    e.preventDefault()
    axios.post("http://localhost:8080/api/user/update-supplier/" + id, {
      name: name != "" ? name : supplier.name,
      email: email != "" ? email : supplier.email,
      phoneNumber: phoneNumber != "" ? phoneNumber : supplier.phoneNumber,
      address: address != "" ? address : supplier.address,
      description: description != "" ? description : supplier.description,
      active: active != null ? active : supplier.active
    }).then(res => {console.log(res.data), setEditMode(false), router.reload()})
    .catch(err => console.log(err))
  }

  if(!user) router.push('/login')
  return (
    <>
      <SideBarPage />
      {/* <div className="flex space-x-3">
        <h1 className="bg-slate-100 rounded-md px-4 py-2 text-blue-700 hover:text-blue-300 cursor-pointer">
          Disable Agent
        </h1>
      </div> */}
      <div className="h-[535px] w-[82%] ml-[80px] md:ml-[205px] mt-2">
        {!editMode ? (
          <DataGrid
          rows={suppliers}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          checkboxSelection
          onCellDoubleClick={param => editCell(param)}
          editMode='row'
          onCellClick={(e)=> cellClick(e)}
          disableSelectionOnClick
          // onRowDoubleClick={(params) => goToPage(params.id)}
          // onRowClick={(params) => showRowId(params.id)}
          className="cursor-pointer"
        />
        ) : (
          <div className='flex justify-center items-center mt-1 h-fit'>
          <form onSubmit={printValues} className='flex flex-col w-[300px] border px-3 py-1 bg-gray-200 rounded-3xl border-t-4 border-gray-500'>
            <div className='text-right'>
            <button className='hover:text-red-600 hover:scale-150 text-2xl text-red-500' onClick={()=> setEditMode(false)}>X</button>
            </div>
            {field == "name" && <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> שם:  </span>{supplier.name}</label>
              <input type="text" value={name} placeholder="enter new name" className='bg-white rounded-full px-2 py-1' onChange={e => setName(e.target.value)}/>
            </>
              
            }
            {field == "email" &&
              <>
              <label className='text-center mb-3'>{supplier.email} <span className='font-semibold text-xl text-gray-600'> :אימייל  </span></label>
              <input type="email" value={email} placeholder="enter new email" className='bg-white rounded-full px-2 py-1' onChange={e => setEmail(e.target.value)}/>
            </>
    
            }
            {field == "address" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> כתובת:  </span> {supplier.address}</label>
            <input type="text" value={address} placeholder="enter new address" className='bg-white rounded-full px-2 py-1' onChange={e => setAddress(e.target.value)}/>
              </>
            }

            {field == "description" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> תיאור:  </span> {supplier.description}</label>
            <input type="text" value={description} placeholder="enter new description" className='bg-white rounded-full px-2 py-1' onChange={e => setDescription(e.target.value)}/>
              </>
            }
            
            {field == "phoneNumber" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> מס' טלפון:  </span>{supplier.phoneNumber}</label>
            <input type="text" value={phoneNumber} placeholder="enter new phone" className='bg-white rounded-full px-2 py-1' onChange={e => setPhoneNumber(e.target.value)}/>
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
          <InputLabel className='text-center mb-3' id="demo-simple-select-label" >{supplier.active == true ? "True" : "False" } <span className='font-semibold text-xl text-gray-600'> ?פעיל </span></InputLabel>
        <Select onChange={handleChange2}>
            {arr.map(a => (
                <MenuItem value={a}>{a}</MenuItem>
            ))}
         </Select>
          </>
         }
            <button type='submit' className='bg-blue-400 rounded-full px-2 py-1 my-4 hover:bg-blue-300'>עדכן ספק</button>
          </form>
          </div>
          
        )}
       
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
