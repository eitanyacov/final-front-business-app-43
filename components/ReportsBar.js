import React, { useState, useEffect } from 'react';
import { DataGrid, GridValueGetterParams  } from "@mui/x-data-grid";
import PiesCharts from "./PiesCharts";

const ReportsBar = () => {
  
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);
  return (
    <div className="ml-[80px] md:ml-[205px] mt-3">
        {/* <h1 className="text-2xl text-gray-700 font-semibold ml-3">Reports</h1> */}
      <div
        style={{
          height: 500,
          width: "95%",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        {!isSSR && <PiesCharts />}
      </div>
    </div>
  );
};

export default ReportsBar;
