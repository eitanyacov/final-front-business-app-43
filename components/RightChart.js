import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
import { useRouter } from "next/router";

const RightChart = () => {
  const [user, setUser] = useState({});
  const [month, setMonth] = useState("");
  const [januar, setJanuar] = useState();
  const [february, setFebruary] = useState();
  const [march, setMarch] = useState(3452);
  const [april, setApril] = useState(6432);
  const [may, setMay] = useState(8765);
  const [june, setJune] = useState(2486);
  const [july, setJuly] = useState(4321);
  const [august, setAugust] = useState(6757);
  const [september, setSeptember] = useState(6542);
  const [october, setOctober] = useState(8763);
  const [november, setNovember] = useState(1565);
  const [december, setDecember] = useState(6562);
  // const router = useRouter();

  useEffect(() => {
    const res = localStorage.getItem("user");
    const result = JSON.parse(res);
    setUser(result);
  }, []);

  // const currentYear = new Date().getFullYear();
  
  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/February")
     .then(res => setFebruary(res.data))
     .catch(err => console.log(err))
  }, [february, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/January")
     .then(res => setJanuar(res.data))
     .catch(err => console.log(err))
  }, [januar, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/march")
     .then(res => setMarch(res.data))
     .catch(err => console.log(err))
  }, [march, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/april")
     .then(res => setApril(res.data))
     .catch(err => console.log(err))
  }, [april, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/may")
     .then(res => setMay(res.data))
     .catch(err => console.log(err))
  }, [may, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/june")
     .then(res => setJune(res.data))
     .catch(err => console.log(err))
  }, [june, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/july")
     .then(res => setJuly(res.data))
     .catch(err => console.log(err))
  }, [july, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/august")
     .then(res => setAugust(res.data))
     .catch(err => console.log(err))
  }, [august, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/august")
     .then(res => setAugust(res.data))
     .catch(err => console.log(err))
  }, [august, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/september")
     .then(res => setSeptember(res.data))
     .catch(err => console.log(err))
  }, [september, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/october")
     .then(res => setOctober(res.data))
     .catch(err => console.log(err))
  }, [october, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/november")
     .then(res => setNovember(res.data))
     .catch(err => console.log(err))
  }, [november, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/december")
     .then(res => setDecember(res.data))
     .catch(err => console.log(err))
  }, [december, user?.id ])


  
  const data = [
    { name: "??????????", ??????????: januar, ????????????: 12000, pv: 2400, amt: 2400 },
    { name: "????????????", ??????????: february, ????????????: 9500, pv: 2400, amt: 1760 },
    { name: "??????", ??????????: march, ????????????: 13800, pv: 1580, amt: 2170 },
    { name: "??????????", ??????????: april, ????????????: 1700, pv: 870, amt: 2768 },
    { name: "??????", ??????????: may, ????????????: 14500, pv: 980, amt: 1877 },
    { name: "????????", ??????????: june, ????????????: 7564, pv: 650, amt: 2768 },
    { name: "????????", ??????????: july, ????????????: 9788, pv: 456, amt: 2295 },
    { name: "????????????", ??????????: august, ????????????: 4533, pv: 1024, amt: 2489 },
    { name: "'??????", ??????????: september, ????????????: 8934, pv: 445, amt: 988 },
    { name: "'??????", ??????????: october, ????????????: 10977, pv: 666, amt: 1456 },
    { name: "????????????", ??????????: november, ????????????: 8765, pv: 666, amt: 1456 },
    { name: "'??????", ??????????: december, ????????????: 9644, pv: 666, amt: 1456 },
    
  ];

  
  return (
    <div className="hidden md:block md:col-span-4 bg-white md:w-[680px] md:h-[400px] shadow-2xl rounded-lg border border-gray-300 py-5 overflow-hidden flex-1">
      <div className="flex justify-center space-x-5 mb-2">
          <div className="w-fit h-fit px-2 py-1 rounded-full border border-[#82ca9d]">
            <h1 className="text-sm text-[#82ca9d]">????????????</h1>
          </div>
          <div className="w-fit h-fit px-2 py-1 rounded-full border border-[#8884d8] text-center">
            <h1 className="text-sm text-[#8884d8]">????????????</h1>
          </div>
      </div>
      <LineChart
        width={740}
        height={320}
        data={data}
        margin={{ top: 0, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="??????????" stroke="#8884d8" />
        <Line type="monotone" dataKey="????????????" stroke="#82ca9d" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default RightChart;
