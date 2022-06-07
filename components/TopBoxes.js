import React, { useEffect, useState} from 'react'
import TopBox from './TopBox'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useRouter } from 'next/router'



const TopBoxes = () => {
  const router = useRouter();
  const [numberOfSuppliers, setNumberofSuppliers] = useState();

  useEffect(()=> {
    getNumberOfSuppliers();
  }, [])

  const getNumberOfSuppliers = async () => {
    const result = await fetch("http://localhost:8080/api/supplier/number-of-suppliers");
    const data = await result.json();
    setNumberofSuppliers(data);
  }
  console.log("number of suppliers: " + numberOfSuppliers)
  return (
    <div className='flex ml-[80px] md:ml-[200px] justify-around p-1 space-x-2'>
        <TopBox title="SUPPLIERS" amount={numberOfSuppliers} link="See all suppliers" icon={PeopleOutlineIcon} color="success" onClick={()=> router.push('/suppliers')}/>
        <TopBox title="OUTCOME"  amount="3484$" link="Watch details" icon={PeopleAltIcon}  color="primary" onClick={()=> router.push('/agents')}/>
        <TopBox title="INCOME" amount="15478$" link="View net income" icon={CalendarMonthIcon}  color="secondary" />
        <TopBox title="BALANCE" amount="7240$" link="See details" icon={MonetizationOnIcon}  color="info"/>
    </div>
  )
}

export default TopBoxes