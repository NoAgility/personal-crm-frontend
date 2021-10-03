
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddTaskForm from './AddTaskForm';
import TaskController from './TaskController';
import TaskList from './TaskList';
import "./Tasks.css";
const TaskPage = (props) => {

    const [modalShow, setModalShow] = useState(false);

    const openModal = () => {setModalShow(true)};
    const hideModal = () => {setModalShow(false)};
    const [tasksByDate, setTasksByDate] = useState([]);

    /**
     * Function for wrapping an update task call to the backend
     * @param {*} task The new task details
     * @param {*} changes The attributes that have changed
     */
    const updateTask = async (task, changes) => {
        if (changes.taskName) {
            await TaskController.updateTaskName(task);
        }
        if (changes.taskDeadline) {
            await TaskController.updateTaskDeadline(task);
        }
        if (changes.taskPriority) {
            await TaskController.updatePriority(task);
        }
        if (changes.taskNotes) {
            //Backend needs to fix this
        }
        getTasks();
    }
    
    
    /**
     * Function to call to the backend to delete task for user
     * @param {*} task Task to be deleted
     */
    const deleteTask = async (task) => {
        await TaskController.deleteTask(task);
        getTasks();
    }
    /**
     * Call to backend to add task for user
     * @param {*} task Task to be added
     */
    const addTask = async (task) => {
        
        await TaskController.addTask(task);
        getTasks();
        
    };
    /**
     * Fetch the tasks from the backend and set tasks into component state
     */
    const getTasks = async () => {
        const tasks = await TaskController.fetchTasks();
        if (tasks !== undefined) {
            sortByDate(tasks);
            setTasksByDate(groupByDate(tasks));
        }
    }
    /**
     * Groups tasks by dates
     * @param {*} tasks Tasks to be grouped
     * @returns Array of groups of tasks by date
     */
    const groupByDate = (tasks) => { 
        const reduced = {}; 
        tasks.forEach((task) => {(
            reduced[task.taskDeadline] = reduced[task.taskDeadline] || [] ).push(task); 
        })
        return reduced;
    };
    /**
     * Custom sorter for tasks, sorts by dates closest to Today
     * null Dates or 1970 January 1 will always be last
     * @param {*} tasks Tasks to be sorted
     */
    const sortByDate = (tasks) => {
        tasks.sort((a, b) => {
            var dateA = new Date(a.taskDeadline);
            var dateB = new Date(b.taskDeadline);
            if (dateA.toLocaleDateString() === new Date(0).toLocaleDateString()) return 1;
            if (dateB.toLocaleDateString() === new Date(0).toLocaleDateString()) return -1;
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        }
    )};
    /**
     * On render, fetch existing tasks to display to the user.
     */
    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await TaskController.fetchTasks();
           
            if (tasks === undefined || tasks.length === 0) return;
            sortByDate(tasks);
            setTasksByDate(groupByDate(tasks));
        };
        fetchTasks();
    }, []);
    
    return (<React.Fragment>
        <div className="tasks-page">
            <div className="tasks-header">
                    <h1>Tasks</h1>
                    <button data-testid="add-task" className="create-task-btn" onClick={() => { openModal() }}>
                        <MdAdd size={22}/>
                        <h4>Add</h4>
                    </button>
                </div>
            <div className="tasks-container">
                {Object.keys(tasksByDate)
                    .map(key => { 
                        return <TaskList 
                            key={tasksByDate[key][0].taskDeadline}
                            tasks={tasksByDate[key]}
                            editOptions={{update: updateTask, delete: deleteTask}}/>
                            })}
            {modalShow ? <AddTaskForm submit={addTask} show={modalShow} onHide={hideModal}/> : ""}
            </div>
        </div>
    </React.Fragment>)
}

export default TaskPage;