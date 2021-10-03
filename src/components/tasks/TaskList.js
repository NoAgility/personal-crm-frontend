
import React, { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import "./Tasks.css";
const TaskList = ({tasks, editOptions}) => {

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    
    const date = new Date(tasks[0].taskDeadline).toLocaleDateString("en-US", options);

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
    return (<div className="tasks-section-container">
        <div className="task-title">
            <div className="task-date">{formatDate(date)}</div>
        </div>
        {tasks.map(t => <TaskItem key={t.taskID} onUpdate={editOptions.update} onDelete={editOptions.delete} task={t}/>)}
    </div>)
}

export default TaskList;