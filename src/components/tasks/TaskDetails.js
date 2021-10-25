import React, { useState, useEffect } from 'react';
import { MdClose, MdAdd, MdModeEdit, MdFace, MdDateRange } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';
import { BiTask } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Modal, Accordion } from 'react-bootstrap';
import  './TaskDetails.css';
import './Tasks.css';
import "../form.css";
import { Dropdown } from 'react-bootstrap';
import ContactMenuItem from './ContactMenuItem';
import TaskPriorityDropdown from './TaskPriorityDropdown';
import TaskNote from './TaskNote';
import SearchBar from '../UIComponents/searchbar/SearchBar';
import Sort from '../UIComponents/sort/Sort';
import ProfilePic from '../UIComponents/profilePic/ProfilePic';
import TimePicker from 'react-times';

const priorities = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
    "None": -1
}

const TaskDetails = ({task, contacts, allContacts, show, onHide, onUpdate, onDelete}) => {


	const [taskName, setTaskName] = useState(task.taskName);
	const [availableContacts, setAvailableContacts] = useState(contacts);
	const [filteredAvailableContacts, setFilteredAvailableContacts] = useState(contacts);
	const [filteredContactsViewer, setFilteredContactsViewer] = useState(allContacts.filter((contact) => (contact.accountID !== task.accountID)).filter((contact) => task.taskContactAccounts.map(contact => contact.contactID).includes(contact.accountID)));
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

	const [isEditing, setIsEditing] = useState(false);
	const [searchBarInput, setSearchBarInput] = useState("");
	/**
	 * Function for formatting a date to be valid for date input (ISO)
	 * @param {Date} date The date to be formatted
	 * @returns The ISO formatted date
	 */
	const dateFormat = (date) => {
		if (date.getFullYear().toString() === "1970") return "";
		const day = date.getDate(),
		month = date.getMonth(),
		year = date.getFullYear(),
		hour = date.getHours(),
		mins = date.getMinutes();

		const formattedDate = year + "-" + month + "-" + day;


		return new Date(date).toISOString().substring(0, 19);
	}
	const getDisplayDate = () => {
		const dateOptions = { month: 'long', day: 'numeric', year: 'numeric'};
		const timeOptions = {hour: 'numeric', minute: 'numeric'};
		const start = new Date(task.taskDeadline);
		let date = "";
		let time = "";
		if (start.getDate()) {
			date = start.toLocaleDateString("en-UK", dateOptions);
			time += start.toLocaleTimeString("en-UK", timeOptions);
		}
		return date + "  :  " + time;
	}
	const [taskDate, setTaskDate] = useState(task.taskDeadline ? task.taskDeadline.substring(0,10) : '');
    const [taskTime, setTaskTime] = useState(task.taskDeadline ? task.taskDeadline.substring(11,16) : '');
	const [taskDeadline, setTaskDeadline] = useState(dateFormat(new Date(task.taskDeadline)));

	/**
     * updates TaskDateTime when date or time input change
     */
		useEffect(() => {
			setTaskDeadline(taskDate + ' '+ taskTime)
		}, [taskDate, taskTime]);

	/**
	 * Function to be called on Modal close
	 */
	const handleClose = () => {
		setEditingName(false);
		setTaskPriority(task.taskPriority);
		setTaskDeadline(dateFormat(new Date(task.taskDeadline)));
		setTaskPriorityChanged(false);
		setTaskDeadlineChanged(false);
		setNotes(task.taskNoteList);
		setNotesAdded([]);
		setNotesRemoved([]);
		setNotesChanged([]);
		setAvailableContacts(contacts.filter((contact) => (contact.accountID !== task.accountID)));
		setFilteredAvailableContacts(contacts.filter((contact) => (contact.accountID !== task.accountID)));
		setFilteredContactsViewer(allContacts.filter((contact) => (contact.accountID !== task.accountID)).filter((contact) => task.taskContactAccounts.map(contact => contact.contactID).includes(contact.accountID)));
		setContactIDsAdded([]);
		setContactIDsRemoved([]);
		setContactIDsSelected(task.taskContactAccounts.map((c) => c.contactID));
		setTaskComplete(task.taskComplete);
		setIsEditing(false);
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
		if (contactIDsRemoved.includes(contact.accountID)) {
			const index = contactIDsRemoved.indexOf(contact.accountID);
			if (contactIDsRemoved.length === 1) {
				setContactIDsRemoved([]);
			} else {
				setContactIDsRemoved(contactIDsRemoved.slice(index, 1));
			}

		}
    }
	/**
	 * Remove contact from selection
	 * @param {*} contact The contact to be added
	 */
    const removeavailableContactselection = (contact) => {
		if (contactIDsAdded.includes(contact.accountID)) {
			const index = contactIDsAdded.indexOf(contact.accountID);
			if (contactIDsAdded.length === 1) {
				setContactIDsAdded([]);
			} else {
				setContactIDsAdded(contactIDsAdded.slice(index, 1));
			}

		}
		setContactIDsRemoved([...contactIDsRemoved, contact.accountID])
    }
	const isSelected = (contact) => {
		return (contactIDsSelected.includes(contact.accountID) || contactIDsAdded.includes(contact.accountID)) && !contactIDsRemoved.includes(contact.accountID);
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
		const newTask = {};
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
			setFilteredAvailableContacts(availableContacts.filter((contact) => contact.accountName.toLowerCase().includes(filter.toLowerCase())));

		}
	}
	const changeContactSearchFilterViewer = (filter) => {
		setSearchBarInput(filter);
		if (filter === null || filter.length === 0) {
			setFilteredContactsViewer(allContacts.filter((contact) => (contact.accountID !== task.accountID)));
		} else {
			setFilteredContactsViewer(allContacts.filter((contact) => (contact.accountID !== task.accountID)).filter((contact) => contact.accountName.toLowerCase().includes(filter.toLowerCase())));

		}
	}
	useEffect(() => {
		const findTaskOwner = () => {
			for (const contact of allContacts) {
				if (contact.accountID === task.accountID) {
					return contact;
				}
			}
			return "";
		}
		setAvailableContacts(contacts.filter((contact) => (contact.accountID !== task.accountID)));
		setFilteredAvailableContacts(contacts.filter((contact) => (contact.accountID !== task.accountID)));
		setFilteredContactsViewer(allContacts.filter((contact) => (contact.accountID !== task.accountID)).filter((contact) => task.taskContactAccounts.map(contact => contact.contactID).includes(contact.accountID)));
		setContactIDsSelected(task.taskContactAccounts.map((c) => c.contactID));
		setTaskOwner(findTaskOwner());
		setTaskName(task.taskName);
		setTaskPriority(task.taskPriority);
		setTaskDeadline(dateFormat(new Date(task.taskDeadline)));
		setNotes(task.taskNoteList);
		setNotesSorted(task.taskNoteList);
		setSearchBarInput("");
	}, [contacts, allContacts, task]);

	const onSubmit = (e) => {
		e.preventDefault();
		onUpdateWrapper()
		handleClose();
	}

	return (
		<>
		<Modal
			show={show}
			onHide={handleClose}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<div className="modal-top">
				<FiEdit2 className="modal-header-button"
					style={{display: `${task.owner === true ? 'block' : 'none'}`}}
					onClick={!isEditing ? () => {setIsEditing(true)} : () => {setIsEditing(false)}} size={25}/>
				<Dropdown className="contact-options">
					<Dropdown.Toggle id="button-dropdown-body"  className="dropdown-button"
					style={{display: `${task.owner === true ? 'block' : 'none'}`}}>
						<RiDeleteBin6Line className="modal-header-button" size={25}/>
					</Dropdown.Toggle>
					<Dropdown.Menu className="contact-options-dropdown" variant="dark">
						<Dropdown.Item disabled={task.owner === true ? false : true }
							onClick={() => {onDelete(task); handleClose();}}>Delete</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<MdClose className="modal-header-button" onClick={handleClose} size={30}/>
			</div>
			<div className="task-details-name">
			{isEditing ? <input
				className="task-details-name-input"
				type="text"
				value={taskName}
				onChange={(e) => setTaskName(e.target.value)}
				maxLength={45}/> :
				<div className="task-details-name-header"><BiTask/><h1 className="task-details-name-h1">{taskName.length < 30 ? taskName : taskName.substring(0,30).concat(" ...")}</h1></div>}
			</div>

			<Modal.Body className="task-details">
			<Accordion className="accordion-flush" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header className="accordion-header">Basic Details</Accordion.Header>
					<Accordion.Body>
					<div className="task-add-details-section">

							{isEditing ?
							<>
							<div className="task-basic-details-section">
							<h3>Priority</h3>
							<TaskPriorityDropdown
								change={(p) => {
									setTaskPriority(p);
									setTaskPriorityChanged(true);
								}}
								defaultPriority={taskPriority}
								owner={task.owner}
							/>
							</div>
							<div className="task-basic-details-section">
								<h3>Deadline</h3>
								<div className="task-deadline-options">
								<div className="app-row">
									<MdDateRange className="add-meeting-icon" size={25}/>
									<input
										className="form-date-input"
										type="date"
										value={taskDate}
										onChange={event => {
											setTaskDate(event.target.value);
											setTaskDeadlineChanged(true);
										}}
									/>
								</div>
									<TimePicker
										colorPalette="dark" theme="classic" withoutIcon={true}
										onTimeChange={t => {
											setTaskTime(t.hour + ':' + t.minute);
											setTaskDeadlineChanged(true);
										}}
										time={taskTime}
										timeConfig={{
											step: 15,
											unit: 'minute'
										}}
										/>
								</div>
								</div>
							</>
							:
								<>
									<div className="app-row">
										<div>
											<div className="task-basic-details-section">
												<h3 className="offwhite">{"Priority : " + Object.entries(priorities).filter(p => p[1] === taskPriority)[0][0]}</h3>
											</div>
											<div className="task-basic-details-section">
												<div className="task-basic-details-deadline">{taskDeadline !== "" ? <>Due at {getDisplayDate()}</> : <>No deadline</>}</div>
											</div>
										</div>
										{!taskComplete ?
										<button type="checkbox" className="task-complete-btn task-btn" onClick={completeTask}>
											Complete Task
										</button>
										: <div className="task-complete-btn">Task Completed</div>
									}
									</div>
								</>
							}

						</div>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header className="accordion-header">Participants</Accordion.Header>
					<Accordion.Body>
					{isEditing ?

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
								<div className='contact-checkbox-container'>
									<MdFace size={25}/>
									<ProfilePic
										key={taskOwner.accountID}
										name={taskOwner.accountName}
										size={"xs"}
										id={taskOwner.accountID}
									/>
									<h6>{taskOwner.accountName}</h6>
									<i>(Owner)</i>
								</div>
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
						<div className="task-section-header"><h5>Contacts</h5>

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
								<div className='contact-checkbox-container app-dark'>
									<MdFace size={25}/>
									<ProfilePic
										key={taskOwner.accountID}
										name={taskOwner.accountName}
										size={"xs"}
										id={taskOwner.accountID}
									/>
									<h6>{taskOwner.accountName}</h6>
									<i>(Owner)</i>
								</div>
								<ul className="task-contact-viewer-list">
									{filteredContactsViewer.map((contact) =>
									(<li key={contact.accountID}>
										<div className='contact-checkbox-container' >
											<ProfilePic
												name={contact.accountName}
												size={"xs"}
												id={contact.accountID}
											/>
											<h6>{contact.accountName}</h6>
										</div>
									</li>))}
									</ul>
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
			<div className="add-minute-options">
                    <div className="row">
                        <button
                            className="cancel-btn"
                            onClick={() => {onHide()}}>
                            Cancel
                        </button>
                        <button
                            className="meeting-submit task-btn"
                            type="submit"
							onClick={onSubmit}>
                            Save
                        </button>
                    </div>
				</div>
			</div>
			</Modal.Body>
		</Modal>
		</>
	)
}

export default TaskDetails;