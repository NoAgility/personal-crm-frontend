
import React, { useEffect, useState } from 'react';
import TaskDetails from './TaskDetails';
import { Dropdown } from 'react-bootstrap';
import {FiMoreHorizontal} from 'react-icons/fi';
import "./Tasks.css";
const TaskItem = ({task, onUpdate, onDelete}) => {
    const [modalShow, setModalShow] = useState(false);
    return <div className="task">
        <TaskDetails 
            task={task}
            show={modalShow}
            onUpdate={onUpdate}
			onHide={() => {setModalShow(false);}}/>
        <div className="task-container-left" onClick={() => {if (!modalShow) setModalShow(true)}}>
            <span className="task-label"/>
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