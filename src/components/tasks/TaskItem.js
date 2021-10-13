
import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import { Dropdown } from 'react-bootstrap';
import { MdCheck, MdMoreHoriz } from 'react-icons/md';
import "./Tasks.css";
import "./TaskItem.css"
import Confirmation from '../UIComponents/confirm/Confirmation';
const prioritiesColorMap = {
    "1": "red-circle",
    "2": "yellow-circle",
    "3": "green-circle",
    "-1": "purple-circle"
}

const TaskItem = ({task, contacts, allContacts, onUpdate, onDelete, onComplete, searchContact}) => {
    const [modalShow, setModalShow] = useState(false);
    const [completeConfirmShow, setCompleteConfirmShow] = useState(false);
    const [deleteConfirmShow, setDeleteConfirmShow] = useState(false);
    const priority = Object.entries(prioritiesColorMap).filter(p => p[0] === task.taskPriority.toString())[0][0]

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
            searchContact={searchContact}/>
            <span className={prioritiesColorMap[priority]} onClick={() => { task.taskComplete || setCompleteConfirmShow(true)}}>{task.taskComplete ? <MdCheck className="tick-icon"/> : ""}</span>
        <div className="task-container-left" >
            <div className="task-name" onClick={() => {if (!modalShow) setModalShow(true)}}>
                {task.taskName}
            </div>
            
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