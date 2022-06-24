import React, { useState, useEffect } from 'react';
import BarCharts from "./BarCharts";
import AreaCharts from './AreaCharts';
import DashboardDataGrid from './DashboardDataGrid';

const ReportsBar = () => {
  
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <div className="ml-[80px] md:ml-[205px] mt-3">
        {/* <h1 className="text-2xl text-gray-700 font-semibold ml-3">Reports</h1> */}
      <div
        // style={{
        //   height: 500,
        //   width: "95%",
        //   marginLeft: "10px",
        //   marginTop: "10px",
        // }}
      >
        {!isSSR && <BarCharts />}
      </div>
      <DashboardDataGrid />
      {!isSSR && <AreaCharts />}
      
    </div>
  );
};

export default ReportsBar;
