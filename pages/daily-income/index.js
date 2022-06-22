import React, { useState, useEffect } from 'react';
import SideBarPage from '../../components/SideBarPage'
import { useRouter } from 'next/router'
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios'



const Invoice = () => {
  const [user, setUser] = useState({})
  const [dailyIncomes, setDailyIncomes] = useState([])
  const [dailyIncome, setDailyIncome] = useState({})
  const [id, setId] = useState();
  const [editMode, setEditMode] = useState(false)
  const [field, setField] = useState("")
  const [cashMoney, setCashMoney] = useState();
  const [creditCard, setCreditCard] = useState();
  const [cheque, setCheque] = useState();
  const [cibus, setCibus] = useState();
  const [tenBis, setTenBis] = useState();
  const [wallt, setWallt] = useState();
  const [total, setTotal] = useState();
  const [other, setOther] = useState();
  const [date, setDate] = useState("");

  const router = useRouter();

  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
       
  }, [user?.id])

  useEffect(()=> {
    axios.get("http://localhost:8080/api/user/get-daily-income-by-user/" + user?.id)
    .then(res => setDailyIncomes(res.data))
    .catch(err => console.log(err))
    
  }, [user?.id])

  const editCell = (param) => {
    setId(param.id)
    // if(param.field == 'action') return
    if(param.field == 'id') return
    axios.get("http://localhost:8080/api/user/daily-income-by-id/" + param.id)
    .then(res => {setDailyIncome(res.data), setEditMode(true)})
    .catch(err => console.log(err))
    setField(param.field)
    console.log(param.field)
    
  }

  const printValues = (e)=> {
    e.preventDefault()
    axios.post("http://localhost:8080/api/user/update-daily-income/" + id, {
      cashMoney: cashMoney != null ? cashMoney : dailyIncome.cashMoney,
      creditCard: creditCard != null ? creditCard : dailyIncome.creditCard,
      wallt: wallt != null ? wallt : dailyIncome.wallt,
      cibus: cibus != null ? cibus : dailyIncome.cibus,
      tenBis: tenBis != null ? tenBis : dailyIncome.tenBis,
      other: other != null ? other : dailyIncome.other,
      date: date != "" ? date : dailyIncome.date,
      total: total != null ? total : dailyIncome.total,
      cheque: cheque != null ? cheque : dailyIncome.cheque,
    }).then(res => {console.log(res.data), setEditMode(false), router.reload()})
    .catch(err => console.log(err))
  }

 
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "date",
      headerName: "תאריך",
      width: 120,          
      editable: true,
    },
    {
      field: "cashMoney",
      headerName: "מזומן",
      width: 90,
      editable: true,
    },
    {
      field: "creditCard",
      headerName: "כרטיס אשראי",
      width: 120,
      editable: true,
    },
    {
      field: "cheque",
      headerName: "צ'קים",
      // type: 'number',
      width: 90,
      editable: true,
    },

    {
      field: "cibus",
      headerName: "סיבוס",
      width: 90,
      editable: true,
    },
    {
      field: "tenBis",
      headerName: "תן ביס",
      width: 90,
      editable: true,
    },
    {
        field: "wallt",
        headerName: "וולט",
        width: 90,
        editable: true,
      },
      {
        field: "other",
        headerName: "אחר",
        width: 90,
        editable: true,
      },
      {
        field: "total",
        headerName: 'סה"כ', 
        width: 100,
        editable: true,
      },
  ];
  
  if(!user) router.push('/login')
  return (
    <>
    <SideBarPage />
    <div className="h-[530px] w-[82%] ml-[80px] md:ml-[205px] mt-2">
        {!editMode ? (
          <DataGrid
          rows={dailyIncomes}
          columns={columns}
          pageSize={30}
          rowsPerPageOptions={[30]}
          checkboxSelection
          disableSelectionOnClick
          onCellDoubleClick={param => editCell(param)}
          // onRowClick={(params) => goToPage(params.id)}
          className="cursor-pointer"
        />
        ) : (
          <div className='flex justify-center items-center mt-1 h-fit'>
          <form onSubmit={printValues} className='flex flex-col w-[300px] border px-3 py-1 bg-white rounded-3xl border-t-4 border-gray-500'>
            <div className='text-right'>
            <button className='hover:text-red-600 hover:scale-150 text-2xl text-red-500' onClick={()=> setEditMode(false)}>X</button>
            </div>
            {field == "cashMoney" && <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> מזומן:  </span>{dailyIncome.cashMoney}</label>
              <input type="number" step={0.01} value={cashMoney} placeholder="עדכן מזומן" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setCashMoney(e.target.value)}/>
            </>
              
            }

            {field == "creditCard" &&
              <>
              <label className='text-center mb-3'>{dailyIncome.creditCard} <span className='font-semibold text-xl text-gray-600'> :כרטיס אשראי  </span></label>
              <input type="number" step={0.01} value={creditCard} placeholder="עדכן אשראי" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setCreditCard(e.target.value)}/>
            </>
    
            }
            {field == "cheque" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> צ'קים:  </span> {dailyIncome.cheque}</label>
            <input type="number" step={0.01} value={cheque} placeholder="עדכן צ'קים" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setCheque(e.target.value)}/>
              </>
            }

            {field == "cibus" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> סיבוס:  </span> {dailyIncome.cibus}</label>
            <input type="number" step={0.01} value={cibus} placeholder="עדכן סיבוס" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setCibus(e.target.value)}/>
              </>
            }
            
            {field == "tenBis" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> תן ביס:  </span>{dailyIncome.tenBis}</label>
            <input type="number" step={0.01} value={tenBis} placeholder="תן ביס" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setTenBis(e.target.value)}/>
              </>
            }

            {field == "wallt" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> וולט :  </span>{dailyIncome.wallt}</label>
            <input type="number" step={0.01} value={wallt} placeholder="וולט" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setWallt(e.target.value)}/>
              </>
            }

            {field == "total" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> וולט :  </span>{dailyIncome.total}</label>
            <input type="number" step={0.01} value={total} placeholder="סך הכל" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setTotal(e.target.value)}/>
              </>
            }  

            {field == "other" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> אחר :  </span>{dailyIncome.other}</label>
            <input type="number" step={0.01} value={other} placeholder="עדכן אחר" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setOther(e.target.value)}/>
              </>
            }  

            {field == "date" &&
              <>
              <label className='text-center mb-3'><span className='font-semibold text-xl text-gray-600'> תאריך :  </span>{dailyIncome.date}</label>
            <input type="date" value={date} placeholder="עדכן תאריך" className='bg-gray-200 rounded-full px-2 py-1' onChange={e => setDate(e.target.value)}/>
              </>
            }  

            <button type='submit' className='bg-blue-400 rounded-full px-2 py-1 my-4 hover:bg-blue-300'>עדכן דו"ח יומי</button>
          </form>
          </div>
        )}
      </div>
    </>
  )
}

export default Invoice