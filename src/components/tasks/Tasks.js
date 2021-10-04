
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddTaskForm from './AddTaskForm';
import TaskController from './TaskController';
import TaskList from './TaskList';
import "./Tasks.css";
import Sort from '../UIComponents/sort/Sort.js';
const TaskPage = (props) => {

    const [modalShow, setModalShow] = useState(false);

    const openModal = () => {setModalShow(true)};
    const hideModal = () => {setModalShow(false)};
    const [tasks, setTasks] = useState([]);
    const [tasksByGroup, setTasksByGroup] = useState([]);
    const [activeSort, setActiveSort] = useState("date");

    const setSortByDate = () => {
        setActiveSort("date");
        dateGroupSort();
    };
    const setSortByPriority = () => {
        setActiveSort("priority"); 
        priorityGroupSort();
    };
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
        const data = await TaskController.fetchTasks();
        setTasks(data);
        if (data === undefined) return;

        // Use data due to asyncronous nature
        if (activeSort === 'date') {
            dateGroupSort(data);
        } else {
            priorityGroupSort(data);
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
    const sortByPriority = (tasks) => {
        tasks.sort((a, b) => {
            if (a.taskPriority > b.taskPriority) return -1;
            if (a.taskPriority < b.taskPriority) return 1;
            return 0;
        }
    )};
    const groupByPriority = (tasks) => { 
        const reduced = {}; 
        tasks.forEach((task) => {(
            reduced[task.taskPriority] = reduced[task.taskPriority] || [] ).push(task); 
        })
        return reduced;
    };
    const dateGroupSort = (data) => {
        let toSort = data !== undefined ? data : tasks !== null ? tasks : [];
        setActiveSort("date");
        sortByDate(toSort);
        setTasksByGroup(groupByDate(toSort));
    }
    const priorityGroupSort = (data) => {
        let toSort = data !== undefined ? data : tasks !== null ? tasks : [];
        setActiveSort("priority");
        sortByPriority(toSort);
        setTasksByGroup(groupByPriority(toSort));
        
    }
    const sortTypes = [
        {
            label:"Sort by date",
            sortFunction: setSortByDate
        },
        {
            label:"Sort by priority",
            sortFunction: setSortByPriority
        }
    ]
    /**
     * On render, fetch existing tasks to display to the user.
     */
    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskController.fetchTasks();
            setTasks(data);
            if (data === undefined || data.length === 0) return;

            dateGroupSortAlt(data);
        };

        //React throws a warning if I don't encapsulate the dependencies inside useEffect
        //Hence two similar functions
        const dateGroupSortAlt = (data) => {
            sortByDate(data);
            setTasksByGroup(groupByDate(data));
        }
        fetchTasks();
    }, []);
    
    return (<React.Fragment>
            <div className="tasks-page">
                <div className="tasks-header">
                    <h1>Tasks</h1>
                    <button 
                        data-testid="add-task" 
                        className="create-task-btn" 
                        onClick={() => { openModal() }}>
                        <MdAdd size={22}/>
                        <h4>Add</h4>
                    </button>
                </div>
                <div className="tasks-sub-header">
                    <div className="filter-dropdown">
                        <Sort sortTypes={sortTypes}/>
                    </div>
                </div>
                <div className="tasks-container">
                    {Object.keys(tasksByGroup)
                        .map(key => { 
                            return <TaskList 
                                key={key}
                                label={activeSort}
                                tasks={tasksByGroup[key]}
                                editOptions={{update: updateTask, delete: deleteTask}}/>
                                })}
                {modalShow ? <AddTaskForm submit={addTask} show={modalShow} onHide={hideModal}/> : ""}
                <p/>
            </div>
        </div>
    </React.Fragment>)
}

export default TaskPage;