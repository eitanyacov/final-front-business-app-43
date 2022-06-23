import React from 'react'
// import { PieChart, Pie, Cell } from 'recharts';
import {BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, Legend } from 'recharts';

const PiesCharts = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'black']
    const data = [
      {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400
      },
      {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398
      },
      {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800
      },
      {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908
      },
      {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800
      },
      {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800
      },
      {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300
      }
    ]
    
      return (
        <section>
 {/* <PieChart width={250} height={250}>
       <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
         {
           data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={colors[index]}/>
           ))
         }
       </Pie>
     </PieChart> */}
     <BarChart width={1050} height={250} data={data} margin={{right: 30, top: 10}}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="pv" fill="#8884d8" />
  <Bar dataKey="uv" fill="#82ca9d" />
</BarChart>
        </section>
        
        
            
       )
 
}

export default PiesCharts