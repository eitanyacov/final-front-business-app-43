import React, { useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';
import { DragDropProvider } from '@devexpress/dx-react-scheduler-material-ui';
import { Snackbar, Alert } from '@mui/material';
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

    const [open, setOpen] = useState(false);
    const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T00:45', endDate: '2018-11-01T01:30', title: 'Meeting' },
  { startDate: '2018-10-29T03:00', endDate: '2018-10-29T03:30', title: 'Go to a gym' },
];
const dragDisableIds = new Set([3, 8, 10, 12]);

const allowDrag = ({ id }) => !dragDisableIds.has(id);

const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    return <Appointments.Appointment {...props} />;
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};
const handleClose = () => {
    setOpen(false);
}

  return (
      <div className='w-[80%] md:ml-[200px] mt-3'>
<Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
      {/* <EditingState onCommitChanges={(paramas)=> console.log(paramas)}/> */}
      <EditingState onCommitChanges={()=> setOpen(true)}/>
      <IntegratedEditing />
      <WeekView />
      {/* <DayView
        startDayHour={9}
        endDayHour={14}
      /> */}
      <Appointments 
       appointmentComponent={appointmentComponent}/>
      <AppointmentForm />
      <DragDropProvider
            allowDrag={allowDrag}
          />
    </Scheduler>
  </Paper>
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Addede a success message!
  </Alert>
</Snackbar>
<Alert severity="error">This is an error message!</Alert>
<Alert severity="warning">This is a warning message!</Alert>
<Alert severity="info">This is an information message!</Alert>
<Alert severity="success">This is a success message!</Alert>
      </div>
    
  )
}

export default SchedulerPage