import React, { useState, useEffect } from "react";
import SideBarPage from "../../components/SideBarPage";
import { PieChart, Pie, Cell } from 'recharts';
import { AreaChart, LineChart, Area, defs, stop,  linearGradient, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import axios from 'axios';
import { useRouter } from "next/router";
import PiesCharts from "../../components/PiesCharts";

const Reports = () => {
  const [user, setUser] = useState({});
  
  const [isSSR, setIsSSR] = useState(true);
  const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'black']

  useEffect(() => {
    setIsSSR(false);
  }, []);

 
  const router = useRouter();

  const data = [
    { name: "January", uv: 400, pv: 2400, amt: 2400 },
    { name: "February", uv: 644, pv: 2400, amt: 1760 },
    { name: "March", uv: 540, pv: 1580, amt: 2170 },
    { name: "April", uv: 320, pv: 870, amt: 2768 },
    { name: "May", uv: 244, pv: 980, amt: 1877 },
    { name: "June", uv: 320, pv: 650, amt: 2768 },
    { name: "July", uv: 368, pv: 456, amt: 2295 },
    { name: "August", uv: 320, pv: 1024, amt: 2489 },
    { name: "september", uv: 189, pv: 445, amt: 988 },
    { name: "october", uv: 433, pv: 666, amt: 1456 },
    { name: "november", uv: 368, pv: 456, amt: 2295 },
    { name: "december", uv: 320, pv: 1024, amt: 2489 },
   
  ];

 
  useEffect(() => {
    const res = localStorage.getItem("user");
    const result = JSON.parse(res);
    setUser(result);
  }, []);

  

  if (!user) router.push("/login");
  return (
    <>
      <SideBarPage />
      <div className="ml-[205px] mt-5 w-fit">
        <div className="flex justify-center">
        {!isSSR && (
        <AreaChart width={1050} height={350} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart>
      )}

        </div>
        {!isSSR && <PiesCharts />}
      </div>
    </>
  );
};

export default Reports;
