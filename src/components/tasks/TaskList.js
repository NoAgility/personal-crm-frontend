
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import "./Tasks.css";
const TaskList = ({tasks, contacts, label, editOptions}) => {

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    
    

    /**
     * Date formatter to change the date to an alias, eg. Today
     * @param {*} date The date to be formatted
     * @returns The formatted date
     */
    const formatDate = (date) => {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var formattedDate = new Date(0).toLocaleDateString("en-US", options) === date ? "No deadline" : date;
        formattedDate = tomorrow.toLocaleDateString("en-US", options) === date ? "Tomorrow" : formattedDate;
        formattedDate = new Date().toLocaleDateString("en-US", options) === date ? "Today" : formattedDate;
        return formattedDate;
    }

    const formatPriority = (priority) => {
        let p = priority.toString();
        return p === "-1" ? "No Priority Set" : "Priority: " + p;
    }

    const getLabel = () => {
        if (label === "date") {
            let date = new Date(tasks[0].taskDeadline).toLocaleDateString("en-US", options);
            return formatDate(date)
        } else if (label === "priority") {
            return formatPriority(tasks[0].taskPriority);
        }
    }
    return (<div className="tasks-section-container">
        <div className="task-title">
            <div className="task-date">{getLabel()}</div>
        </div>
        {tasks.map(t => <TaskItem 
            key={t.taskID} 
            onUpdate={editOptions.update} 
            onDelete={editOptions.delete} 
            task={t}
            contacts={contacts}
            />)}
    </div>)
}

export default TaskList;