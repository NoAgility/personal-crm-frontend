import React, { useState, useEffect, componentDidMount } from 'react';
import "./Tasks.css";
import "../form.css";
import { MdClose } from 'react-icons/md';
import { Modal, Accordion } from 'react-bootstrap';
import "./AddTaskForm.css";
import ContactController from '../contacts/ContactController';
import ContactMenuItem from './ContactMenuItem';
import TaskPriorityDropdown from './TaskPriorityDropdown';
import SearchBar from '../UIComponents/searchbar/SearchBar';
const AddMeetingForm = ({submit, show, onHide}) => {

    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState(-1);
    const [taskDate, setTaskDate] = useState("");
    const [contacts, setContacts] = useState([]);
    const [selectedContactIDs, setSelectedContactIDs] = useState([]);
    const [filteredAvailableContacts, setFilteredAvailableContacts] = useState([]);

    const [searchBarInput, setSearchBarInput] = useState("");
    /**
     * Function to add contact to selection
     * @param {*} contact The contact to be added
     */
    const addContactSelection = (contact) => {
        setSelectedContactIDs([...selectedContactIDs, contact.accountID]);
    }
    /**
     * Function to remove contact from the selection
     * @param {*} contact The contact to be removed
     */
    const removeContactSelection = (contact) => {
        const index = selectedContactIDs.indexOf(contact.accountID);
        selectedContactIDs.splice(index, 1);
    }
    /**
     * Wrapper for onHide function to reset all state
     * @param {*} e The event being triggered
     */
    const handleClose = (e) => {
		e.preventDefault();
		setTaskName("");
        setTaskPriority(-1);
        setTaskDate("");
		onHide();
	};

    const changeContactSearchFilter = (filter) => {
		setSearchBarInput(filter);
		if (filter === null || filter.length === 0) {
			setFilteredAvailableContacts(contacts);
		} else {
			setFilteredAvailableContacts(contacts.filter((contact) => contact.accountName.includes(filter)));
			
		}
	}
    /**
     * On render, load contacts for them to be addable to the form
     */
    useEffect(() => {

        const getContacts = async () => {
            const ids = await ContactController.fetchContacts();
            let cs =  [];
            if (ids !== undefined && ids.length > 0) {
                for (const id of ids) {
                    let contactData = await ContactController.fetchContactData(id);
                    cs.push(contactData);
                }
                setContacts(cs);
                setFilteredAvailableContacts(cs);
            }
        }
        
        getContacts();
    }, []);
    return (
        <Modal
            show={show}
			onHide={onHide}
            size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
            <div className="close-add-form">
				<MdClose className="close-button" onClick={handleClose} size={30}/>
			</div>
            <Modal.Body className="task-add">
                <h1>Add a Task</h1>
                <Accordion className="task-accordion" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header className="accordion-header">Basic Details</Accordion.Header>
					<Accordion.Body>
						<div className="task-details-section">
                            <input 
                                type="text" 
                                className="form-input" 
                                value={taskName} 
                                placeholder="Task Name" 
                                onChange={event => setTaskName(event.target.value)}
                            />
                            <div className="divider"/>
                            <TaskPriorityDropdown 
                                change={setTaskPriority} 
                                defaultPriority={taskPriority}
                                owner={true}
                            />
							<label className="form-label super-center">
								Deadline
								<input 
                                    className="form-date-input" 
                                    type="date" 
                                    value={taskDate} 
                                    onChange={event => setTaskDate(event.target.value)}
                                />
							</label>
						</div>
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header className="accordion-header">Contacts</Accordion.Header>
					<Accordion.Body>
					<div className="accordion-body">
						<div className="task-contact-container">
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
                                {contacts.length > 0 ? filteredAvailableContacts.map(contact => 
									<ContactMenuItem
										key={contact.accountID}
										contactItem={contact} 
										add={addContactSelection} 
                                        remove={removeContactSelection}
                                    />)
                                : <h5>No Contacts Available</h5>}
								
							</div>
						</div>
                        
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
            <button 
                className="task-submit" 
                onClick={(e) => {
                    e.preventDefault();
                    onHide();
                    submit({taskName: taskName, taskPriority: taskPriority, taskDeadline: taskDate, contactIDs: selectedContactIDs})
                    }}>
                Submit
            </button>
            </Modal.Body>
        </Modal>
    )
}

export default AddMeetingForm;