import LeftChart from "./LeftChart"
import RightChart from "./RightChart"

const MiddleBar = () => {
  return (
   
    <div className="flex ml-[80px] md:ml-[200px] justify-between mt-2 space-x-3 p-3">
      <LeftChart />
      <RightChart />
      
    </div>
  )
}

export default MiddleBar