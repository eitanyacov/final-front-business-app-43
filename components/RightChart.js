import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const RightChart = () => {
  const data = [
    { name: "January", uv: 400, pv: 2400, amt: 2400 },
    { name: "February", uv: 644, pv: 2400, amt: 1760 },
    { name: "March", uv: 540, pv: 1580, amt: 2170 },
    { name: "April", uv: 320, pv: 870, amt: 2768 },
    { name: "May", uv: 244, pv: 980, amt: 1877 },
    { name: "June", uv: 320, pv: 650, amt: 2768 },
    { name: "July", uv: 368, pv: 456, amt: 2295 },
    { name: "August", uv: 320, pv: 1024, amt: 2489 },
    { name: "July", uv: 189, pv: 445, amt: 988 },
    { name: "August", uv: 433, pv: 666, amt: 1456 },
    
  ];
  return (
    <div className="hidden md:block md:col-span-4 bg-white md:w-[680px] md:h-[400px] shadow-2xl rounded-lg border border-gray-300 py-16 overflow-hidden flex-1">
      <LineChart
        width={700}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default RightChart;
