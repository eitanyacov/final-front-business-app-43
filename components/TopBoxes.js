import React, { useEffect, useState} from 'react'
import TopBox from './TopBox'
import { Snackbar, Alert } from "@mui/material";
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useRouter } from 'next/router'
import axios from 'axios'


const TopBoxes = () => {
  const router = useRouter();
  const [numberOfSuppliers, setNumberofSuppliers] = useState();
  const [user, setUser] = useState({})
  const [outcome, setOutcome] = useState()
  const [income, setIncome] = useState()
  const [balance, setBalance] = useState()
  const [open, setOpen] = useState(false)

  
  useEffect(()=> {
    const res = localStorage.getItem("user")
    const result = JSON.parse(res)
    setUser(result)
    
}, [])

  useEffect(()=> {
    const id = user?.id;
    axios.get(`http://localhost:8080/api/user/number-of-suppliers/${id}`)
    .then(res => setNumberofSuppliers(res.data))
    .catch(err => console.log(err))
  }, [user?.id])

  useEffect(()=> {
    const id = user?.id;
    axios.get(`http://localhost:8080/api/user/total-outcome/${id}`)
    .then(res => setOutcome(res.data))
    .catch(err => console.log(err))
  }, [user?.id])

  useEffect(()=> {
    const id = user?.id;
    axios.get(`http://localhost:8080/api/user/total-income/${id}`)
    .then(res => setIncome(res.data))
    .catch(err => console.log(err))
  }, [user?.id])

  useEffect(()=> {
    const id = user?.id;
    axios.get(`http://localhost:8080/api/user/user-balance/${id}`)
    .then(res => setBalance(res.data))
    .catch(err => console.log(err))
  }, [user?.id])

  useEffect(()=> {
    if(balance < 0) {
      console.log("red alert!!!!")
      setOpen(true)
    }
  }, [balance])
  const handleClose = () => {
    setOpen(false);
  };
  // const getNumberOfSuppliers = async () => {
    
  //   const result = await fetch(`http://localhost:8080/api/user/number-of-suppliers/12`);
  //   const data = await result.json();
  //   setNumberofSuppliers(data);
  // }
  console.log("number of suppliers: " + numberOfSuppliers)
  return (
    <div className='flex ml-[80px] md:ml-[200px] justify-around p-1 space-x-2'>
        <TopBox title="SUPPLIERS" amount={numberOfSuppliers} link="See all suppliers" icon={PeopleOutlineIcon} color="success" onClick={()=> router.push('/suppliers')}/>
        <TopBox title="OUTCOME"  amount={`ש"ח ${outcome}`} link="Watch details" icon={MoneyOffIcon}  color="primary" onClick={()=> router.push('/agents')}/>
        <TopBox title="INCOME" amount={`ש"ח ${income}`} link="View net income" icon={AttachMoneyIcon}  color="secondary" />
        <TopBox title="BALANCE" amount={`ש"ח ${balance}`} link="See details" icon={MonetizationOnIcon}  color="info"/>
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Warning Balance is negative!
          </Alert>
        </Snackbar>
    </div>
  )
}

export default TopBoxes