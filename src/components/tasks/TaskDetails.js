import React, { useState, useEffect } from 'react';
import { MdClose,MdAdd } from 'react-icons/md';
import { Modal } from 'react-bootstrap';
import ContactController from '../contacts/ContactController';
import  './TaskDetails.css';
import './Tasks.css';
import "../form.css";
import ContactMenuItem from './ContactMenuItem';
import TaskPriorityDropdown from './TaskPriorityDropdown';
import TaskNote from './TaskNote';
const TaskContact = (contact) => {
	<div className="task-contact">
		{contact.accountUsername};
		<MdClose/>
	</div>
}
const TaskDetails = ({task, contacts, show, onHide, onUpdate}) => {

	
	const [availableContacts, setAvailableContacts] = useState(contacts);
	const [notes, setNotes] = useState(task.taskNoteList);
	const [taskPriority, setTaskPriority] = useState(task.taskPriority);
	
	const [contactIDsAdded, setContactIDsAdded] = useState([]);
	const [contactIDsRemoved, setContactIDsRemoved] = useState([]);
	const [contactIDsSelected, setContactIDsSelected] = useState(task.taskContactAccounts.map((contact) => contact.contactID))
	const [notesChanged, setNotesChanged] = useState([]);
	const [notesAdded, setNotesAdded] = useState([]);
	const [notesRemoved, setNotesRemoved] = useState([]);
	const [taskPriorityChanged, setTaskPriorityChanged] = useState(false);
	const [taskDeadlineChanged, setTaskDeadlineChanged] = useState(false);

	/**
	 * Function for formatting a date to be valid for date input (ISO)
	 * @param {Date} date The date to be formatted
	 * @returns The ISO formatted date
	 */
	const dateFormat = (date) => {
		const day = date.getDate().toString().padStart(2, "0"),
		month = (date.getMonth() + 1).toString().padStart(2, "0"),
		year = date.getFullYear();
		return year + "-" + month + "-" + day;
	}
	const [taskDeadline, setTaskDeadline] = useState(dateFormat(new Date(task.taskDeadline)));

	/**
	 * Function to be called on Modal close
	 */
	const handleClose = () => {
		setTaskPriority(task.taskPriority);
		setTaskDeadline(dateFormat(new Date(task.taskDeadline)));
		setTaskPriorityChanged(false);
		setTaskDeadlineChanged(false);
		setNotes(task.taskNoteList);
		setNotesAdded([]);
		setNotesRemoved([]);
		setNotesChanged([]);
		setAvailableContacts(contacts);
		setContactIDsAdded([]);
		setContactIDsRemoved([]);
		setContactIDsSelected(task.taskContactAccounts.map((c) => c.contactID));
		onHide();
	}
	/**
	 * Add contact to selection
	 * @param {*} contact The contact to be added
	 */
	const addavailableContactselection = (contact) => {
		setContactIDsAdded([...contactIDsAdded, contact.accountID]);
    }
	/**
	 * Remove contact from selection
	 * @param {*} contact The contact to be added
	 */
    const removeavailableContactselection = (contact) => {
		setContactIDsRemoved([...contactIDsRemoved, contact.accountID])
    }
	const isSelected = (contact) => {
		return contactIDsSelected.includes(contact.accountID);
	}
	//For Firefox (64.0) users
    const preventNonNumericalInput = (e) => {
        e = e || window.event;
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);

        if (!charStr.match(/^[0-9]+$/))
            e.preventDefault();
    }
	const removeAddedNote = (note) => {
        const index = notesAdded.indexOf(note);
        notesAdded.splice(index, 1);
    }
	const removeNote = (note) => {
        const index = notes.indexOf(note);
        notes.splice(index, 1);
    }
	const addNote = (note) => {
		setNotesAdded([...notesAdded, note]);
	}

	const onUpdateWrapper = () => {
		const newTask = {}; //
		Object.assign(newTask, task);

		Object.assign(newTask, {
			...(taskPriorityChanged) && {taskPriority: taskPriority},
			...(taskDeadlineChanged) && {taskDeadline: taskDeadline}
			
		});

		const changes = {
			taskName: false, // Need to add ability to change
			taskPriority: taskPriorityChanged,
			taskDeadline: taskDeadlineChanged,
			taskNotesAdded: notesAdded,
			taskNotesChanged: notesChanged,
			taskNotesRemoved: notesRemoved,
			taskContactIDsAdded: contactIDsAdded,
			taskContactIDsRemoved: contactIDsRemoved
		}

		onUpdate(newTask, changes);
	}

	useEffect(() => {
		setAvailableContacts(contacts);
		setContactIDsSelected(task.taskContactAccounts.map((c) => c.contactID));
	}, [contacts, task.taskContactAccounts]);
	return (
		<>
		<Modal
			show={show}
			onHide={handleClose}
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
						<div className="task-notes-section">
							Task Notes
							{notesAdded.map((note, index) => 
								<TaskNote 
									key={"new" + index}
									note={note}
									onChange={() => {}}
									onDelete={(note) => {
										removeAddedNote(note);
									}}
								/>)
							}
							{notes.map((note) => <TaskNote 
								key={note.taskNoteID}
								note={note}
								onChange={(note) => {
									setNotesChanged([...notesChanged, note]);
								}}
								onDelete={(note) => {
									setNotesRemoved([...notesRemoved, note]);
									removeNote(note);
								}}/>)
							}
						</div>
					</label>
					<div className="task-note-add">
					<MdAdd className="edit-task-btn"
						onClick={() => {
							var note = {
								taskID: task.taskID,
								note: ""
							};
							addNote(note);
						}}/>
					</div>
				</div>
				<div className="task-details-middle">
					
					<TaskPriorityDropdown 
						change={(p) => {
							setTaskPriority(p); 
							setTaskPriorityChanged(true);
						}} 
						defaultPriority={taskPriority}
					/>
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
						{availableContacts.map(contact => 
							<ContactMenuItem 
								active={isSelected(contact)} 
								key={contact.accountID}
								contactItem={contact} 
								add={addavailableContactselection} 
								remove={removeavailableContactselection}/>)}
					</div>
				</div>
				

			</Modal.Body>
			<div className="task-details-bottom">
				<button className="task-submit" onClick={
					() => {
						onUpdateWrapper()
						handleClose();
					}
				}>Save</button>
			</div>
			
		</Modal>
		</>
	)
}

export default TaskDetails;