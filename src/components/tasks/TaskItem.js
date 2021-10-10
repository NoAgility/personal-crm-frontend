
import React, { useEffect, useState } from 'react';
import TaskDetails from './TaskDetails';
import { Dropdown } from 'react-bootstrap';
import {FiMoreHorizontal} from 'react-icons/fi';
import "./Tasks.css";
import "./TaskItem.css"
const prioritiesColorMap = {
    "1": "red-circle",
    "2": "yellow-circle",
    "3": "green-circle",
    "-1": "purple-circle"
}

const TaskItem = ({task, contacts, onUpdate, onDelete}) => {
    const [modalShow, setModalShow] = useState(false);

    const priority = Object.entries(prioritiesColorMap).filter(p => p[0] === task.taskPriority.toString())[0][0]
    return <div className="task">
        <TaskDetails 
            task={task}
            contacts={contacts}
            show={modalShow}
            onUpdate={onUpdate}
			onHide={() => {setModalShow(false);}}/>
        <div className="task-container-left" onClick={() => {if (!modalShow) setModalShow(true)}}>
            <span className={prioritiesColorMap[priority]}/>
            {task.taskName}
        </div>
        
        <Dropdown className="task-options">
			<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button" >
				<FiMoreHorizontal className="edit-task-options" size={30}/>
			</Dropdown.Toggle>

			<Dropdown.Menu className="task-options-dropdown" variant="dark">
				<Dropdown.Item className="delete-btn" onClick={() => onDelete(task)}>Delete</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
    </div>
}

export default TaskItem;