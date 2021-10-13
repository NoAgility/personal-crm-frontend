import React, { useState, useEffect } from 'react';
import { MdClose, MdAdd, MdModeEdit, MdFace } from 'react-icons/md';
import { Modal, Accordion } from 'react-bootstrap';
import  './TaskDetails.css';
import './Tasks.css';
import "../form.css";
import ContactMenuItem from './ContactMenuItem';
import TaskPriorityDropdown from './TaskPriorityDropdown';
import TaskNote from './TaskNote';
import ContactController from '../contacts/ContactController';
import SearchBar from '../UIComponents/searchbar/SearchBar';
import Sort from '../UIComponents/sort/Sort';
const TaskDetails = ({task, contacts, allContacts, show, onHide, onUpdate}) => {

	
	const [taskName, setTaskName] = useState(task.taskName);
	const [availableContacts, setAvailableContacts] = useState(contacts);
	const [filteredAvailableContacts, setFilteredAvailableContacts] = useState(contacts);
	const [filteredContactsViewer, setFilteredContactsViewer] = useState(task.taskContactAccounts.filter(
		(contact) => allContacts.map(contact => contact.accountID).includes(contact.contactID)));
	const [editingName, setEditingName] = useState(false);
	const [taskOwner, setTaskOwner] = useState("");
	const [notes, setNotes] = useState(task.taskNoteList);
	const [notesSorted, setNotesSorted] = useState(task.taskNoteList);
	const [taskPriority, setTaskPriority] = useState(task.taskPriority);
	const [taskComplete, setTaskComplete] = useState(task.taskComplete || 0);
	const [contactIDsAdded, setContactIDsAdded] = useState([]);
	const [contactIDsRemoved, setContactIDsRemoved] = useState([]);
	const [contactIDsSelected, setContactIDsSelected] = useState(task.taskContactAccounts.map((contact) => contact.contactID))
	const [notesChanged, setNotesChanged] = useState([]);
	const [notesAdded, setNotesAdded] = useState([]);
	const [notesRemoved, setNotesRemoved] = useState([]);
	const [taskPriorityChanged, setTaskPriorityChanged] = useState(false);
	const [taskDeadlineChanged, setTaskDeadlineChanged] = useState(false);

	const [searchBarInput, setSearchBarInput] = useState("");
	/**
	 * Function for formatting a date to be valid for date input (ISO)
	 * @param {Date} date The date to be formatted
	 * @returns The ISO formatted date
	 */
	const dateFormat = (date) => {
		const day = date.getDate().toString().padStart(2, "0"),
		month = (date.getMonth() + 1).toString().padStart(2, "0"),
		year = date.getFullYear();

		const formattedDate = year + "-" + month + "-" + day;

		if (formattedDate === "1970-01-01") return "";
		return formattedDate;
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
		setAvailableContactsWrapper(contacts);
		setFilteredAvailableContactsWrapper(contacts);
		setFilteredContactsViewerWrapper(allContacts.filter((contact) => task.taskContactAccounts.map(contact => contact.contactID).includes(contact.accountID)));
		setContactIDsAdded([]);
		setContactIDsRemoved([]);
		setContactIDsSelected(task.taskContactAccounts.map((c) => c.contactID));
		setTaskComplete(task.taskComplete);
		onHide();
	}

	const sortNotesByOldestFirst = () => {
		notes.sort((a, b) => {
			if (a.taskNoteID > b.taskNoteID) {
				return 1;
			} else if (a.taskNoteID < b.taskNoteID) {
				return -1;
			} else {
				return 0;
			}
		})
		setNotesSorted([...notes]);
	}
	const sortNotesByNewestFirst = () => {
		notes.sort((a, b) => {
			if (a.taskNoteID < b.taskNoteID) {
				return 1;
			} else if (a.taskNoteID > b.taskNoteID) {
				return -1;
			} else {
				return 0;
			}
		})
		setNotesSorted([...notes]);
	}
	const noteSortTypes = [
		{
			label: "Oldest first",
			sortFunction: sortNotesByOldestFirst
		},
		{
			label: "Newest first",
			sortFunction: sortNotesByNewestFirst
		}
	]
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
	const completeTask = async () => {
		await onUpdateWrapper({taskComplete: true})
		
	}
	const onUpdateWrapper = (taskComplete) => {
		const newTask = {}; //
		Object.assign(newTask, task);

		Object.assign(newTask, {
			...(taskPriorityChanged) && {taskPriority: taskPriority},
			...(taskDeadlineChanged) && {taskDeadline: taskDeadline}
			
		});

		const changes = {
			taskName: taskName,
			taskPriority: taskPriorityChanged,
			taskComplete: taskComplete || false,
			taskDeadline: taskDeadlineChanged,
			taskNotesAdded: notesAdded,
			taskNotesChanged: notesChanged,
			taskNotesRemoved: notesRemoved,
			taskContactIDsAdded: contactIDsAdded,
			taskContactIDsRemoved: contactIDsRemoved
		}
		onUpdate(newTask, changes);
		if (taskComplete) handleClose();
	}
	const changeContactSearchFilter = (filter) => {
		setSearchBarInput(filter);
		if (filter === null || filter.length === 0) {
			setFilteredAvailableContacts(availableContacts);
		} else {
			setFilteredAvailableContacts(availableContacts.filter((contact) => contact.accountName.includes(filter)));
			
		}
	}
	const changeContactSearchFilterViewer = (filter) => {
		setSearchBarInput(filter);
		if (filter === null || filter.length === 0) {
			setFilteredContactsViewer(contacts);
		} else {
			setFilteredContactsViewer(contacts.filter((contact) => contact.accountName.includes(filter)));
			
		}
	}
	const setAvailableContactsWrapper = (contacts) => {
		setAvailableContacts(contacts.filter((contact) => (contact.accountID !== task.accountID)));
	}
	const setFilteredAvailableContactsWrapper = (contacts) => {
		setFilteredAvailableContacts(contacts.filter((contact) => (contact.accountID !== task.accountID)));
	}
	const setFilteredContactsViewerWrapper = (contacts) => {
		setFilteredContactsViewer(allContacts.filter((contact) => task.taskContactAccounts.map(contact => contact.contactID).includes(contact.accountID)));
	}
	useEffect(() => {
		const findTaskOwner = () => {
			for (const contact of allContacts) {
				if (contact.accountID === task.accountID) {
					return contact.accountName;
				}
			}
			return "";
		}
		setAvailableContactsWrapper(contacts);
		setFilteredAvailableContactsWrapper(contacts);
		setFilteredContactsViewerWrapper(allContacts.filter((contact) => task.taskContactAccounts.map(contact => contact.contactID).includes(contact.accountID)));
		setContactIDsSelected(task.taskContactAccounts.map((c) => c.contactID));
		setTaskOwner(findTaskOwner());
		setTaskName(task.taskName);
		setTaskPriority(task.taskPriority);
		setTaskDeadline(dateFormat(new Date(task.taskDeadline)));
		setNotes(task.taskNoteList);
		setNotesSorted(task.taskNoteList);
		setSearchBarInput("");
	}, [contacts, allContacts, task]);

	console.log(filteredContactsViewer);
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
			<div className="task-name">
			{editingName ? <input 
				className="task-name-input" 
				type="text" 
				value={taskName} 
				onChange={(e) => setTaskName(e.target.value)} 
				maxlength="45"/> : 
				<h1 className="task-name-h1">{taskName}</h1>}
			<MdModeEdit className="edit-task-name-btn" onClick={() => setEditingName(!editingName)}/>
			</div>
			
			<Modal.Body className="task-details">
				<h1>Task Details</h1>
			<Accordion className="task-accordion" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header className="accordion-header">Basic Details</Accordion.Header>
					<Accordion.Body>
						<div className="task-details-section">
							<div className="row">
							<TaskPriorityDropdown 
								change={(p) => {
									setTaskPriority(p); 
									setTaskPriorityChanged(true);
								}} 
								defaultPriority={taskPriority}
								owner={task.owner}
							/>
							{task.owner ? 
							<label className="form-label super-center">
								Deadline
								<input className="form-date-input" 
									type="date" 
									value={taskDeadline || "" } 
									onChange={(e) => {
										setTaskDeadline(e.target.value);
										setTaskDeadlineChanged(true);
									}}
								/> 
							</label> : 
							<div className="unselectable-input">
								<h5>Deadline</h5> 
								<div>
									{taskDeadline || "No Deadline"}
								</div>
							</div>
							}
							</div>
							{!taskComplete ? <button type="checkbox" className="task-complete-btn" onClick={completeTask}>Complete Task</button> : <div>Task Completed</div>}
						</div>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header className="accordion-header">Participants</Accordion.Header>
					<Accordion.Body>
					{task.owner ?
					
					<div className="accordion-body">
						<div className="task-section-header"><h5>Add or remove a contact</h5>
						
							<SearchBar 
								name="contact" 
								width="xsm" 
								colorMode="light" 
								onSubmit={(e) => { e.preventDefault();}} 
								value={searchBarInput} 
								placeHolder="Contact Name" 
								onChange={(e) => { changeContactSearchFilter(e.target.value);}}/>
						</div>
						<div className="divider"/>
							<div className="task-contact-container">
								<div className="task-contact-owner"><MdFace/><b>{taskOwner}</b> <i>(Owner)</i></div>
								{filteredAvailableContacts.map(contact => 
									<ContactMenuItem 
										active={isSelected(contact)} 
										key={contact.accountID}
										contactItem={contact} 
										add={addavailableContactselection} 
										remove={removeavailableContactselection}/>)}
							</div>
						</div> 
						: <div className="accordion-body">
						<div className="task-section-header"><h5>You are not the owner of this task</h5>
						
							<SearchBar 
								name="contact" 
								width="xsm" 
								colorMode="light" 
								onSubmit={(e) => { e.preventDefault();}} 
								value={searchBarInput} 
								placeHolder="Contact Name" 
								onChange={(e) => { changeContactSearchFilterViewer(e.target.value);}}/>
						</div>
						<div className="divider"/>
							<div className="task-contact-container">
								<div className="task-contact-owner"><MdFace/><b>{taskOwner}</b> <i>(Owner)</i></div>
								<ul className="task-contact-viewer-list">{filteredContactsViewer.map((contact) => (<li>{contact.accountName}</li>))}</ul>
							</div>
						</div>}
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header className="accordion-header">Notes</Accordion.Header>
					<Accordion.Body className="accordion-body">
					
					<div className="task-section-header"><h5>Add notes to your task</h5>
						<Sort sortTypes={noteSortTypes}/>
					</div>
					<div className="task-notes-section">
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
						{notesSorted.map((note) => <TaskNote 
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
					<div className="task-notes-header">
						<div className="task-note-add">
						<MdAdd className="add-note-btn"
							onClick={() => {
								var note = {
									taskID: task.taskID,
									note: ""
								};
								addNote(note);
							}}/>
						</div>
					</div>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<div className="task-details-bottom">
				<button className="task-submit" onClick={
					() => {
						onUpdateWrapper()
						handleClose();
					}
				}>Save</button>
			</div>
			</Modal.Body>
			
			
		</Modal>
		</>
	)
}

export default TaskDetails;