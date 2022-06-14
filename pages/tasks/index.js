import React, { useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import SideBarPage from '../../components/SideBarPage';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import axios from 'axios';
import Task from '../../components/Task';



const Tasks = () => {

    const [data, setData] = useState([])
    const [user, setUser] = useState({})

    useEffect(()=> {
        const res = localStorage.getItem("user")
        const result = JSON.parse(res)
        setUser(result)
        
    }, [])

    useEffect(()=> {
        const id = user?.id;
        // axios.get(`http://localhost:8080/api/user/user-task-statuses/${id}`)
        axios.get(`http://localhost:8080/api/user/user-task-statuses/25`)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [user?.id])

    const changeColor = (name) => {
        if(name == "Backlog") {
            return 'success'
        }else if(name == "In Progress") {
            return 'primary'
        }else {
            return 'secondary'
        }
    }

    const changeIcon = (name) => {
        if(name == "Backlog") {
            return AddLinkIcon
        }else if(name == "In Progress") {
            return AccessTimeIcon
        }else {
            return TaskAltIcon
        }
    }

    // const changeIcon = (name) => {
    //     console.log(name)
    // }

    const onDragEnd = (result) => {
        console.log(result)
    }

    return (
        <>
        <SideBarPage />
        <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex justify-around ml-[220px] mt-5'>
            {
                data.map(section => (
                    <Droppable key={section.id} droppableId={section.id.toString()}>
                        {(provided) => (
                            <div className='flex flex-col items-center' ref={provided.innerRef} {...provided.droppableProps}>
                                    <h1>{section.name}</h1>
                                    {section.tasks.map((task, index) => (
                                         <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                <div style={{...provided.draggableProps.style, backgroundColor: snapshot.isDragging ? 'red' : 'blue'}} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <Task title={task.description} date={task.date} icon={changeIcon(section.name)} color={changeColor(section.name)}/>
                                                </div>
                                            )}
                                         </Draggable>
                                    ))}
                                    {provided.placeholder}
                            </div>
                            
                            
                        )}
                    </Droppable>
                ))
            }
        </div>
        </DragDropContext>
        
        </>
    )


}

export default Tasks




// const Tasks = () => {
//     const [data, setData] = useState([])
//     const [user, setUser] = useState({})

//     useEffect(()=> {
//         const res = localStorage.getItem("user")
//         const result = JSON.parse(res)
//         setUser(result)
        
//     }, [])

//     useEffect(()=> {
//         const id = user?.id;
//         axios.get(`http://localhost:8080/api/user/user-task-statuses/${id}`)
//         .then(res => setData(res.data))
//         .catch(err => console.log(err))
//     }, [user?.id])
//     console.log("the data is: " + data);
//   return (
//     <>
//     <SideBarPage />
//             <div className='flex justify-around ml-[220px] mt-5'>
//                 {data.map(task => (
//                     <>
//                     <div className='flex flex-col items-center'>
//                      <div key={task.id}>
//                         <h1>{task.name}</h1>
//                         {task.tasks.map(t => (
//                             <>
//                             <div className='mr-8'>
//                             <Task title={t.description} date={t.date}/>
//                             {/* <h1>{t.description}</h1>
//                             <h1>{t.date}</h1> */}
//                             </div>
                            
//                             </>
                            
//                         ))}
//                     </div>
                
//                     </div>
//                     </>
                    
//                 ))}
                 
                 
                   
//             </div>
    
//     </>
    
//   )
// }

// export default Tasks



