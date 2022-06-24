import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const LeftChart = () => {
  const percentage = 66;


  // const [isSSR, setIsSSR] = useState(true);

  // useEffect(() => {
  //   setIsSSR(false);
  // }, []);
  const colors = ["red", "green", "blue", "yellow", "pink", "black"];
  const data = [
    {
      id: 1,
      name: "Group A",
      value: 400,
    },
    {
      id: 2,
      name: "Group B",
      value: 300,
    },
    {
      id: 3,
      name: "Group C",
      value: 500,
    },
    {
      id: 4,
      name: "Group D",
      value: 200,
    },
    {
      id: 5,
      name: "Group E",
      value: 278,
    },
    {
      id: 6,
      name: "Group F",
      value: 189,
    },
  ];

  return (
    <div className="bg-white md:col-span-2 md:w-[284px] h-[400px] shadow-2xl rounded-lg border border-gray-300 p-4">
      <div className="flex">
        <h1 className="text-gray-500 text-xl mx-auto">רווח גולמי החודש</h1>
        {/* <div className='text-gray-600 cursor-pointer'>
          <MoreVertIcon />
          </div> */}
      </div>
      <div className="flex justify-center mt-5">
        <div className="w-24 h-24 md:w-36 md:h-36">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={4}
          />
         
        </div>
      </div>
      <div className="flex-col">
    
        <h1 className="mt-3 text-xs text-gray-500 md:text-sm md:mt-8">
          previous transaction processing last payment may no be included
        </h1>
      </div>
    </div>
  );
};

export default LeftChart;
