import React, { useEffect, useState} from 'react'
import TopBox from './TopBox'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useRouter } from 'next/router'
import axios from 'axios'


const TopBoxes = () => {
  const router = useRouter();
  const [numberOfSuppliers, setNumberofSuppliers] = useState();
  const [user, setUser] = useState({})
  const [outcome, setOutcome] = useState()


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
    axios.get(`http://localhost:8080/api/user/total-amount/${id}`)
    .then(res => setOutcome(res.data))
    .catch(err => console.log(err))
  }, [user?.id])

  // const getNumberOfSuppliers = async () => {
    
  //   const result = await fetch(`http://localhost:8080/api/user/number-of-suppliers/12`);
  //   const data = await result.json();
  //   setNumberofSuppliers(data);
  // }
  console.log("number of suppliers: " + numberOfSuppliers)
  return (
    <div className='flex ml-[80px] md:ml-[200px] justify-around p-1 space-x-2'>
        <TopBox title="SUPPLIERS" amount={numberOfSuppliers} link="See all suppliers" icon={PeopleOutlineIcon} color="success" onClick={()=> router.push('/suppliers')}/>
        <TopBox title="OUTCOME"  amount={`ש"ח ${outcome}`} link="Watch details" icon={PeopleAltIcon}  color="primary" onClick={()=> router.push('/agents')}/>
        <TopBox title="INCOME" amount="15478$" link="View net income" icon={CalendarMonthIcon}  color="secondary" />
        <TopBox title="BALANCE" amount="7240$" link="See details" icon={MonetizationOnIcon}  color="info"/>
    </div>
  )
}

export default TopBoxes