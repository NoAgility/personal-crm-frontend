
import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import { Dropdown } from 'react-bootstrap';
import { MdCheck, MdMoreHoriz } from 'react-icons/md';
import "./Tasks.css";
import "./TaskItem.css"
import Confirmation from '../UIComponents/confirm/Confirmation';
const prioritiesColorMap = {
    "1": "circle red-circle",
    "2": "circle yellow-circle",
    "3": "circle green-circle",
    "-1": "circle purple-circle"
}

const TaskItem = ({task, contacts, allContacts, onUpdate, onDelete, onComplete, searchContact, isOverdue}) => {
    const [modalShow, setModalShow] = useState(false);
    const [completeConfirmShow, setCompleteConfirmShow] = useState(false);
    const [deleteConfirmShow, setDeleteConfirmShow] = useState(false);
    const priority = Object.entries(prioritiesColorMap).filter(p => p[0] === task.taskPriority.toString())[0][0];

    const getDisplayDate = () => {
        if (task.taskDeadline === null) {
            return ("")
        }
		const dateOptions = { month: 'long', day: 'numeric'};
		const timeOptions = {hour: 'numeric', minute: 'numeric'};
		const start = new Date(task.taskDeadline);
		let date = "";
		let time = "\n";
		if (start.getDate()) {
			date = start.toLocaleDateString("en-UK", dateOptions);
			time += start.toLocaleTimeString("en-UK", timeOptions);
		}
		return (<><h6 className="offwhite">{time}</h6></>);
	}

    return <div className="task">
        <Confirmation
            show={completeConfirmShow}
            onHide={() => {setCompleteConfirmShow(false);}}
            msg={"Complete Task?"}
            accept={() => onComplete(task)}
            cancel={() => {}}/>
        <Confirmation
            show={deleteConfirmShow}
            onHide={() => {setDeleteConfirmShow(false);}}
            msg={"Delete Task?"}
            accept={() => onDelete(task)}
            cancel={() => {}}/>
        <TaskDetails
            task={task}
            contacts={contacts}
            allContacts={allContacts}
            show={modalShow}
            onUpdate={onUpdate}
			onHide={() => {setModalShow(false);}}
            onDelete={onDelete}
            searchContact={searchContact}/>
        <span className={prioritiesColorMap[priority]}
            onClick={() => { task.taskComplete || setCompleteConfirmShow(true)}}>
            {task.taskComplete ? <MdCheck className="tick-icon"/> : ""}
        </span>
        <div className="task-container-left" >
            <div className="task-name" onClick={() => {if (!modalShow) setModalShow(true)}}>
                <h6>{task.taskName}</h6>
            </div>

            <div className="task-item-date">{task.taskComplete ? "Complete" : isOverdue ? "Overdue" : getDisplayDate()}</div>

            <Dropdown className="task-options">
			<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
				<MdMoreHoriz className="edit-task-options" size={30}/>
			</Dropdown.Toggle>

			<Dropdown.Menu className="task-options-dropdown" variant="dark">
				<Dropdown.Item className="delete-btn" onClick={() => setDeleteConfirmShow(true)}>Delete</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
        </div>
    </div>
}

export default TaskItem;