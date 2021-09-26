import "./Task.css";
import React, { useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi'
import AddTaskForm from './AddTaskForm';
const Task = (props) => {
    return <div className="task">
        <span className="task-label"/>Task
    </div>
}
const TaskList = (props) => {

    return (<div className="tasks-container">
        <div className="task-title">
            <div className="task-alias">{props.name}</div> <div className="task-date">{props.date}</div>
        </div>
        <Task/>
        <Task/>
        <Task/>
    </div>)
}
const AddTask = (props) => {

    const [open, setOpen] = useState(false);

    const addTask = (task) => {
        console.log(task);
    }
    const closeForm = () => {setOpen(false)};
    const openForm = () => {setOpen(true)};
    return <React.Fragment>
        {open ? <AddTaskForm submit={addTask} cancel={closeForm}/>:
        <div className="task-add">
            <div className="task-label-2" onClick={openForm}>+</div>Add Task
        </div>}
    </React.Fragment>
}
const TaskPage = (props) => {

    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    var rows = [];

    var tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    return (<React.Fragment><div className="task-scroll-container">
        <TaskList name="Today" date={new Date().toLocaleDateString("en-US", options)}/>
        <TaskList name="Tommorow" date={tommorow.toLocaleDateString("en-US", options)}/>
        <TaskList name="" date={tommorow.toLocaleDateString("en-US", options)}/>
        <TaskList name="" date={tommorow.toLocaleDateString("en-US", options)}/>
        <TaskList name="" date={tommorow.toLocaleDateString("en-US", options)}/>
        <TaskList name="" date={tommorow.toLocaleDateString("en-US", options)}/>
        </div>
        <AddTask/>
        </React.Fragment>)
}

export default TaskPage;