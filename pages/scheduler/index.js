import React, { useState, useEffect } from 'react';
import SideBarPage from "../../components/SideBarPage";
import { useRouter } from 'next/router'
import { DragDropProvider } from "@devexpress/dx-react-scheduler-material-ui";
import { Snackbar, Alert } from "@mui/material";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  MonthView,
  Appointments,
  WeekView,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

const SchedulerPage = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({})
  const router = useRouter();
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      
  }, [])
  // const currentDate = "2018-11-01";
  const currentDate = new Date()
  const schedulerData = [
    {
      startDate: "2022-06-14T07:45",
      endDate: "2022-06-14T08:45",
      title: "Meeting",
    },
    {
      startDate: "2022-06-12T09:00",
      endDate: "2022-06-12T10:45",
      title: "go to the gym",
    },
  ];
  const dragDisableIds = new Set([3, 8, 10, 12]);

  const allowDrag = ({ id }) => !dragDisableIds.has(id);

  const appointmentComponent = (props) => {
    if (allowDrag(props.data)) {
      return <Appointments.Appointment {...props} />;
    }
    return (
      <Appointments.Appointment
        {...props}
        style={{ ...props.style, cursor: "not-allowed" }}
      />
    );
  };

  // const commitChanges = (data) => {
  //   console.log(data)
  // }
  const commitChanges = ({ added }) => {
    console.log(added?.startDate)
    console.log(added?.endDate)
    console.log(added?.title)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };
  if(!user) router.push('login')
  return (
    <>
      <SideBarPage />
      <div className="w-[80%] md:ml-[200px] mt-3">
        <Paper>
          <Scheduler data={schedulerData}>
            <ViewState currentDate={currentDate} />
            {/* <EditingState onCommitChanges={(paramas)=> console.log(paramas)}/> */}
            {/* <EditingState onCommitChanges={() => setOpen(true)} /> */}
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <WeekView startDayHour={5} endDayHour={24}/>
            <MonthView />
            <DayView
        startDayHour={9}
        endDayHour={14}
      />
            <Appointments appointmentComponent={appointmentComponent} />
            <AppointmentForm />
            <DragDropProvider allowDrag={allowDrag} />
          </Scheduler>
        </Paper>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Addede a success message!
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert> */}
        {/* <Alert severity="success">This is a success message!</Alert> */}
      </div>
    </>
  );
};

export default SchedulerPage;
