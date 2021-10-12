
import React from 'react';
import TaskItem from './TaskItem';
import "./Tasks.css";

const priorities = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
    "None": -1
}

const TaskList = ({tasks, contacts, label, editOptions, isComplete, isOverdue}) => {

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
        formattedDate = isOverdue ? "Overdue" : formattedDate;
        formattedDate = isComplete ? "Completed" : formattedDate;
        return formattedDate;
    }

    const formatPriority = (priority) => {
        var p = priority.toString();
        p = p === "-1" ? "No Priority Set" : "Priority: " + p;
        p = isOverdue ? "Overdue" : p;
        p = isComplete ? "Completed" : p;
        return p;
    }

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
            task={t}
            contacts={contacts}
            />)}
    </div>)
}

export default TaskList;