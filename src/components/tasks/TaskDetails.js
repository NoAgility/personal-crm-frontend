import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import ContactController from '../contacts/ContactController';
import  './TaskDetails.css';
import './Tasks.css';
import "../form.css";
import ContactMenuItem from './ContactMenuItem';
const TaskContact = (contact) => {
	<div className="task-contact">
		{contact.accountUsername};
		<MdClose/>
	</div>
}
const TaskDetails = ({task, show, onHide, onUpdate}) => {

	const [contacts, setContacts] = useState([]);
	const [taskPriority, setTaskPriority] = useState(task.taskPriority);
	const [taskDeadline, setTaskDeadline] = useState(task.taskDeadline);

	const [contactsChanged, setContactsChanged] = useState(false);
	const [taskPriorityChanged, setTaskPriorityChanged] = useState(false);
	const [taskDeadlineChanged, setTaskDeadlineChanged] = useState(false);
	const [selectedContactIDs, setSelectedContactIDs] = useState(task.taskContactAccounts.map(data => data.contactID));

	const [trigger, setTrigger] = useState(true);
	const handleClose = () => {
		setTaskPriority(task.taskPriority);
		setTaskDeadline(task.taskDeadline);
		setTaskPriorityChanged(false);
		setTaskDeadlineChanged(false);
		setContactsChanged(false);
		onHide();
	}
	const addContactSelection = (contact) => {
        setSelectedContactIDs([...selectedContactIDs, contact.accountID]);
    }
    const removeContactSelection = (contact) => {
        const index = selectedContactIDs.indexOf(contact.accountID);
        selectedContactIDs.splice(index, 1);
    }
	const isSelected = (contact) => {
		return selectedContactIDs.includes(contact.accountID);
	}
	//For Firefox (64.0) users
    const preventNonNumericalInput = (e) => {
        e = e || window.event;
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);

        if (!charStr.match(/^[0-9]+$/))
            e.preventDefault();
    }
	useEffect(() => {

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

        getContacts();
    }, [trigger]);

	const onUpdateWrapper = () => {
		const newTask = {}; //
		Object.assign(newTask, task);

		Object.assign(newTask, {
			...(contactsChanged) && {contactIDs: selectedContactIDs},
			...(taskPriorityChanged) && {taskPriority: taskPriority},
			...(taskDeadlineChanged) && {taskDeadline: taskDeadline}
		});

		const changes = {
			taskName: false, // Need to add ability to change
			taskPriority: taskPriorityChanged,
			taskDeadline: taskDeadlineChanged,
			taskNotes: false // Backend needs to fix this
		}

		onUpdate(newTask, changes);

		setTrigger(true);
	}
	return (
		<>
		<Modal
			show={show}
			onHide={onHide}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="task-details-top">
				<MdClose className="task-close-button" onClick={handleClose} size={30}/>
			</div>
			<h1>{task.taskName}</h1>
			<Modal.Body className="task-details">
                
				<div className="task-details-left">
					<label className="form-label">
						Task Notes
						<textarea 
							value={task.taskNotes} 
							onChange={(e) => {task.taskNotes = e.target.value;}}
						/>
					</label>
					<label className="form-label">
						Priority
						<input className="form-input" 
							type="number" 
							placeholder="Enter a number"
							value={taskPriority !== -1 ? taskPriority : "" } 
							onKeyPress={preventNonNumericalInput} 
							onChange={(e) => {
								setTaskPriority(e.target.value);
								setTaskPriorityChanged(true);
							}}
						/>
					</label>
					<label className="form-label">
						Deadline
						<input className="form-date-input" 
							type="date" 
							value={taskDeadline || "" } 
							onChange={(e) => {
								setTaskDeadline(e.target.value);
								setTaskDeadlineChanged(true);
							}}
						/>
					</label>
				</div>
				<div className="task-details-right">
					<label className="form-label">Contacts</label>
					<div className="task-contact-container">
						{contacts.map(contact => 
							<ContactMenuItem 
								active={isSelected(contact)} 
								key={contact.accountID}
								contactItem={contact} 
								add={addContactSelection} 
								remove={removeContactSelection}/>)}
					</div>
				</div>
				

			</Modal.Body>
			<div className="task-details-bottom">
				<button className="task-submit" onClick={() => onUpdateWrapper()}>Save</button>
			</div>
			
		</Modal>
		</>
	)
}

export default TaskDetails;