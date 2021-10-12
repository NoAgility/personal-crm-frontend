
import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import AddTaskForm from './AddTaskForm';
import TaskController from './TaskController';
import ContactController from '../contacts/ContactController';
import TaskList from './TaskList';
import "./Tasks.css";
import Sort from '../UIComponents/sort/Sort.js';
const TaskPage = (props) => {

    const [modalShow, setModalShow] = useState(false);

    const openModal = () => {setModalShow(true)};
    const hideModal = () => {setModalShow(false)};
    const [contacts, setContacts] = useState([]);
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
    
    const completeTask = async(task) => {
        await TaskController.completeTask(task);
        getTasks();
    }
    /**
     * Function for wrapping an update task call to the backend
     * @param {*} task The new task details
     * @param {*} changes The attributes that have changed
     */
    
    const updateTask = async (task, changes) => {
        var requests = []
        if (changes.taskName) {
            requests.push(TaskController.updateTaskName(task));
        }
        if (changes.taskDeadline) {
            requests.push(TaskController.updateTaskDeadline(task));
        }
        if (changes.taskPriority) {
            requests.push(TaskController.updatePriority(task));
        }
        if (changes.taskNotesAdded.length > 0) {
            changes.taskNotesAdded.forEach((i) => {requests.push(TaskController.addTaskNote(i))});
        }
        if (changes.taskNotesRemoved.length > 0) {
            changes.taskNotesRemoved.forEach((i) => {requests.push(TaskController.deleteTaskNote(i))});
        }
        if (changes.taskNotesChanged.length > 0) {
            changes.taskNotesChanged.forEach((i) => {requests.push(TaskController.updateTaskNote(i))});
        }
        if (changes.taskContactIDsAdded.length > 0) {
            changes.taskContactIDsAdded.forEach((i) => {requests.push(TaskController.addTaskContact(task, i))});
        }
        if (changes.taskContactIDsRemoved.length > 0) {
            changes.taskContactIDsRemoved.forEach((i) => {requests.push(TaskController.deleteTaskContact(task, i))});
        }
        if (changes.taskComplete) {
            requests.push(TaskController.completeTask(task));
        }
        await Promise.all(requests).then(() => {getTasks();});
        
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
        getContacts();
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
    const getContacts = async () => {
        const ids = await ContactController.fetchContacts();
        let activeCs = [];
        let cs =  [];
        if (ids !== undefined && ids.length > 0) {
            for (const id of ids) {
                let contactData = await ContactController.fetchContactData(id);
                cs.push(contactData);
            }
            setContacts(cs);
        }
    }
    /**
     * Groups tasks by dates
     * @param {*} tasks Tasks to be grouped
     * @returns Array of groups of tasks by date
     */
    const groupByDate = (tasks) => { 
        const reduced = {}; 
        tasks.forEach((task) => {
            if (task.taskComplete) {
                (reduced["complete"] = reduced["complete"] || []).push(task);
            } else if (!task.taskDeadline) {
                (reduced["no-deadline"] = reduced["no-deadline"] || []).push(task);
            } else if (new Date() > new Date(task.taskDeadline) && !task.taskComplete) {
                (reduced["overdue"] = reduced["overdue"] || []).push(task);
            } else {
                (reduced[task.taskDeadline] = reduced[task.taskDeadline] || []).push(task); 
            }
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
        tasks.forEach((task) => {
            if (task.taskComplete) {
                (reduced["complete"] = reduced["complete"] || []).push(task);
            } else {
                (reduced[task.taskPriority] = reduced[task.taskPriority] || [] ).push(task); 
            }
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
        const fetchContacts = async () => {
            const ids = await ContactController.fetchContacts();
            let cs =  [];
            if (ids !== undefined && ids.length > 0) {
                for (const id of ids) {
                    let contactData = await ContactController.fetchContactData(id);
                    cs.push(contactData);
                }
				setContacts(cs);
            }
        }
        //React throws a warning if I don't encapsulate the dependencies inside useEffect
        //Hence two similar functions
        const dateGroupSortAlt = (data) => {
            sortByDate(data);
            setTasksByGroup(groupByDate(data));
        }
        fetchTasks();
        fetchContacts();
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
                    {Object.keys(tasksByGroup).filter(key => key !== "complete")
                        .map(key => { 
                            return <TaskList 
                                key={key}
                                contacts={contacts}
                                label={activeSort}
                                tasks={tasksByGroup[key]}
                                editOptions={{update: updateTask, delete: deleteTask, complete: completeTask}}
                                isComplete={false}
                                isOverdue={key === "overdue"}/>
                                })}
                    {Object.keys(tasksByGroup).includes("complete") ? 
                        <TaskList 
                            key="complete"
                            contacts={contacts}
                            label={activeSort}
                            tasks={tasksByGroup["complete"]}
                            editOptions={{update: updateTask, delete: deleteTask, complete: completeTask}}
                            isComplete={true}
                            isOverdue={false}/>
                        : ""}
                    {modalShow ? <AddTaskForm 
                        submit={addTask} 
                        show={modalShow} 
                        onHide={hideModal}
                        /> : ""
                    }
                <p/>
            </div>
        </div>
    </React.Fragment>)
}

export default TaskPage;