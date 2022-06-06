import React, { useState, useEffect, useRef } from 'react'
import { FormControl, Select, MenuItem, InputLabel, Input, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

const Reports = ({ agents }) => {
  const [val, setVal] = useState();
  const [amount, setAmount] = useState();
  const [date, setDate] = useState("");
  const [submit, setSubmit] = useState(false);
  const[agent, setAgent] = useState({});
  const inputRef = useRef(null);

  useEffect(()=> {
    getAgent();
  }, [val])

  const getAgent = async () => {
    const response = await fetch("http://localhost:8080/api/manger/" + val);
    const data = await response.json();
    // console.log(data);
    setAgent(data);
    
  }

  const closeFormValidation = () => {
   
    setDate("");
    setAmount("");
    setAgent({});
    setSubmit(false)

    
  }


  const handleChange = (e) => {
    console.log(e.target.value);
    setVal(e.target.value);
  }

  console.log(agent)

  return (
    <div className='ml-[80px] md:ml-[205px] mt-7'>
 <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Agent</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={30}
    label="Agent"
    onChange={handleChange}
  >
    {agents.map((agent)=> (
        <MenuItem value={agent.id}>{agent.name}</MenuItem>
    ))}
  </Select>
  <Input type='date' value={date} placeholder='add date' onChange={e => setDate(e.target.value)}/>
  <Input type='number' value={amount} placeholder='add amount' onChange={e => setAmount(e.target.value)}/>
  <Button disabled={date == "" || !amount || !agent.name} onClick={() => setSubmit(true)}>Click to watch before submit</Button>
</FormControl>
   {
     submit && (
      <div className='flex bg-gray-100 rounded-lg max-w-5xl mx-auto h-[250px] mt-3'>
      <div className='flex flex-col justify-around px-5 w-full'>
        <div className='flex justify-between'>
        <h1 className='text-gray-700 text-2xl font-semibold '>Agent Name: <span className='text-4xl font-bold ml-2 text-gray-600'>{agent.name}</span></h1>
        <h1 className='text-3xl hover:text-red-700 cursor-pointer hover:transition-all hover:scale-125' onClick={closeFormValidation}>X</h1>
        </div>
        <h1 className='text-gray-700 text-2xl font-semibold'>Amount: <span className='text-4xl font-bold ml-2 text-gray-600'>{amount}</span></h1>
        <h1 className='text-gray-700 text-2xl font-semibold'>Date:<span className='text-4xl font-bold ml-2 text-gray-600'>{date}</span></h1>
      </div>
   </div>
     )
   }
    </div>
   
  )
}

export default Reports


export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/api/manger/all/agents");
  const data = await response.json();

  return {
    props: {
      agents: data,
    },
  };
}