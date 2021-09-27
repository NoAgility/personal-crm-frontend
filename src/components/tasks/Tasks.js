import "./Tasks.css";
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { BiPlusCircle } from 'react-icons/bi'
import AddTaskForm from './AddTaskForm';
import TaskController from './TaskController';
const Task = (props) => {
    return <div className="task">
        <span className="task-label"/>{props.name}
    </div>
}
const TaskList = ({tasks}) => {

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    var tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    return (<div className="tasks-container">
        <div className="task-title">
            <div className="task-alias">{tasks[0].taskDeadline === new Date() ? "Today" : ""}</div> 
            <div className="task-date">{new Date(tasks[0].taskDeadline).toLocaleDateString("en-US", options)}</div>
        </div>
        {tasks.map(t => <Task name={t.taskName}/>)}
    </div>)
}
const AddTask = (props) => {

    
    
}
const TaskPage = (props) => {

    const [modalShow, setModalShow] = useState(false);

    const openModal = () => {setModalShow(true)};
    const hideModal = () => {setModalShow(false)};

    var rows = [];

    const [tasksByDate, setTasksByDate] = useState([]);
    const fetchTasks = async () => {
        const tasks = await TaskController.fetchTasks();
       
        if (tasks === undefined || tasks.length === 0) return;
        sortByDate(tasks);
        setTasksByDate(groupByDate(tasks));
    };
    const addTask = async (task) => {
        const data = {
            "taskName": task.name,
            "deadline": task.date || ""
        }
        await TaskController.addTask(data);
        fetchTasks();
    }
    const groupByDate = (tasks) => { 
        const reduced = {}; 
        tasks.forEach((task) => {(
            reduced[task.taskDeadline] = reduced[task.taskDeadline] || [] ).push(task); 
        })
        return reduced;
    };
    const sortByDate = (tasks) => {
        tasks.sort((a, b) => {
            var dateA = new Date(a.taskDeadline);
            var dateB = new Date(b.taskDeadline);

            if (dateA < dateB) return 1;
            if (dateA > dateB) return -1;
            return 0;
        }
    )};
    useEffect(fetchTasks, []);
    
    return (<React.Fragment><div className="task-container">
        
        <div className="contact-header">
				<h1>Contacts</h1>
				<button data-testid="add-contact" className="create-contact-btn" onClick={() => { openModal() }}>
					<MdAdd size={22}/>
					<h4>Add</h4>
				</button>
			</div>
        {Object.keys(tasksByDate).map(key => <TaskList tasks={tasksByDate[key]}/>)}
        {modalShow ? <AddTaskForm submit={addTask} show={openModal} onHide={hideModal}/> : ""}
        </div>
        </React.Fragment>)
}

export default TaskPage;