import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';

const SchedulerPage = () => {

    const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];
  return (
      <div className='w-[80%] ml-[200px]'>
<Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      <EditingState />
      <IntegratedEditing />
      <WeekView />
      {/* <DayView
        startDayHour={9}
        endDayHour={14}
      /> */}
      <Appointments />
      <AppointmentForm />
    </Scheduler>
  </Paper>
      </div>
    
  )
}

export default SchedulerPage