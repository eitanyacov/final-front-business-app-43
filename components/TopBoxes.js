import React from 'react'
import TopBox from './TopBox'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const TopBoxes = () => {
  return (
    <div className='flex ml-[80px] md:ml-[200px] justify-around p-1 space-x-2'>
        <TopBox title="CLIENTS" amount={720} link="See all users" icon={PeopleOutlineIcon} color="success"/>
        <TopBox title="AGENTS"  amount={34} link="See all agents" icon={PeopleAltIcon}  color="primary"/>
        <TopBox title="INCOME" amount="15478$" link="View net income" icon={CalendarMonthIcon}  color="secondary" />
        <TopBox title="BALANCE" amount="7240$" link="See details" icon={MonetizationOnIcon}  color="info"/>
    </div>
  )
}

export default TopBoxes