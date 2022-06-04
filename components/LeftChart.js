import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const LeftChart = () => {
    const percentage = 66;
  return (
    <div className="bg-white w-[340px] h-[400px] shadow-2xl rounded-lg border border-gray-300 p-4">
        <div className='flex justify-between'>
          <h1 className='text-gray-500 text-xl'>Totol Revenue</h1>
          <div className='text-gray-600 cursor-pointer'>
          <MoreVertIcon />
          </div>
        </div>
        <div className='flex justify-center mt-5'>
          <div className='w-36 h-36'>
            <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={4}/>
          </div>
        </div>
        <div className='text-center mt-5 space-y-2'>
              <h1 className='text-gray-500 text-xl'>Total balance this week</h1>
              <h1 className='text-2xl'>480$</h1>
        </div>
        
    </div>
  )
}

export default LeftChart