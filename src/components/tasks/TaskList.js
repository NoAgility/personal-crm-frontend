
import React from 'react';
import TaskItem from './TaskItem';
import "./Tasks.css";

const priorities = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
    "None": -1
}

const TaskList = ({tasks, contacts, allContacts, label, editOptions, isComplete, isOverdue}) => {

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    /**
     * Date formatter to change the date to an alias, eg. Today
     * @param {*} date The date to be formatted
     * @returns The formatted date
     */
    const formatDate = (date) => {
        const getDisplayDate = (date) => {
            const dateOptions = { month: 'long', day: 'numeric'};
            const timeOptions = {hour: 'numeric', minute: 'numeric'};
            const start = new Date(date);
            let outDate = "";
            let time = "\n";
            if (start.getDate()) {
                outDate = start.toLocaleDateString("en-UK", dateOptions);
                time += start.toLocaleTimeString("en-UK", timeOptions);
            }
            return date;
        }
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var formattedDate = new Date(0).toLocaleDateString("en-US", options) === date ? "No deadline" : getDisplayDate(date);
        formattedDate = tomorrow.toLocaleDateString("en-US", options) === date ? "Tomorrow" : formattedDate;
        formattedDate = new Date().toLocaleDateString("en-US", options) === date ? "Today" : formattedDate;
        formattedDate = isOverdue ? "Overdue" : formattedDate;
        formattedDate = isComplete ? "Completed" : formattedDate;
        return formattedDate;
    }

    /**
     * Method for formatting the priority header
     * @param {} priority the priority of the tasks
     * @returns the formatted priority
     */
    const formatPriority = (priority) => {
        var p = priority.toString();
        p = p === "-1" ? "No Priority Set" : "Priority: " + p;
        p = isOverdue ? "Overdue" : p;
        p = isComplete ? "Completed" : p;
        return p;
    }

    /**
     * Method for formatting the header of a task list
     * @returns the formatted label for the list
     */
    const getLabel = () => {
        if (label === "date") {
            let date = new Date(tasks[0].taskDeadline).toLocaleDateString("en-US", options);
            return formatDate(date)
        } else if (label === "priority") {
            return formatPriority(Object.entries(priorities).filter(p => p[1] === tasks[0].taskPriority)[0][0]);
        }
    }
    return (<div className="tasks-section-container">
        <div className="task-title">
            <div className="task-label">{getLabel()}</div>
        </div>
        {tasks.map(t => <TaskItem 
            key={t.taskID}
            onUpdate={editOptions.update} 
            onDelete={editOptions.delete} 
            onComplete={editOptions.complete}
            searchContact={editOptions.searchContact}
            isOverdue={isOverdue}
            task={t}
            contacts={contacts}
            allContacts={allContacts || []}
            />)}
    </div>)
}

export default TaskList;