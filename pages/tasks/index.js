import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SideBarPage from "../../components/SideBarPage";
import AddLinkIcon from "@mui/icons-material/AddLink";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PreviewIcon from "@mui/icons-material/Preview";
import { FormControl, Input, Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useRouter } from "next/router";
import axios from "axios";
import Task from "../../components/Task";

const Tasks = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [taskStatusId, setTaskStatusId] = useState();
  const [modelOpen, setModelOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const res = localStorage.getItem("user");
    const result = JSON.parse(res);
    setUser(result);
  }, []);

  useEffect(() => {
    const id = user?.id;
    const url = "http://localhost:8080/api/user/user-task-statuses/" + id;
    // axios.get(`http://localhost:8080/api/user/user-task-statuses/${id}`)
    axios
      .get(url)
      // axios.get(`http://localhost:8080/api/user/user-task-statuses/24`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [user?.id]);

  const changeColor = (colorName) => {
    if (colorName == "Backlog") {
      return "success";
    } else if (colorName == "In Progress") {
      return "primary";
    } else if (colorName == "Review") {
      return "warning";
    } else {
      return "secondary";
    }
  };

  const changeIcon = (iconName) => {
    if (iconName == "Backlog") {
      return AddLinkIcon;
    } else if (iconName == "In Progress") {
      return AccessTimeIcon;
    } else if (iconName == "Review") {
      return PreviewIcon;
    } else {
      return TaskAltIcon;
    }
  };

  // const onDragEnd = (result) => {
  //     console.log(result)
  //     const { destination, source } = result;
  //     if(!destination) return;
  //     console.log(destination.droppableId)
  //     console.log(result.draggableId)
  //     axios.get("http://localhost:8080/api/user/update-status-for-task/" + destination.droppableId + "/" + result.draggableId)
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err))
  //     window.location.reload();

  // }

  const addTask = (id) => {
    axios.post("http://localhost:8080/api/user/addTask/" + id, {
            date,
            description
          }).then(res => console.log(res.data))
          .catch(error => setError(error.response.data))
          setDate("")
          setDescription("")
          setModelOpen(false)
        //   router.push('/tasks1')
        router.reload();
  }

  const openModel = (id) => {
    console.log("section id: " + id);
    setTaskStatusId(id);
    setModelOpen(true);
  };

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source } = result;
    if (!destination) return;
    console.log(destination.droppableId);
    console.log(result.draggableId);
    // const x = parseInt(destination.droppableId)
    // const y = parseInt(result.draggableId)
    axios
      .get(
        "http://localhost:8080/api/user/update-status-for-task/" +
          destination.droppableId +
          "/" +
          result.draggableId
      )
      // axios.get("http://localhost:8080/api/user/update-status-for-task/" + x + "/" + y)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    // router.push('/tasks1')
    router.reload();
  };

  return (
    <>
      <SideBarPage />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-around ml-[220px] mt-5">
          {data.map((section) => (
            <Droppable key={section.id} droppableId={section.id.toString()}>
              {(provided) => (
                <div
                  className="flex flex-col items-center border border-gray-400 border-t-4 h-fit p-2 rounded-lg md:min-w-[220px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div
                    className={`flex justify-between items-center ${
                      section.name == "Complete"
                        ? `bg-purple-100`
                        : `bg-green-100`
                    } w-full rounded-md p-2`}
                  >
                    <h1 className="text-xl font-semibold text-[#333]">
                      {section.name}
                    </h1>
                    <div
                      className={`border px-2 py-1 rounded-xl ${
                        section.name == "Complete" ? `hidden` : `flex`
                      } bg-red-200 w-fit cursor-pointer hover:bg-red-100`}
                      onClick={() => openModel(section.id)}
                    >
                      <h1 className="text-xs font-semibold text-[#333]">
                        Add Task
                      </h1>
                    </div>
                  </div>
                  <div>
                    {modelOpen && section.id == taskStatusId && (
                      <div className="flex flex-col justify-between md:min-w-[200px] h-[130px] mt-2 border border-gray-500 rounded-md">
                        <FormControl>
                          <Input type="date" onChange={e => setDate(e.target.value)} />
                          <TextareaAutosize
                            maxRows={3}
                            aria-label="maximum height"
                            placeholder="Maximum 3 rows"
                            style={{ width: 200 }}
                            onChange={e => setDescription(e.target.value)}
                          />
                        </FormControl>
                        <Button
                          className=""
                        //   onClick={() => setModelOpen(false)}
                          onClick={() => addTask(taskStatusId)}
                        >
                          Add Task
                        </Button>
                      </div>
                    )}
                  </div>
                  {section?.tasks?.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          style={{
                            ...provided.draggableProps.style,
                            backgroundColor: snapshot.isDragging
                              ? "red"
                              : "blue",
                          }}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            title={task.description}
                            date={task.date}
                            icon={changeIcon(section.name)}
                            color={changeColor(section.name)}
                            id={task.id}
                            isChecked={task.urgent}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Tasks;
