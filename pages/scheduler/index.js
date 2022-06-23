import React, { useState, useEffect } from 'react';
import SideBarPage from "../../components/SideBarPage";
import { useRouter } from 'next/router'
// import { DragDropProvider, DateNavigator, TodayButton, Toolbar } from "@devexpress/dx-react-scheduler-material-ui";
import { Snackbar, Alert } from "@mui/material";
import axios from 'axios'
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DragDropProvider,
  DateNavigator,
  TodayButton,
  Toolbar,
  DayView,
  MonthView,
  Appointments,
  WeekView,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

const SchedulerPage = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState()
  const [user, setUser] = useState({})
  const [changed, setChanged] = useState([])
  const [date, setDate] = useState(new Date());
  const [schedulers, setSchedulers] = useState([])
  
  // const [startDate, setStartDate] = useState()
  // const [endDate, setendDate] = useState()
  
  const router = useRouter();
  useEffect(()=> {
      const res = localStorage.getItem("user")
      const result = JSON.parse(res)
      setUser(result)
      
  }, [])

  useEffect(()=> {
    const id = user?.id;
    axios.get(`http://localhost:8080/api/user/schedulers-by-user/${id}`)
    .then(res => {setSchedulers(res.data), console.log(res.data)})
    .catch(err => console.log(err))
  }, [user?.id])
  // const currentDate = "2018-11-01";
  // const currentDate = new Date()
  // const schedulerData = [
  //   {
  //     id: 1,
  //     startDate: "2022-06-14T07:45",
  //     endDate: "2022-06-14T08:45",
  //     title: "Meeting",
  //     notes: "do some stuff"
  //   },
  //   {
  //     id: 2,
  //     startDate: "2022-06-12T09:00",
  //     endDate: "2022-06-12T10:45",
  //     title: "go to the gym",
  //     notes: "do some stuff"
  //   },
  // ];
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
  //   setOpen(true)
  // }
  // const commitChanges = ({ added }) => {
  //   console.log(added)
  //   setOpen(true)
  // }

  // const commitChanges = ({ deleted }) => {
  //   console.log("------------------------")
  //   console.log("deleted: ")
  //   console.log(deleted)
  //   console.log("------------------------")
  //   setOpen(true)
  // }
  const commitChanges = ({ added, deleted, changed }) => {
    // console.log(added?.startDate)
    // console.log(added?.endDate)
    // console.log(added?.title)
    // console.log(added?.notes)
    // setTitle(added?.title)
    // setStartDate(added?.startDate)
    // setEndDate(added?.endDate)
    // setNotes(added?.notes)
    // console.log("title: " + title + "notes: " + notes)
    // console.log(title, startDate, endDate, notes)
    // console.log("changed: " + changed)

    // if(changed) {
    //   setChanged(changed);
    //   schedulers.map(s => {
    //     if(changed[s.id]){
    //       console.log(s.id)
    //       setId(s.id)
    //       // console.log(changed[id]?.startDate)
    //       // console.log(changed[id]?.endDate)
   
         
          
 
    console.log("deleted: ? " + deleted)
    if(deleted) {
      axios.delete("http://localhost:8080/api/user/delete-scheduler/" + deleted)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
       setOpen(true)
       router.reload()
    }

   if(added) {
    axios.post("http://localhost:8080/api/user/add-scheduler/" + user?.id, {
      title: added?.title,
      startDate: added?.startDate,
      endDate: added?.endDate,
      notes: added?.notes
    }).then(res => {console.log(res.data)})
    // .catch(error => setError(error.response.data))
    .catch(error => console.log(error.response.data))
     setOpen(true)
     router.reload()
   }
         
  }
  const currentDateChange = (currentDate) => {
        setDate(currentDate)
  }

  const handleClose = () => {
    setOpen(false);
  };
  if(!user) router.push('/login')
  return (
    <>
      <SideBarPage />
      <div className="w-[82%] md:ml-[205px] mt-1">
        <Paper>
          <Scheduler data={schedulers}>
            <ViewState currentDate={date} onCurrentDateChange={currentDateChange}/>
            {/* <EditingState onCommitChanges={(paramas)=> console.log(paramas)}/> */}
            {/* <EditingState onCommitChanges={() => setOpen(true)} /> */}
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <WeekView startDayHour={5} endDayHour={24}/>
            <MonthView />
            {/* <DayView
        startDayHour={9}
        endDayHour={14}
      /> */}
            <Toolbar />
            <DateNavigator/>
            <TodayButton />
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
