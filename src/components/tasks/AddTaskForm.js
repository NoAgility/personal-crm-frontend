import React, { useState, useEffect, componentDidMount } from 'react';
import "./Tasks.css";
import "../form.css";
import { MdClose } from 'react-icons/md';
import TaskController from './TaskController';
import { Modal } from 'react-bootstrap';
import TaskContactDropdown from './TaskContactDropdown';
import ContactController from '../contacts/ContactController';
import TaskPriorityDropdown from './TaskPriorityDropdown';
const AddMeetingForm = ({submit, show, onHide}) => {

    const [taskName, setTaskName] = useState("");
    const [taskPriority, setTaskPriority] = useState(-1);
    const [taskDate, setTaskDate] = useState("");
    const [contacts, setContacts] = useState([]);
    const [selectedContactIDs, setSelectedContactIDs] = useState([]);

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

    //For Firefox (64.0) users
    const preventNonNumericalInput = (e) => {
        e = e || window.event;
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);

        if (!charStr.match(/^[0-9]+$/))
            e.preventDefault();
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
            <Modal.Body>

                <h1>Add a Task</h1>
            
                <div className="add-form">
                    <form className="form-container">
                        <input 
                            type="text" 
                            className="form-input" 
                            value={taskName} 
                            placeholder="Task Name" 
                            onChange={event => setTaskName(event.target.value)}
                        />
                        <label className="task-form-label">
                            Deadline
                            <input 
                                className="form-date-input" 
                                type="date" 
                                value={taskDate} 
                                onChange={event => setTaskDate(event.target.value)}
                            />
                        </label>
                        <TaskPriorityDropdown 
                            change={setTaskPriority} 
                            defaultPriority={taskPriority}
                        />
                        <TaskContactDropdown 
                            contactItems={contacts} 
                            add={addContactSelection} 
                            remove={removeContactSelection}/>
                        <button 
                            className="task-submit" 
                            onClick={(e) => {
                                e.preventDefault();
                                onHide();
                                submit({taskName: taskName, taskPriority: taskPriority, taskDeadline: taskDate, contactIDs: selectedContactIDs})
                                }}>
                            Submit
                        </button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddMeetingForm;