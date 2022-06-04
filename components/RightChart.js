import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const RightChart = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 1760 },
    { name: "Page B", uv: 540, pv: 1580, amt: 2170 },
    { name: "Page C", uv: 320, pv: 870, amt: 2768 },
  ];
  return (
    <div className="bg-white w-[680px] h-[400px] shadow-2xl rounded-lg border border-gray-300 py-16">
      <LineChart
        width={600}
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
