import React, { useState, useEffect } from "react";
import SideBarPage from "../../components/SideBarPage";

import axios from 'axios';
import { useRouter } from "next/router";

const Reports = () => {
  const [user, setUser] = useState({});
  const [month, setMonth] = useState("");
  const [februaryAmount, setFebruaryAmount] = useState();
  const [januarAmount, setJanuarAmount] = useState();
  const [marchAmount, setMarchAmount] = useState(3452);
  const [aprilAmount, setAprilAmount] = useState(6432);
  const [mayAmount, setMayAmount] = useState(8765);
  const [juniAmount, setJuniAmount] = useState(2486);
  const [juliAmount, setJuliAmount] = useState(4321);
  const [augustAmount, setAugustAmount] = useState(6757);
  const [septemberAmount, setSeptemberAmount] = useState(6542);
  const [octoberAmount, setOctoberAmount] = useState(8763);
  const [novemberAmount, setNovemberAmount] = useState(1565);
  const [decemberAmount, setDecemberAmount] = useState(6562);
  const router = useRouter();

  const monthsIncomes = [januarAmount, februaryAmount, marchAmount, aprilAmount, mayAmount, juniAmount, juliAmount, augustAmount, septemberAmount, octoberAmount, novemberAmount, decemberAmount]

  const months = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"]

  
  useEffect(() => {
    const res = localStorage.getItem("user");
    const result = JSON.parse(res);
    setUser(result);
  }, []);

  
  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/February")
     .then(res => setFebruaryAmount(res.data))
     .catch(err => console.log(err))
  }, [februaryAmount, user?.id ])

  useEffect(()=> {
    const id = user?.id
     axios.get("http://localhost:8080/api/user/user-income-by-month/" + id + "/January")
     .then(res => setJanuarAmount(res.data))
     .catch(err => console.log(err))
  }, [januarAmount, user?.id ])

 
  if (!user) router.push("/login");
  return (
    <>
      <SideBarPage />
      <div className="ml-[205px] mt-10 text-3xl">
           <div>
           <div className="flex justify-between">
              {months.map(m => (
                     
                     <h1>{m}</h1>
                     
              ))}
              </div>
              <div className="flex justify-between items-center mt-3">
              {monthsIncomes.map(m => (
                <h1>{m}</h1>
              ))}
              </div>
           </div>
      </div>
    </>
  );
};

export default Reports;
